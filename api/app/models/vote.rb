class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :voteable, polymorphic: true

  validates_inclusion_of :rating, in: 1.0..5.0
  validates :voteable_id,
            uniqueness: {scope: [:user_id, :voteable_type]}

  with_options if: :votes_on_user? do |vote|
    vote.validate :user_is_trainer
    vote.validate :user_is_not_subject
  end

  after_save :recount_rating, if: Proc.new {|v| v.rating_changed?}

  private

  def votes_on_user?
    self.voteable.class == User
  end

  def user_is_trainer
    unless self.voteable.is_trainer
      errors.add(:user, 'Can only vote on trainers')
    end
  end

  def user_is_not_subject
    if self.user == self.voteable
      errors.add(:user, 'Can not vote on yourself')
    end
  end

  def recount_rating
    ratings = Vote.
        where(voteable_type: self.voteable_type).
        where(voteable_id: self.voteable_id).
        pluck(:rating)

    count = ratings.length
    avg = ratings.inject(:+) / count

    self.voteable.update({votes_count: count, rating: avg})
  end

end

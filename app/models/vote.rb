class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :voteable, polymorphic: true

  validates_inclusion_of :rating, in: 1..5

  validate :user_is_trainer if :votes_on_user?

  private

  def votes_on_user?
    self.voteable.class == User
  end

  def user_is_trainer
    unless self.voteable.is_trainer
      errors.add(:voteable, 'Can only vote on trainers')
    end
  end

end

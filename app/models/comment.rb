class Comment < ApplicationRecord

  belongs_to :user
  belongs_to :commentable, polymorphic: true

  validates :body, length: { in: 1..255 }

  with_options if: :comments_on_user? do |comment|
    comment.validate :user_is_trainer
    comment.validate :user_is_not_subject
  end

  private

  def comments_on_user?
    self.commentable.class == User
  end

  def user_is_trainer
    unless self.commentable.is_trainer
      errors.add(:user, 'Can only comment on trainers')
    end
  end

  def user_is_not_subject
    if self.user == self.commentable
      errors.add(:user, 'Can not comment on yourself')
    end
  end

end

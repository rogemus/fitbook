class Post < ApplicationRecord

  belongs_to :author, class_name: 'User', foreign_key: 'author_id', validate: true

  has_and_belongs_to_many :tags

  has_many :votes, as: :voteable, dependent: :destroy

  validates_presence_of :title, :heading, :body

  validates :title, length: { in: 1..55 }
  validates :heading, length: { in: 1..255 }
  validates :body, length: { in: 1..63_206 }

  validate :author_is_trainer

  private

  def author_is_trainer
    unless self.author.is_trainer
      errors.add(:author, "User #{author.name} needs to be trainer")
    end
  end

end
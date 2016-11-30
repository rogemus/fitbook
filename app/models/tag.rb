class Tag < ApplicationRecord

  before_validation :normalize_name

  has_and_belongs_to_many :posts

  validates :name, uniqueness: true, presence: true

  def self.sanitize_name(name)
    name.gsub(/(\W|_)/, ' ').parameterize
  end

  private

  def normalize_name
    self.name = self.class.sanitize_name(self.name)
  end

end

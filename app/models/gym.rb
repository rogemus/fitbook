class Gym < ApplicationRecord

  before_save :include_facebook_data!

  has_many :members
  has_many :attenders, :through => :members, :source => :user

  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true

  validates :name, presence: true

  def include_facebook_data!

  end

end

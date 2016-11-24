class User < ApplicationRecord

  validates :name, presence: true
  validates :facebook_id, uniqueness: true

  has_many :posts, :foreign_key => 'author_id'

  has_many :members
  has_many :gyms_attending, :through => :members, :source => :gym

  has_many :owned_gyms, :class_name => 'Gym', :foreign_key => 'owner_id'

  class << self
    def find_in_facebook(token, with = {fields: %w{id name email cover.type(large).fields(source) picture.type(large).fields(url)}})
      Koala::Facebook::API.new(token).get_object(:me, with)
    end
  end

  def join_gym_as_owner(gym)
    join_gym(gym, :owner, true)
  end

  def join_gym(gym, level, as_owner = false)
    level = level.parameterize.to_sym unless level.is_a?(Symbol)

    membership = Member.new({:gym => gym,
                             :membership_level => level,
                             :user => self})

    if level === :owner && as_owner
      membership.check_for_valid_level = false
      membership.join_as_owner
    else
      membership.need_to_approve
    end

    if level === :trainer
      membership.check_for_trainer = true
    end

    membership.save
    membership
  end

end

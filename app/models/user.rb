class User < ApplicationRecord

  has_many :members
  has_many :gyms_attending, :through => :members, :source => :gym

  has_many :owned_gyms, :class_name => 'Gym', :foreign_key => 'owner_id'

  class << self
    def find_in_facebook(token, with = {fields: %w{id name email}})
      Koala::Facebook::API.new(token).get_object(:me, with)
    end
  end

end

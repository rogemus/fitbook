class User < ApplicationRecord

  has_many :gyms

  class << self
    def find_in_facebook(token, with = {fields: %w{id name email}})
      Koala::Facebook::API.new(token).get_object(:me, with)
    end
  end

end

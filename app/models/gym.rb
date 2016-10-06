class Gym < ApplicationRecord

  belongs_to :user

  ALLOWED_CATEGORIES = %w{Gym}
  ALLOWED_PERMS = %w{ADMINISTER}

  class << self
    def user_fb_gym(user, id)
      gym = Gym.find_by(
          {:user => user,
           :facebook_id => id})
      if gym
        fb_gym = @@facebook.get_object(id, {fields: %w{access_token name}})
        if fb_gym
          gym.name = fb_gym['name']
          gym.facebook_token = fb_gym['access_token']
          gym.save!
        end
      end
      gym
    end
  end

end

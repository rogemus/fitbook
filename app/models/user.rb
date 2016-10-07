class User < ApplicationRecord

  has_many :gyms, dependent: :destroy

  has_many :members

  class << self
    def from_fb_token(fb_token)
      fb = Koala::Facebook::API.new(fb_token)
      fb_user = fb.get_object(:me, {fields: %w{name email}} )
      if fb_user
        user = find_or_create_by(facebook_id: fb_user['id'])
        user.facebook_token = fb_token
        user.email = fb_user['email'] || nil
        user.name = fb_user['name']
        user.save!
        user
      else
        nil
      end
    end
  end

  def available_gyms
    filtered_gyms = []
    fb_gyms = @@facebook.get_connections(
        :me, :accounts,
        { fields: %w{access_token category_list name id perms} })

    fb_gyms.each do |gym|
      if (Gym::ALLOWED_CATEGORIES.include? gym['category_list'][0]['name']) &&
          (Gym::ALLOWED_PERMS & gym['perms']).count &&
          !gym_already_exists(gym)
        filtered_gyms << gym
      end
    end

    filtered_gyms
  end

  private

  def gym_already_exists(gym)
    Gym.find_by(gym['id'])
  end

end

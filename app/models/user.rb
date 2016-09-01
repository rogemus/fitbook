class User < ApplicationRecord
  has_many :gyms, dependent: :destroy

  class << self
    def from_omniauth(auth_hash)
      user = find_or_create_by(facebook_id: auth_hash[:uid],
                               email: auth_hash[:info][:email])
      user.facebook_token = auth_hash[:credentials][:token]
      user.name = auth_hash[:info][:name]
      user.save!
      user
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

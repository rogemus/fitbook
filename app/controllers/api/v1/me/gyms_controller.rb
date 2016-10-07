module Api::V1::Me
  class GymsController < BaseController

    def index
      render json: @current_user.gyms
    end

    def update
      gym = @current_user.gyms.find(params[:id])
      if gym
        gym = Gym.user_fb_gym(@current_user, gym[:facebook_id])
      end
      render json: gym
    rescue
      render json: nil
    end

    def create
      gym_hash = gym_hash_correct(params[:facebook_id])
      gym = nil
      if gym_hash
        gym = Gym.new(
            {:name => gym_hash['name'],
             :facebook_id => gym_hash['id'],
             :facebook_token => gym_hash['access_token']})
        gym.members << Member.new({user: @current_user, status: :owner})
        @current_user.gyms << gym
        gym.save!
      end
      render json: gym
    end

    def available
      gyms = @current_user.available_gyms.map do |gym|
        { facebook_id: gym['id'], name: gym['name'] }
      end
      render json: gyms
    end

    private

    def gym_hash_correct(hash)
      (@current_user.available_gyms.select{|gym| gym['id'] == hash}).first
    end

  end
end
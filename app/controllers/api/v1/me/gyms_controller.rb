module Api::V1::Me
  class GymsController < BaseController

    def index
      render json: @current_user.gyms
    end

    def create
      gym_hash = (@current_user.available_gyms.select{|gym| gym['id'] == params[:facebook_id]})
      if gym_hash[0]
        gym_hash = gym_hash[0]
        gym = Gym.new(
            {:name => gym_hash['name'],
             :facebook_id => gym_hash['id'],
             :facebook_token => gym_hash['access_token']})
        @current_user.gyms << gym
        gym.save!
        render json: gym
      else
        render json: null
      end
    end

    def available
      gyms = @current_user.available_gyms.map do |gym|
        { facebook_id: gym['id'], name: gym['name'] }
      end
      render json: gyms
    end

  end
end
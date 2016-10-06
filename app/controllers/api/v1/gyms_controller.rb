module Api::V1
  class GymsController < BaseController

    api :GET, '/gyms'
    def index
      render json: Gym.all
    end

  end
end
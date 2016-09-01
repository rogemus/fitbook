module Api::V1
  class GymsController < BaseController

    def index
      render json: Gym.all
    end

  end
end
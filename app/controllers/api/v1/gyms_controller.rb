module Api::V1
  class GymsController < BaseController

    include GymsDoc

    def index
      render json: Gym.all
    end

    def show
      render json: Gym.find(params[:id])
    end

    def join
    end

  end
end
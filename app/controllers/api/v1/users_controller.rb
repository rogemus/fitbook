module Api::V1
  class UsersController < BaseController

    include UsersDoc

    def show
      render json: User.find(params[:id])
    end

    def trainers
      render json: User.where(is_trainer: true)
    end

  end
end

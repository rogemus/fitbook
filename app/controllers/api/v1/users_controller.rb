module Api::V1
  class UsersController < BaseController

    include UsersDoc

    def show
      render json: User.find(params[:id])
    end

  end
end

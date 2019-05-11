module Api::V1
  class UsersController < BaseController

    include UsersDoc

    def show
      render json: User.find(params[:id]),
             include_gyms: true
    end

  end
end

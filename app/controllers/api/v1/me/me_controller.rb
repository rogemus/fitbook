module Api::V1::Me
  class MeController < BaseController

    include Api::V1::Me::MeDoc

    def show
      render json: current_user
    end

    def update
      options = params.require(:options).permit(:is_trainer)
      current_user.update!(options)

      render json: current_user,
             gyms_attending: true
    end

  end

end

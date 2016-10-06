module Api::V1::Me
  class MeController < BaseController

    def index
      render json: @current_user
    end

  end
end
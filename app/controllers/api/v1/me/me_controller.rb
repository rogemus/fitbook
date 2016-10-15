module Api::V1::Me
  class MeController < BaseController

    include Api::V1::Me::MeDoc

    def index
      render json: @current_user
    end

  end

end

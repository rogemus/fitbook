module Api::V1

  class ApplicationController < BaseController

    include GlobalDoc

    def err
      error_params = params.permit(:platform, :stack)
      render json: ErrorLog.create(error_params), status: :created
    end

  end
end


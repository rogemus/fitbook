module Api
  class ApiController < ApplicationController
    before_action :authenticate_request!, :merge_facebook_into_models

    def merge_facebook_into_models
      ApplicationRecord.setup_facebook!(@current_user) if @current_user.facebook_token
    end

    protected

    def authenticate_request!
      unless user_id_in_token?
        render json: { errors: ['Non authenticated'] }, status: :unauthorized
        return
      end
      @current_user = User.find(auth_token[:user_id])
    rescue JWT::VerificationError, JWT::DecodeError
      render json: { errors: ['Non authenticated'] }, status: :unauthorized
    end

    private

    def http_token
      @http_token ||= if request.headers['Authorization'].present?
                        request.headers['Authorization'].split('Bearer ').last
                      end
    end

    def auth_token
      @auth_token ||= JsonWebToken.decode(http_token)
    end

    def user_id_in_token?
      http_token && auth_token && auth_token[:user_id].to_i
    end

  end
end
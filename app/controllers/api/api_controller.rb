module Api
  class ApiController < ApplicationController

    attr_accessor :current_user
    before_action :authenticate_request!, :merge_facebook_into_models,
                  except: :user_from_facebook_token

    def merge_facebook_into_models
      ApplicationRecord.setup_facebook!(@current_user) if @current_user.facebook_token
    end

    def user_from_facebook_token
      user = User.from_fb_token(params[:facebook_token])
      if user
        render json: payload(user)
      else
        render json: {errors: ['Invalid credentials'] }, status: :unauthorized
      end
    end

    private

    def payload(user)
      return nil unless user&.id
      {
          auth_token: JsonWebToken.encode( {user_id: user.id} ),
          user: {id: user.id}
      }
    end

    def authenticate_request!
      unless user_id_in_token?
        render json: { errors: ['Non authenticated'] }, status: :unauthorized
        return
      end
      @current_user = User.find(auth_token[:user_id])
    rescue JWT::VerificationError, JWT::DecodeError
      render json: { errors: ['Non authenticated'] }, status: :unauthorized
    end

    def http_token
      @http_token ||= if request.headers['Authorization'].present?
                        request.headers['Authorization'].split('Bearer ').last
                      end
    end

    def auth_token
      @auth_token ||= JsonWebToken.decode(http_token)
    end

    def user_id_in_token?
      http_token &&
          auth_token && auth_token[:user_id].to_i
    end

  end
end
class ApplicationController < ActionController::Base
  attr_accessor :current_user

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

  def merge_facebook_into_models
    ApplicationRecord.setup_facebook!(@current_user)
  end

  private

  def http_token
    @http_token ||= if request.headers['Authorization'].present?
                      request.headers['Authorization'].split(' ').last
                    end
  end

  def auth_token
    @auth_token ||= JsonWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token && auth_token && auth_token[:user_id].to_i
  end

end

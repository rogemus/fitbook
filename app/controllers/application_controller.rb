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

end

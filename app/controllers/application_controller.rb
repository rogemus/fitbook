class ApplicationController < ActionController::API

  rescue_from ActionController::ParameterMissing, with: :bad_params

  attr_reader :current_user, :koala

  def bad_params(e)
    render json: {error: e}, status: :unprocessable_entity
  end

  def options
    render json: {}
  end

  protected

  def authenticate_request!
    unless user_id_in_token?
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
      return
    end
    id = auth_token[:user][:user_id]
    @current_user = User.find(id)
    koala
  rescue JWT::VerificationError, JWT::DecodeError => e
    render json: { errors: e.message }, status: :unauthorized
  end

  private

  def http_token
    @http_token ||= if request.headers['Authorization'].present?
      request.headers['Authorization'].split('Bearer ').last
    end
  end

  def auth_token
    @auth_token ||= JSONWebToken.decode(http_token)
  end

  def user_id_in_token?
    http_token

    auth_token[:user]&.[](:user_id).to_i
  end

  def koala
    @koala ||= Koala::Facebook::API.new(@current_user.graph_token)
  end

end

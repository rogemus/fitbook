class ApplicationController < ActionController::API

  include GlobalDoc

  rescue_from ActionController::ParameterMissing, with: :bad_params
  rescue_from JWT::ExpiredSignature, with: :expired_token

  attr_reader :current_user, :koala

  def err
    error_params = params.permit(:platform, :stack)
    error_params.stack.flatten! if error_params.stack
    render json: ErrorLog.create(error_params), status: :created
  end

  def bad_params(e)
    render json: {error: e}, status: :unprocessable_entity
  end

  def expired_token(e)
    render json: {error: 'Token has expired'}, status: :unauthorized
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

  def authenticate_request
    if http_token && user_id_in_token?
      @current_user = User.find(auth_token[:user][:user_id])
    end
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

class ApplicationController < ActionController::API

  attr_reader :current_user, :koala

  protected

  def authenticate_request!
    unless user_id_in_token?
      render json: { errors: ['Not Authorized'] }, status: :unauthorized
      return
    end
    id = auth_token[:user][:user_id]
    @current_user = User.find(id)
    koala
  rescue JWT::VerificationError, JWT::DecodeError
    render json: { errors: ['Non Authenticated'] }, status: :unauthorized
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

  def token_not_expired
    @auth_token[:exp] > Time.now.to_i
  end

  def user_id_in_token?
    http_token && auth_token && token_not_expired &&
        auth_token[:user] && auth_token[:user][:user_id].to_i
  end

  def koala
    @koala = Koala::Facebook::API.new(@current_user.graph_token)
  end

end

class Api::AuthenticationController < ::Api::ApiController

  def user_from_facebook_token
    user = User.from_fb_token(params[:facebook_token])
    if user
      render json: payload(user)
    else
      render json: {errors: ['Invalid credentials'] }, status: :unauthorized
    end
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

  def payload(user)
    return nil unless user&.id
    {
        auth_token: JsonWebToken.encode( {user_id: user.id} ),
        user: {id: user.id}
    }
  end
end

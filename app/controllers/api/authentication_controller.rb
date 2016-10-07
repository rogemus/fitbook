class Api::AuthenticationController < ::Api::ApiController
  attr_accessor :current_user

  def user_from_facebook_token
    user = User.from_fb_token(params[:facebook_token])
    if user
      render json: payload(user)
    else
      render json: {errors: ['Invalid credentials'] }, status: :unauthorized
    end
  end

  def payload(user)
    return nil unless user&.id
    {
        auth_token: JsonWebToken.encode( {user_id: user.id} ),
        user: {id: user.id}
    }
  end
end

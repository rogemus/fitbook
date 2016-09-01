class SessionsController < ApplicationController

  def from_omniauth
    user = User.from_omniauth(request.env['omniauth.auth'])
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

end
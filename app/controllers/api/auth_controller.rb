module Api

  class AuthController < ::ApplicationController

    include Api::AuthDoc

    def facebook
      token = params.require(:token)
      auth_hash = User::find_in_facebook(token)
      user = User.find_by({:facebook_id => auth_hash['id']})
      if user
        user.update_attribute(:graph_token, token)
      else
        user = User.create!(
            {:name => auth_hash['name'],
             :facebook_id => auth_hash['id'],
             :email => auth_hash['email'],
             :graph_token => token})
      end
      render json: token_payload(user)
    rescue => error
      render json: {:errors => error}, status: :unauthorized
    end

    private

    def token_payload(user)
      return nil unless user&.id
      payload = {user_id: user.id, name: user.name}
      {
          token: JSONWebToken.encode(payload),
          user: payload
      }
    end
  end

end
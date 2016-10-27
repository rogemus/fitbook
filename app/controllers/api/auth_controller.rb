require 'net/http'

module Api

  class AuthController < ::ApplicationController

    include Api::AuthDoc

    # todo: rescue po invalid fb tokenie
    def facebook
      token = params.require(:token)
      auth_hash = User::find_in_facebook(token)
      user = User.find_by({:facebook_id => auth_hash['id']})
      token = generate_long_term(token) if params[:long_term] == 'true'
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
    end

    private

    def generate_long_term(token)
      params = {
          :grant_type => :fb_exchange_token,
          :client_id => ::Facebook::APP_ID,
          :client_secret => ::Facebook::SECRET,
          :fb_exchange_token => token
      }.map { |k, v| "#{k}=#{v}"}.join('&')
      url = URI('https://graph.facebook.com/oauth/access_token?' + params)
      ::Net::HTTP::get(url).sub('access_token=', '')
    end

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
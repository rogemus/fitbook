require 'net/http'

module Api

  class AuthController < ::ApplicationController

    include Api::AuthDoc

    def facebook
      token = params.require(:token)
      auth_hash = User::find_in_facebook(token)

      token = generate_long_term(token) if params[:long_term] == 'true'
      user = user_from_token(auth_hash, token)

      render json: token_payload(user)

    rescue Koala::Facebook::AuthenticationError => e
      render json: {errors: e}, status: :bad_request
    end

    def refresh
      unless user_id_in_token?
        render json: { errors: ['Not Authorized'] }, status: :unauthorized
        return
      end
      render json: token_payload(User.find(auth_token[:user][:user_id]))
    rescue JWT::VerificationError, JWT::DecodeError => e
      render json: { errors: e.message }, status: :unauthorized
    end

    private

    def user_from_token(auth_hash, token)
      user = User.find_by({:facebook_id => auth_hash['id']})
      picture = auth_hash['picture']&.[]('data')&.[]('url')
      cover = auth_hash['cover']&.[]('source')

      if user
        user.update!({:graph_token => token,
                      :picture => picture, :cover => cover})
      else
        data = {:name => auth_hash['name'],
                :facebook_id => auth_hash['id'],
                :email => auth_hash['email'],
                :graph_token => token,
                :picture => picture, :cover => cover}
        user = User.create!(data)
      end
      user
    end

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
      iss = Time.now.to_i
      exp = iss + 12 * 3600

      payload = {user_id: user.id, name: user.name}
      {
          token: JSONWebToken.encode({user: payload, exp: exp, iss: iss}),
          user: UserSerializer.new(user),
          iss: iss,
          exp: exp
      }
    end

  end

end
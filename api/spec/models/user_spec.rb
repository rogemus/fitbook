require 'rails_helper'

RSpec.describe User, type: :model do

  context 'user coming from facebook' do

    it 'authorizes with invalid token' do
      token = 'INVALID_FB_TOKEN'
      expect {
        User.find_in_facebook(token)
      }.to raise_error Koala::Facebook::AuthenticationError
    end

    context 'uses valid facebook token' do

      it 'uses valid token' do
        token = 'EAAOBiJsdf14BAP71B8hU9yORBmtXOczSpoOFnXkyVDqZCZAi1XPpbuKX8MuXU4lakw7VM4gCBgiv8R3eLU5o8O0C3KX4kRzTVhjLLfNNqzo1VG2NUxMeSlrRJrV6ZAC0NsRbyFe0CHp7vL9bJzQNE2lqk6ape4OZAuesWZB1TYAZDZD'
        user_hash = User.find_in_facebook(token)
        expect(user_hash).to include('id', 'name', 'email')
      end

    end

  end

end

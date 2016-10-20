require 'test_helper'

class Api::AuthControllerTest < ActionDispatch::IntegrationTest

  test 'tries to auth without token' do
    assert_raise(ActionController::ParameterMissing) do
      post path + 'facebook', params: {:token => nil}
    end
  end

  test 'tries to auth with invalid token' do
    assert_raise(Koala::Facebook::AuthenticationError) do
      post path + 'facebook', params: {:token => 'INVALID_TOKEN'}
    end
  end

  test 'log with valid token' do
    post path + 'facebook', params: {:token => ENV['USER_FB_TOKEN']}
    resp = JSON.parse(@response.body)
    assert_not_empty(resp['token'])
    assert_not_empty(resp['user'])
  end

  private

  def path
    '/api/auth/'
  end

end

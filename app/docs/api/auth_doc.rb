module Api::AuthDoc
  extend BaseDoc

  namespace 'api'
  resource :auth

  resource_description do
    short 'Authorization'
  end

  defaults do
  end

  doc_for :facebook do
    api :POST, '/auth/facebook', 'Auth using facebook token'
    param :token, String, :required => true
  end

end
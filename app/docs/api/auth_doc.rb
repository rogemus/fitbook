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
    description <<-eos
    Returns token for use in API as:
    Header -> Authorization: Bearer <token>
    eos
    api :POST, '/auth/facebook', 'Auth using facebook token, returns token and User'
    param :token, String, :required => true
    param :long_term, [true, false], :desc => <<-eos
    Generate long term token from given short term,
    only for short living token (web)
    eos
  end

end
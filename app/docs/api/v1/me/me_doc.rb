module Api::V1::Me::MeDoc
  extend BaseDoc

  namespace 'api/v1/me'
  resource :me

  resource_description do
    short 'Current user profile actions'
  end

  defaults do
  end

  doc_for :index do
    api :GET, '/v1/me', 'Show profile'
  end

end
module Api::V1::Me::MeDoc
  extend BaseDoc

  namespace 'api/v1/me'
  resource :me

  resource_description do
    short 'Current user profile actions'
  end

  defaults do
  end

  doc_for :show do
    api :GET, '/v1/me', 'Show profile'
  end

  doc_for :update do
    desc = 'Update current user options'
    api :PUT, '/v1/me/', desc
    api :PATCH, '/v1/me/', desc

    param :options, Hash, :required => true, :desc => 'Options' do
      param :is_trainer, [true, false], :desc => 'Being trainer flag'
    end
  end

end
module Api::V1::Me::GymsDoc
  extend BaseDoc

  namespace 'api/v1/me'
  resource :gyms

  resource_description do
    short 'Current user gyms'
  end

  defaults do
  end

  doc_for :show do
    api :GET, '/v1/me/gyms', 'Get current user gyms'
  end

  doc_for :create do
    api :POST, '/v1/me/gyms', 'Create gym from valid facebook id'
    param :id, Integer, :required => true
  end

  doc_for :update do
    api :PUT, '/v1/me/gyms', 'Update gym from valid facebook id'
    api :PATCH, '/v1/me/gyms', 'Update gym from valid facebook id'
    param :id, Integer, :required => true
  end

  doc_for :destroy do
    param :id, Integer, :required => true
  end

  doc_for :available do
    api :GET, '/v1/me/gyms/available', 'Get list of available gyms from facebook'
  end

end
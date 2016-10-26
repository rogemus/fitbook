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
    api :GET, '/v1/me/gyms', 'Get gyms owned by current user'
  end

  doc_for :available do
    api :GET, '/v1/me/gyms/available', 'Get list of available gyms from facebook'
  end

  doc_for :create do
    api :POST, '/v1/me/gyms', 'Create gym from valid facebook id'
    param :facebook_id, Integer, :required => true
  end

  doc_for :update do
    desc = 'Pull newest data from facebook'
    api :PUT, '/v1/me/gyms', desc
    api :PATCH, '/v1/me/gyms', desc
    param :id, Integer, :required => true
  end

  doc_for :join do
    api :POST, '/v1/me/gyms/join', 'Join gym with given level'
    param :id, Integer, :required => true
    param :level, [:regular, :special, :trainer],
           :desc => 'Default is regular, special and trainer requires owner approval'
  end

end
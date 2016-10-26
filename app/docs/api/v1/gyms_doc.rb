module Api::V1::GymsDoc
  extend BaseDoc

  namespace 'api/v1'
  resource :gyms

  resource_description do
    short 'Public gyms'
  end

  defaults do
  end

  doc_for :index do
    api :GET, '/v1/gyms', 'All gyms'
  end

  doc_for :show do
    api :GET, '/v1/gyms/:id', 'Find gym where :id'
  end

end
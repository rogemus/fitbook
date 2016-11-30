module Api::V1::LocationsDoc
  extend BaseDoc

  namespace 'api/v1'
  resource :locations

  resource_description do
    short 'Locations'
  end

  doc_for :index do
    api :GET, '/v1/locations', 'Get existing locations'
    param :type, [:countries, :cities],
          desc: 'Requested location type', required: true
  end

end
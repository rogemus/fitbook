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
    api :GET, '/v1/gyms', 'All gyms, can be filtered by hash, city/country prior'
    param :location, Hash, :desc => 'Hash with two options by city & country, or by location' do
      param :city, String
      param :country, String
      param :top_left, Hash, :desc => 'Top left viewport' do
        param :latitude, Float
        param :longitude, Float
      end
      param :bottom_right, Hash, :desc => 'Bottom right viewport' do
        param :latitude, Float
        param :longitude, Float
      end
    end
  end

  doc_for :show do
    api :GET, '/v1/gyms/:id', 'Find gym where :id'
  end

end
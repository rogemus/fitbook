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
    api :GET, '/v1/gyms/', 'Get 10 newest gyms'
    param :level, [:regular, :special, :trainer, :owner],
          :desc => 'Optional filter for new gyms'
    param :not_level, [:regular, :special, :trainer, :owner],
          :desc => 'Optional filter for new gyms'
  end

  doc_for :show do
    api :GET, '/v1/gyms/:id', 'Find gym where :id'
  end

  doc_for :comments do
    api :GET, '/v1/gyms/:id/comments', 'Get comments for gym :id'
  end

  doc_for :trainers do
    api :GET, '/v1/gyms/:id/trainers', 'Get trainers from gym :id, fields are sorted by approval'
  end

  doc_for :find do
    api :POST, '/v1/gyms/find', 'Find gym by city/country or viewport'
    param :location, Hash, :desc => 'City and country' do
      param :city, String
      param :country, String
    end
    param :location, Hash, :desc => 'Current viewport' do
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

end
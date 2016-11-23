module Api::V1::TrainersDoc
  extend BaseDoc

  namespace 'api/v1'
  resource :trainers

  resource_description do
    short 'Public trainers'
  end

  doc_for :index do
    api :GET, '/v1/users/trainers', 'Get trainers list'
  end

  doc_for :show do
    api :GET, '/v1/users/trainers/:id', 'Get detailed trainer public profile with :id'
  end

  doc_for :posts do
    api :GET, '/v1/users/trainers/:id/posts', 'Get posts of trainer with :id'
  end

end
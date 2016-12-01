module Api::V1::Me::TrainersDoc
  extend BaseDoc

  namespace 'api/v1/me'
  resource :trainers

  resource_description do
    short 'Current user trainers actions'
  end

  doc_for :index do

  end

  doc_for :vote do
    desc = 'Vote on trainer :id'
    url = '/v1/me/trainers/:id/vote'
    api :PUT, url, desc
    api :PATCH, url, desc
  end

end
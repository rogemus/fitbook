module Api::V1::Me::TrainersDoc
  extend BaseDoc

  namespace 'api/v1/me'
  resource :trainers

  resource_description do
    short 'Current user trainers actions'
  end

  doc_for :comment do
    api :POST, '/v1/me/trainers/:id/comment', 'Comment trainer with :id'
    param :body, String, desc: 'Comment body', required: true
  end

  doc_for :vote do
    desc = 'Vote on trainer :id'
    url = '/v1/me/trainers/:id/vote'
    param :rating, Float, desc: 'Rating', required: true
    api :PUT, url, desc
    api :PATCH, url, desc
  end

end
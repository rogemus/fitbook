module Api::V1::PostsDoc
  extend BaseDoc

  namespace 'api/v1'
  resource :posts

  resource_description do
    short 'Posts'
  end

  doc_for :index do
    api :GET, '/v1/posts', 'Get newest posts'
  end

  doc_for :show do
    api :GET, '/v1/posts/:id', 'Find post with :id'
  end

end
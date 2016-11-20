module Api::V1::Me::PostsDoc

  extend BaseDoc

  namespace 'api/v1/me'
  resource :posts

  resource_description do
    short 'Current user posts, user needs to be trainer'
  end

  def_param_group :post do
    param :post, Hash, required: true, action_aware: true do
      param :title, String, desc: 'Post title, length in 1..55', required: true
      param :heading, String, desc: 'Post heading, length in 1..255', required: true
      param :body, String, desc: 'Post body, length in 1..63_206', required: true
      param :tags, Array, of: String, desc: 'Optional list of tags'
    end
  end

  defaults

  doc_for :index do
    api :GET, '/v1/me/posts', 'Get current user posts'
  end

  doc_for :create do
    api :POST, '/v1/me/posts', 'Add new post'
    param_group :post, as: :create
  end

  doc_for :update do
    desc = 'Update post with :id'
    url = '/v1/me/posts/:id'
    api :PUT, url, desc
    api :PATCH, url, desc
    param_group :post, as: :update
  end

  doc_for :destroy do
    api :DELETE, '/v1/me/posts/:id', 'Delete post with :id'
  end

end
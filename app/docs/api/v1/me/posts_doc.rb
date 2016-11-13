module Api::V1::Me::PostsDoc

  extend BaseDoc

  namespace 'api/v1/me'
  resource :posts

  resource_description do
    short 'Current user posts, user needs to be trainer'
  end

  defaults

  doc_for :index do

  end

  doc_for :create do

  end

  doc_for :show do

  end

  doc_for :update do

  end

  doc_for :destroy do

  end

end
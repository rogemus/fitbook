module Api::V1::UsersDoc
  extend BaseDoc

  namespace 'api/v1'
  resource :users

  resource_description do
    short 'Public users'
  end

  doc_for :show do
    api :GET, '/v1/users/:id', 'Find user where :id'
  end

end
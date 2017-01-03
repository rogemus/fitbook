module Api::V1::Me::GymsDoc
  extend BaseDoc

  namespace 'api/v1/me'
  resource :gyms

  resource_description do
    short 'Current user gyms'
  end

  defaults do
  end

  doc_for :show do
    api :GET, '/v1/me/gyms', 'Get gyms owned by current user'
  end

  doc_for :available do
    api :GET, '/v1/me/gyms/available', 'Get list of available gyms from facebook'
  end

  doc_for :create do
    api :POST, '/v1/me/gyms', 'Create gym from valid facebook id'
    param :facebook_id, Integer, :required => true
  end

  doc_for :update do
    desc = 'Pull newest data from facebook'
    api :PUT, '/v1/me/gyms/:id/', desc
    api :PATCH, '/v1/me/gyms/:id/', desc
  end

  doc_for :voted_on do
    api :GET, '/v1/me/gyms/voted_on', 'Get list of voted on gyms'
  end

  doc_for :comment do
    api :POST, '/v1/me/gyms/:id/comment', 'Comment gym with :id'
    param :body, String, desc: 'Comment body', required: true
  end

  doc_for :join do
    api :POST, '/v1/me/gyms/:id/join', 'Join gym with given level'
    param :level, [:regular, :special, :trainer],
           :desc => 'Default is regular, special and trainer requires owner approval'
  end

  doc_for :change_membership do
    api :PUT, '/v1/me/gyms/:id/join', 'Change gym joined level'
    api :PATCH, '/v1/me/gyms/:id/join', 'Change gym joined level'
    param :level, [:regular, :special, :trainer],
          :desc => 'Default is regular, special and trainer requires owner approval',
          required: true
  end

  doc_for :vote do
    desc = 'Vote on gym :id'
    url = '/v1/me/gyms/:id/vote'
    param :rating, Float, desc: 'Rating', required: true
    api :PUT, url, desc
    api :PATCH, url, desc
  end

end
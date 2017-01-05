module GlobalDoc
  extend BaseDoc

  resource :application

  resource_description do
    short 'Global'
  end

  defaults do
  end

  doc_for :err do
    api :POST, '/error', 'Post stack'
    param :platform, String
    param :stack, Hash
  end

end
module Api::V1
  class BaseController < ::Api::ApiController
    resource_description do
      api_base_url 'api/v1'
      api_version 'v1'
    end
  end
end
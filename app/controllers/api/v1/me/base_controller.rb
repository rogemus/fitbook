module Api::V1
  class Me::BaseController < BaseController
    before_action :authenticate_request!
  end
end

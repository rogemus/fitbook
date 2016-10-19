module Api

  class BaseController < ::ApplicationController
    before_action :authenticate_request!
  end

end
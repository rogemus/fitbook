module Api

  class BaseController < ::ApplicationController
    before_filter :authenticate_request!
  end

end
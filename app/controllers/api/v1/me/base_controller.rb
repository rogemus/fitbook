module Api::V1::Me
  class BaseController < Api::V1::BaseController
    before_action :authenticate_request!, :merge_facebook_into_models
  end
end
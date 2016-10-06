module Api
  class ApiController < ApplicationController

    def merge_facebook_into_models
      ApplicationRecord.setup_facebook!(@current_user) if @current_user.facebook_token
    end

  end
end
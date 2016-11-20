module Api::V1
  class LocationsController < BaseController

    include LocationsDoc

    def index
      type = params.require(:type)
      case type
        when 'countries'
          render json: City.uniq.pluck(:name)
        when 'cities'
          render json: Country.uniq.pluck(:name)
        else
          render json: {errors: "Unknown type #{type}, countries and cities allowed"},
                 status: :unprocessable_entity
      end
    end

  end
end

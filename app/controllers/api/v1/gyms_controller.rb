module Api::V1
  class GymsController < BaseController

    include GymsDoc

    def index
      loc = params[:location]
      if test_city_params
        render json: Gym.find_by_city(loc[:city], loc[:country])
      elsif test_lat_long_params
        render json: Gym.find_by_coordinates(loc[:top_left], loc[:bottom_right])
      else
        render json: Gym.all
      end
    end

    def show
      render json: Gym.find(params[:id])
    end

    private

    def test_city_params
      loc = params[:location]
      loc && loc[:city].present? && loc[:country].present?
    end

    def test_lat_long_params
      loc = params[:location]
      tl = params[:location][:top_left] if loc.present?
      rb = params[:location][:bottom_right] if loc.present?
      loc && tl && rb &&
          tl[:latitude].present? && tl[:longitude].present? &&
          rb[:latitude].present? && rb[:longitude].present?
    end

  end
end

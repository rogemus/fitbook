module Api::V1
  class GymsController < BaseController

    before_action :authenticate_request, only: [:index, :show]

    include GymsDoc

    NEW_GYMS_COUNT = 10

    def index
      filter = params[:level] if Member::MEMBERSHIPS.include?(params[:level]&.to_sym)

      if current_user && filter
        render json: gyms_by_filter(filter).limit(NEW_GYMS_COUNT),
               include_user: current_user
      else
        render json: Gym.order(created_at: :desc).limit(NEW_GYMS_COUNT),
               include_user: current_user
      end
    end

    def show
      render json: Gym.find(params[:id]),
             include_user: current_user
    end

    def trainers
      render json: gym_trainers(params[:gym_id]).map(&:user)
    end

    def comments
      gym = Gym.find(params[:gym_id])
      if gym
        render json: gym.comments
      else
        render status: :no_content
      end
    end

    def find
      loc = params[:location]
      if test_city_params
        render json: Gym.find_by_city(loc[:city], loc[:country])
      elsif test_lat_long_params
        render json: Gym.find_by_coordinates(loc[:top_left], loc[:bottom_right])
      else
        render json: {:errors => 'Missing params'}, :status => :bad_request
      end
    end

    private

    def gyms_by_filter(filter)
      Gym.where(
          id: Member.where(user: current_user, membership_level: filter)
                  .pluck(:gym_id)).order(created_at: :desc)
    end

    def gym_trainers(id)
      Member.where({gym: id, membership_level: :trainer}).order(approved: :desc)
    end

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

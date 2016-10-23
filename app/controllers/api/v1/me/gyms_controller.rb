module Api::V1::Me
  class GymsController < BaseController

    include ::Api::V1::Me::GymsDoc

    ALLOWED_CATEGORIES = %w{Gym}
    REQUIRED_PERMISSIONS = %w{ADMINISTER}

    def show
      render json: @current_user.owned_gyms
    end

    def create
      facebook_id = params.require(:facebook_id)
      fb_result = facebook_gym(facebook_id)
      gym = Gym.create!({:name => fb_result['name'],
                     :facebook_id => facebook_id,
                     :graph_token => fb_result['access_token'],
                     :owner => @current_user})
      join_gym(gym)
      render json: gym
    rescue => error
      render json: {:error => error}, status: :bad_request
    end

    def update
      gym = Gym.find_by!({:id => params.require(:id),
                         :owner => @current_user})
      render json: gym
    end

    def destroy
      # TODO
      id = params.require(:id)
    end

    def available
      render json: facebook_gyms.map {|gym| {:id => gym['name'],
                                             :name => gym['id']}}
    end

    private

    def join_gym(gym)
      @current_user.join_gym_as_owner(gym)
    end

    def facebook_gym(id)
      facebook_gyms.find {|gym| gym['id'] == id} or
          raise 'Gym has invalid category, permissions or already exists'
    end

    def facebook_gyms
      @koala.get_connections(:me, :accounts).select do |gym|
        validate_gym_fields(gym)
      end
    end

    def validate_gym_fields(gym)
      owned_gyms = @current_user.owned_gyms.map {|gym| gym[:facebook_id]} || []
      categories = gym['category_list'].map {|category| category['name']} || []

      !owned_gyms.include?(gym['id'].to_i) &&
          categories & ALLOWED_CATEGORIES &&
          gym['perms'] & REQUIRED_PERMISSIONS
    end
  end
end

module Api::V1::Me
  class GymsController < BaseController

    include ::Api::V1::Me::GymsDoc

    ALLOWED_CATEGORIES = ['Gym/Physical Fitness Center']
    REQUIRED_PERMISSIONS = %w{ADMINISTER}

    def index
      render json: current_user.members
    end

    def show
      render json: Gym.where({id: params.require(:id), owner: current_user})
    end

    def create
      facebook_id = params.require(:facebook_id)
      fb_result = facebook_gym(facebook_id)
      gym = Gym.create!({:name => fb_result['name'],
                         :facebook_id => facebook_id,
                         :graph_token => fb_result['access_token'],
                         :owner => current_user})
      join_gym_as_owner(gym)
      merge_facebook_data(gym)

      render json: gym
    rescue => error
      render json: {:error => error}, status: :bad_request
    end

    def update
      gym = Gym.find_by!({:id => params.require(:id),
                          :owner => current_user})
      merge_facebook_data(gym)

      render json: gym
    end

    def available
      gyms = facebook_gyms
      if gyms.empty?
        render json: {}, status: :no_content
      else
        render json: gyms.map {|gym| {:id => gym['id'],
                                      :name => gym['name']}}
      end
    end

    def vote
      vote = current_user.vote_on(Gym.find(params[:id]), params.require(:rating))

      if vote.valid?
        render json: vote.voteable
      else
        render json: vote.errors, status: :bad_request
      end
    end

    def join
      gym = Gym.find(params.require(:id))
      mailing = params[:mailing] || false

      member = current_user.join_gym(gym, params[:level] || :regular, false, mailing: mailing)

      if member.valid?
        render json: member, status: :created
      else
        render json: member.errors.messages, status: :bad_request
      end
    end

    def change_membership
      level = params.require(:level).to_sym
      mailing = params[:mailing]
      membership = Member.find_by({gym: params[:id], user: current_user})

      errors = nil

      if membership && membership != :owner
        membership.approved = Member::APPROVED_MEMBERSHIP_LEVELS.include? level
        membership.membership_level = level

        membership.mailing = mailing unless mailing.nil?

        if membership.save
          render json: membership
        else
          errors << membership.errors
        end
      else
        errors << 'Can\'t find membership or invalid membership level'
      end

      render json: {errors: errors}, status: :unprocessable_entity unless errors.empty?
    end

    private

    def merge_facebook_data(gym)
      gym.include_facebook_data!
      gym.save!
    end

    def join_gym_as_owner(gym)
      current_user.join_gym_as_owner(gym)
    end

    def facebook_gym(id)
      facebook_gyms.each do |gym|
        return gym if gym['id'].to_i == id.to_i
      end
      raise 'Gym has invalid category, permissions or already exists'
    end

    def facebook_gyms
      Gym.facebook_gyms(koala).select do |gym|
        validate_gym_fields(gym)
      end
    end

    def validate_gym_fields(gym)
      owned_gyms = current_user.owned_gyms.map {|owned| owned[:facebook_id]} || []

      main_category = gym['category']

      categories_list = []
      categories_list = gym['category_list'].map {|category| category['name']} if gym.key?('category_list')

      all_categories = [main_category].concat(categories_list)

      !owned_gyms.include?(gym['id'].to_i) &
          ((all_categories & ALLOWED_CATEGORIES).count > 0) &
          ((gym['perms'] & REQUIRED_PERMISSIONS).count > 0)
    end
  end
end

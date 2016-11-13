module Api::V1::Me
  class PostsController < BaseController

    include PostsDoc

    before_action :ensure_is_trainer!

    def index

    end

    def create

    end

    def show

    end

    def update

    end

    def destroy

    end

    private

    def ensure_is_trainer!
      raise MustBeTrainer(current_user) unless current_user.is_trainer

    rescue MustBeTrainer => e
      render json: { errors: e.message }, status: :unauthorized
    end

  end

  class MustBeTrainer < ::StandardError
    def initialize(user, message = nil)
      @user = user
      @message = message
      @default_message = "User: #{user.id}:#{user.name} is not a trainer"
    end

    def to_s
      @message || @default_message
    end
  end

end

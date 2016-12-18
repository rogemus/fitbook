module Api::V1
  class TrainersController < BaseController

    include TrainersDoc

    def index
      render json: User.where(is_trainer: true)
    end

    def show
      user = detailed_trainer(params.require(:id))
      if user
        render json: user,
               include_gyms: true
      else
        render json: not_trainer, status: :unprocessable_entity
      end
    end

    def posts
      user = detailed_trainer(params.require(:trainer_id))
      if user
        render json: user,
               include_posts: true
      else
        render json: not_trainer, status: :unprocessable_entity
      end
    end

    def comments
      user = detailed_trainer(params.require(:trainer_id))
      if user
        render json: user.comments
      else
        render json: not_trainer, status: :unprocessable_entity
      end
    end

    private

    def detailed_trainer(id)
      User.find_by({id: id, is_trainer: true})
    end

    def not_trainer
      {errors: 'User does not exists or is not trainer'}
    end

  end
end
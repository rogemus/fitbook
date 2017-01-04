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
        not_trainer
      end
    end

    def posts
      user = detailed_trainer(params.require(:trainer_id))
      if user
        render json: user,
               include_posts: true
      else
        not_trainer
      end
    end

    def comments
      user = detailed_trainer(params.require(:trainer_id))
      if user
        render json: user.comments
      else
        not_trainer
      end
    end

    private

    def detailed_trainer(id)
      User.find_by({id: id, is_trainer: true})
    end

    def not_trainer
      render json: not_trainer
      #{errors: 'User does not exists or is not trainer'}
    end

  end
end
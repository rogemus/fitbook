module Api::V1::Me
  class TrainersController < BaseController

    include ::Api::V1::Me::TrainersDoc

    def index

    end

    def vote
      vote = current_user.vote_on(User.find(params[:trainer_id]), params.require(:rating))

      if vote.valid?
        render json: vote.voteable
      else
        render json: vote.errors, status: :bad_request
      end
    end

  end
end

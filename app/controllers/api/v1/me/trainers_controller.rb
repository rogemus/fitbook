module Api::V1::Me
  class TrainersController < BaseController

    include ::Api::V1::Me::TrainersDoc

    def comment
      body = params.require(:body)
      trainer = User.find(params[:trainer_id])

      comment = Comment.new(user: current_user, body: body, commentable: trainer)

      if comment.save
        render json: comment, status: :created
      else
        render json: comment.errors, status: :unprocessable_entity
      end
    end

    def vote
      vote = current_user.vote_on(User.find(params[:trainer_id]), params.require(:rating))

      if vote.valid?
        voteResult = Object.new
        voteResult.voteable = vote.voteable
        voteResult.vote = vote.vote
        render json: voteResult
      else
        render json: vote.errors, status: :bad_request
      end
    end

  end
end

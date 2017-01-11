module Api::V1::Me
  class TrainersController < BaseController

    include ::Api::V1::Me::TrainersDoc
    VoteResult = Struct.new(:voteable, :vote)


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
        vote_result = VoteResult.new(vote.voteable, vote.vote)
        render json: vote_result
      else
        render json: vote.errors, status: :bad_request
      end
    end

  end
end

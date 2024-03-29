module Api::V1
  class PostsController < BaseController

    include PostsDoc

    NEW_POSTS_COUNT = 10

    def index
      render json: Post.where(author: User.where(is_trainer: :true)).order(created_at: :desc).limit(NEW_POSTS_COUNT)
    end

    def show
      render json: Post.find(params[:id])
    end

  end
end

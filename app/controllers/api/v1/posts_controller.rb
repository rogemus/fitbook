module Api::V1
  class PostsController < BaseController

    include PostsDoc

    def index
      render json: Post.order(created_at: :desc)
    end

    def show
      render json: Post.find(params[:id])
    end

  end
end

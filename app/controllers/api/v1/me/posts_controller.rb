module Api::V1::Me

  class PostsController < BaseController

    include PostsDoc

    before_action :ensure_is_trainer!

    def index
      render json: current_user.posts
    end

    def create
      post = Post.new(post_params)
      post.author = current_user

      if post.save
        render json: post, status: :created
      else
        render json: post.errors, status: :unprocessable_entity
      end
    end

    def update
      post = current_user_post(params[:id])

      if post&.update(post_params) && post.update({tags: post_tags})
        render json: post
      else
        render json: post&.errors || {}, status: :unprocessable_entity
      end
    end

    def destroy
      render json: {},
             status: current_user_post(params[:id])&.destroy ? :ok : :unprocessable_entity
    end

    private

    def post_tags
      tags_names = params[:post][:tags].map(&Tag.method(:sanitize_name)).uniq
      if tags_names
        existing_tags = Tag.where(name: tags_names).map(&:name)
        Tag.create((tags_names - existing_tags).map {|name| {name: name}})

        Tag.where(name: tags_names)
      else
        []
      end
    end

    def current_user_post(id)
      Post.find_by id: id, author: current_user
    end

    def post_params
      params.require(:post).permit(:title, :heading, :body)
    end

    def ensure_is_trainer!
      raise ::NotATrainerException unless current_user.is_trainer
    rescue ::NotATrainerException => e
      render json: { errors: e }, status: :bad_request
    end
  end

end
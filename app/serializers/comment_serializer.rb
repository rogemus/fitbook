class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :author

  def author
    {
        id: object.user.id,
        images: {
            cover: object.user.cover,
            picuter: object.user.picture
        }
    }
  end
end

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :created_at, :author

  def author
    {
        id: object.user.id,
        name: object.user.name,
        images: {
            cover: object.user.cover,
            picture: object.user.picture
        }
    }
  end
end

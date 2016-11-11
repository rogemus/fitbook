class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :images

  def images
    {
        :cover => object.cover,
        :picture => object.picture
    }
  end

end

class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :images

  def images
    {
        :picture => object.fb_image
    }
  end

end

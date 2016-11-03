class GymSerializer < ActiveModel::Serializer

  attributes :id, :name, :facebook_id, :about, :description, :website, :images

  has_one :location

  def images
    {
        :cover => object.cover,
        :picture => object.picture
    }
  end

end

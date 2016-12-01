class GymSerializer < ActiveModel::Serializer

  attributes :id, :name, :facebook_id, :rating, :about, :description, :website, :images

  has_one :location

  def images
    {
        :cover => object.cover,
        :picture => object.picture
    }
  end

  def rating
    {count: object.votes_count, rating: object.rating}
  end

end

class GymSerializer < ActiveModel::Serializer

  attributes :id, :name, :facebook_id, :rating, :about, :description, :website, :images,
             :parking, :hours

  has_one :location

  def parking
    {parking: merge(object.parking)} if object.parking
  end

  def hours
    {hours: merge(object.hours)} if object.hours
  end

  def images
    {
        :cover => object.cover,
        :picture => object.picture
    }
  end

  def rating
    {count: object.votes_count, rating: object.rating}
  end

  private

  def merge(flat)
    a = eval(flat)
    keys = a.values_at(* a.each_index.select(&:even?))
    values = a.values_at(* a.each_index.select(&:odd?))
    Hash[keys.zip values]
  end

end

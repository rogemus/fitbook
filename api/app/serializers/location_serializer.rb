class LocationSerializer < ActiveModel::Serializer
  attributes :id, :latitude, :longitude, :street, :city, :country

  def city
    object.city.name
  end

  def country
    object.city.country.name
  end

end

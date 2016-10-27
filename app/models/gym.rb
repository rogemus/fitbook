class Gym < ApplicationRecord

  has_many :members
  has_many :attenders, :through => :members, :source => :user

  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true
  has_one :location, inverse_of: :gym

  validates :name, presence: true

  def include_facebook_data!
    koala = Koala::Facebook::API.new(self.graph_token)
    fields = [:about, 'cover.fields(source)', :description,
              :name, :location, :parking, :website, 'picture.fields(url)']
    hash = koala.get_object(self.facebook_id, {:fields => fields})

    self.location = get_location(hash['location']) if hash['location']
    self.about = hash['about']
    self.description = hash['description']

    self.cover = hash['cover']['source'] if hash['cover']
    self.picture = hash['picture']['data']['url'] if hash.dig('picture', 'data')
    self.website = hash['website']
  end

  private

  def get_location(hash)
    country = Country.find_or_create_by!({:name => hash['country']})
    city = City.find_or_create_by!({:name => hash['city'], :country => country})
    Location.find_or_create_by!({:city => city,
                                 :latitude => hash['latitude'],
                                 :longitude => hash['longitude'],
                                 :street => hash['street'],
                                 :gym => self})
  end

end

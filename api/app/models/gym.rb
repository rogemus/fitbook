class Gym < ApplicationRecord

  has_many :comments, as: :commentable

  has_many :mailers

  has_many :members
  has_many :attenders, :through => :members, :source => :user

  belongs_to :owner, :class_name => 'User', :foreign_key => 'owner_id', :validate => true
  has_one :location, inverse_of: :gym

  validates :name, presence: true

  FB_FIELDS = %w{access_token category category_list name id perms}

  class << self
    def find_by_city(city, country)
      city = City.find_by({:name => city,
                           :country => Country.find_by({:name => country})})
      joins(:location).where(locations: {:city_id => city.id})
    end

    def find_by_coordinates(top_left, bottom_right)
      joins(:location).where(locations: Location.fits_in_view(top_left, bottom_right))
    end

    def facebook_gyms(koala)
      koala.get_connections(:me, :accounts, {fields: FB_FIELDS})
    end
  end

  def include_facebook_data!
    #hash = koala.get_object(self.facebook_id, {:fields => fields})
    hash = find_by_fb_id(self.facebook_id)

    self.location = get_location(hash['location']) if hash['location']
    self.about = hash['about']
    self.description = hash['description']

    self.cover = hash['cover']['source'] if hash['cover']
    self.picture = hash['picture']['data']['url'] if hash.dig('picture', 'data')
    self.website = hash['website']

    self.hours = hash['hours'].flatten if hash['hours']
    self.parking = hash['parking'].flatten if hash['parking']
  end

  private

  def find_by_fb_id(id)
    koala = Koala::Facebook::API.new(self.owner.graph_token)
    fields = [:about, 'cover.type(large).fields(source)', :description, :hours, :access_token,
              :name, :location, :parking, :website, 'picture.type(large).fields(url)']

    koala.get_connection(:me, :accounts, {:fields => fields}).detect do |g|
      g['id'].to_i == id
    end
  end

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

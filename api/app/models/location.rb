class Location < ApplicationRecord
  belongs_to :city
  belongs_to :gym, inverse_of: :location

  class << self

    def fits_in_view(tl, br)
      tl_lat = tl[:latitude]
      tl_long = tl[:longitude]
      br_lat = br[:latitude]
      br_long = br[:longitude]

      tl_lat, br_lat = br_lat, tl_lat if tl_lat > br_lat
      tl_long, br_long = br_long, tl_long if tl_long > br_long

      {:latitude => tl_lat..br_lat, :longitude => tl_long..br_long}
    end

  end
end

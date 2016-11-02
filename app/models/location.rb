class Location < ApplicationRecord
  belongs_to :city
  belongs_to :gym, inverse_of: :location

  class << self

    def fits_in_view(tl, br)
      {:latitude => tl[:latitude]..br[:longitude],
       :longitude => tl[:longitude]..br[:longitude]}
    end

  end
end

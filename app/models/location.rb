class Location < ApplicationRecord
  belongs_to :city
  belongs_to :gym, inverse_of: :location
end

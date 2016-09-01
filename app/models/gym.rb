class Gym < ApplicationRecord
  belongs_to :user

  ALLOWED_CATEGORIES = %w{Gym}
  ALLOWED_PERMS = %w{ADMINISTER}
end

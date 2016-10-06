class Member < ApplicationRecord
  enum status: [:member, :trainer, :owner]
end

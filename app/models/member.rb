class Member < ApplicationRecord
  enum status: [:member, :trainer, :owner]
  belongs_to :user
  belongs_to :gym
end

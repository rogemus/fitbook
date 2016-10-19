class Member < ApplicationRecord

  APPROVED_MEMBERSHIP_LEVELS = [:regular]
  BASIC_MEMBERSHIP_LEVELS = APPROVED_MEMBERSHIP_LEVELS + [:special, :trainer]

  validates :membership_level, inclusion: { in: BASIC_MEMBERSHIP_LEVELS } unless :join_as_owner
  enum membership_level: BASIC_MEMBERSHIP_LEVELS + [:owner]

  belongs_to :user
  belongs_to :gym

  def join_as_owner
    self.membership_level = :owner
    approve
  end

  def need_to_approve
    approve if APPROVED_MEMBERSHIP_LEVELS.include?(self.membership_level)
  end

  private

  def approve
    self.approved = true
  end

end

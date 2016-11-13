class Member < ApplicationRecord

  before_validation :default_flags

  attr_accessor :check_for_valid_level, :check_for_trainer

  APPROVED_MEMBERSHIP_LEVELS = [:regular]
  BASIC_MEMBERSHIP_LEVELS = APPROVED_MEMBERSHIP_LEVELS + [:special, :trainer]

  validate :basic_membership, :require_being_a_trainer

  enum membership_level: BASIC_MEMBERSHIP_LEVELS + [:owner]

  belongs_to :user
  belongs_to :gym

  def join_as_owner
    self.membership_level = :owner
    approve
  end

  def need_to_approve
    level = membership_level.to_sym unless membership_level.is_a?(Symbol)
    approve if APPROVED_MEMBERSHIP_LEVELS.include?(level) || level === :owner
  end

  private

  def default_flags
    @check_for_trainer ||= false
    @check_for_valid_level ||= true
  end

  def approve
    self.approved = true
  end

  def basic_membership
    level = membership_level.to_sym unless membership_level.is_a?(Symbol)
    if check_for_valid_level && !BASIC_MEMBERSHIP_LEVELS.include?(level)
      msg = "Invalid membership level #{membership_level.to_s}, must be one of the: #{BASIC_MEMBERSHIP_LEVELS.join(', ')}"
      errors.add(:membership_level, msg)
    end
  end

  def require_being_a_trainer
    if check_for_trainer && !user.is_trainer
      errors.add(:membership_level, 'User needs to be trainer')
    end
  end

end

class Mailer < ApplicationRecord

  self.table_name = :mails

  belongs_to :gym

  has_many :users

  def send
    self.users << receivers
  end

  def receivers
    Member.where({gym: self.gym, mailing: true})&.map(&:user)
  end

  def recount_receivers
    self.receivers_count = receivers.count
  end

end

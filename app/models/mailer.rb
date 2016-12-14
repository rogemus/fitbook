class Mailer < ApplicationRecord

  self.table_name = :mail

  belongs_to :gym

  def receivers
    Member.where({gym: self.gym, mailing: true})
  end

  def recount_receivers
    self.receivers_count = receivers.count
  end

end

class Mailer < ApplicationRecord

  validates :body, length: { in: 1..255 }

  belongs_to :gym

  has_and_belongs_to_many :users

  def send_mails
    self.users << receivers
    self.send = Time.now
    self.users.each do |user|
      NewsletterMailer.deliver_newsletter(self.gym, self.body, self.user)
    end
    self.save
    self.users.count
  end

  def receivers
    Member.where({gym: self.gym, mailing: true})&.map(&:user)
  end

end

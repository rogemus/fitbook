class NewsletterMailer < ApplicationMailer
  default from: 'newsletter@fitbook.com'

  def newsletter(gym, body, receiver)
    @gym = gym
    @user = receiver
    @body = body
    mail(to: receiver.email, subject: "Wiadomość od #{gym.name}")
  end
end

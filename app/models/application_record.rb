class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  @@facebook

  def self.setup_facebook!(user)
    raise Koala::Exception if user.facebook_token.blank?
    @@facebook ||= Koala::Facebook::API.new(user.facebook_token)
  end

end

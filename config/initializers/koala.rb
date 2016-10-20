module Facebook
  CONFIG = YAML.load_file(Rails.root.join('config/facebook.yml'))[Rails.env]
  APP_ID = CONFIG['app_id']
  SECRET = CONFIG['secret_key']
end

=begin
Koala::Facebook::API.class_eval do
  def initialize_with_default_settings(*args)
    raise 'application id and/or secret are not specified in the envrionment' unless Facebook::APP_ID && Facebook::SECRET
    initialize_without_default_settings(args.first, Facebook::SECRET)
  end

  alias_method_chain :initialize, :default_settings
end
=end

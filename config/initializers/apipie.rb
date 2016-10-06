Apipie.configure do |config|
  config.app_name                = "InzTest"
  config.api_base_url            = "/api"
  config.doc_base_url            = "/apipie"
  config.api_routes = Rails.application.routes
  config.default_version = 'v1'
  # where is your API defined?
  config.api_controllers_matcher = "#{Rails.root}/app/controllers/api/**/*.rb"
end

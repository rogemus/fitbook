# This file is used by Rack-based servers to start the application.

require_relative 'config/environment'

use Rack::Cors do

  allow do
    origins '*'
    resource '/*',
             :headers => :any,
             :methods => [:get, :put, :patch, :post, :delete, :options]
  end
end

run Rails.application

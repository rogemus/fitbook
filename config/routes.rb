Rails.application.routes.draw do

  apipie
  devise_for :user

  root to: 'index#index'
  # get 'auth/:provider/callback', to: 'sessions#from_omniauth'

  namespace :api do
    post 'auth/facebook', to: 'api#user_from_facebook_token'
    namespace :v1 do
      namespace :me do
        get '/' => 'me#index'
        resources :gyms, only: [:index, :create, :update] do
          collection do
            get :available
          end
        end
      end
    end
  end
end

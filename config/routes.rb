Rails.application.routes.draw do

  apipie
  devise_for :user

  root to: 'index#index'
  # get 'auth/:provider/callback', to: 'sessions#from_omniauth'

  namespace :api do
    post 'auth/facebook', to: 'authentication#user_from_facebook_token'
    namespace :v1 do
      namespace :me do
        get '/' => 'me#index'
        resources :gyms do
          collection do
            get :available
            post :create
            put :update
          end
        end
      end
      resources :gyms
    end
  end
end

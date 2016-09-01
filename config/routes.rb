Rails.application.routes.draw do

  devise_for :user

  root to: 'index#index'
  get 'auth/:provider/callback', to: 'sessions#from_omniauth'

  namespace :api do
    namespace :v1 do
      namespace :me do
        resources :gyms do
          collection do
            get :available
            post :create
          end
        end
      end
      resources :gyms
    end
  end
end

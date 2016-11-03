Rails.application.routes.draw do

  apipie

  namespace :api do

    namespace :auth do
      post :facebook, to: :facebook
    end

    namespace :v1 do

      resources :gyms, only: [:index, :show] do
      end

      resources :users, only: [:show] do
      end

      namespace :me do
        root to: 'me#index'
        resource :gyms, only: [:create, :show]  do
          get :available
        end
        resources :gyms, only: [:update] do
          member do
            post :join
          end
        end
      end
    end
  end

end

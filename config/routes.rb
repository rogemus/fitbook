Rails.application.routes.draw do

  apipie

  namespace :api do

    namespace :auth do
      post :facebook, to: :facebook
    end

    namespace :v1 do

      resources :gyms, only: [:index, :show] do
        member do
          post :join
        end
      end

      namespace :me do
        root to: 'me#index'
        resource :gyms do
          get :available
          post :join
        end
      end
    end
  end

end

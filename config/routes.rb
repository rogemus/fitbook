Rails.application.routes.draw do

  apipie

  namespace :api, constraints: {id: /\d+/} do

    namespace :auth do
      post :facebook
      put :refresh
      patch :refresh
    end

    namespace :v1 do

      resource :gyms, only: [] do
        post :find
      end

      resources :gyms, only: [:index, :show]

      resources :users, only: [:show]
      resource :users, only: [] do
        get :trainers
      end

      resource :me, :controller => 'me/me', only: [:show, :update]

      namespace :me do

        resource :gyms, only: [:create, :show]  do
          get :available
        end
        resources :gyms, only: [:update] do
          member do
            post :join
          end
        end

        resources :posts

      end
    end
  end

end

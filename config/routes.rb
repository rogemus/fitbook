Rails.application.routes.draw do

  apipie

  match '*nil', to: 'application#options', via: :options

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

      resource :users, only: [:show] do
        resources :trainers, only: [:index, :show] do
          get :posts
        end
      end

      get :locations, to: 'locations#index'

      resource :me, :controller => 'me/me', only: [:show, :update]

      namespace :me do

        resource :gyms, only: [:create, :show]  do
          get :available
        end
        resources :gyms, only: [:update] do
          member do
            post :join
            put :join, action: :change_membership
            patch :join, action: :change_membership
          end
        end

        resources :posts, only: [:index, :create, :update, :destroy]

      end
    end
  end

end

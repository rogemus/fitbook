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

      resources :posts, only: [:index, :show]

      resource :gyms, only: [] { post :find }
      resources :gyms, only: [:index, :show]  { get :trainers }

      resource :users, only: [:show] do
        resources :trainers, only: [:index, :show] { get :posts }
      end

      get :locations, to: 'locations#index'

      resource :me, :controller => 'me/me', only: [:show, :update]

      namespace :me do

        resource :gyms, only: [:create, :show]  { get :available }
        resources :gyms, only: [:update] do
          member do
            post :join
            put :join, action: :change_membership
            patch :join, action: :change_membership
            put :vote
            patch :vote
          end
        end

        resources :posts, only: [:index, :create, :update, :destroy]

      end
    end
  end

end

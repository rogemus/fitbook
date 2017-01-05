Rails.application.routes.draw do

  apipie

  match '*nil', to: 'application#options', via: :options

  post :error, to: 'application#err'

  namespace :api, constraints: {id: /\d+/} do

    namespace :auth do
      post :facebook
      put :refresh
      patch :refresh
    end

    namespace :v1 do

      resources :posts, only: [:index, :show]

      resource :gyms, only: [] { post :find }
      resources :gyms, only: [:index, :show]  do
        get :trainers
        get :comments
      end

      resources :users, only: [:show]
      resource :users, only: [] do
        resources :trainers, only: [:index, :show] do
          get :posts
          get :comments
        end
      end

      get :locations, to: 'locations#index'

      resource :me, :controller => 'me/me', only: [:show, :update]

      namespace :me do

        resource :gyms, only: [:create] do
          get :available
          get :voted_on
        end
        resources :gyms, only: [:index, :update] do
          member do
            post :comment
            delete :leave
            post :join
            put :join, action: :change_membership
            patch :join, action: :change_membership
            put :vote
            patch :vote

            resources :mailings, only: [:index, :create] do
              get :show
              get :receivers
              post :send, action: :commit
            end
          end
        end

        resources :posts, only: [:index, :create, :update, :destroy]

        resources :trainers, only: [] do
          post :comment
          put :vote
          patch :vote
        end

      end
    end
  end

end

Rails.application.routes.draw do
  apipie
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do

    namespace :auth do
      post :facebook, to: :facebook
    end

    namespace :v1 do
      namespace :me do
        root to: 'me#index'
        resource :gyms do
          get :available
        end
      end
    end
  end

end

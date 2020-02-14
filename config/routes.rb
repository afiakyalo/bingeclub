Rails.application.routes.draw do
  devise_for :users

  devise_scope :user do
    authenticated :user do
      root 'homes#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  get "/clubs", to: "homes#index"
  get "/clubs/:id", to: "homes#index"
  post "movies/search", to: "movies#search"

  namespace :api do
    namespace :v1 do
      resources :clubs, only: [:index, :show] do
        resources :movies, only: [:index]
      end
    end
  end
end

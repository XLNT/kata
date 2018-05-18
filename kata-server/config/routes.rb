Rails.application.routes.draw do
  namespace :admin do
    resources :campaigns
    resources :codes
    resources :tokens

    root to: "tokens#index"
  end

  get '/', to: 'home#index'
  post '/api/graphql', to: 'graphql#execute'
end

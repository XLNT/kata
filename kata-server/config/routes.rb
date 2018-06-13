Rails.application.routes.draw do
  namespace :admin do
    resources :campaigns
    resources :codes
    resources :tokens
    post 'tokens/:id/new_code', to: 'tokens#new_code', as: :token_new_code

    root to: "tokens#index"
  end

  get '/', to: 'home#index'
  post '/api/graphql', to: 'graphql#execute'
end

Rails.application.routes.draw do
  get '/', to: 'home#index'
  post '/graphql', to: 'graphql#execute'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

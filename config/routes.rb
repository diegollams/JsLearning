Rails.application.routes.draw do
  get 'examples/index'
  get 'examples/genetic'
  root 'examples#index'
end

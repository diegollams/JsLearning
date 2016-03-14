Rails.application.routes.draw do
  get 'examples/index'
  get 'examples/genetic'
  get 'examples/onemax'
  root 'examples#index'
end

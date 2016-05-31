Rails.application.routes.draw do
  get 'examples/index'
  get 'examples/genetic'
  get 'examples/onemax'
  get 'examples/parallel'
  root 'examples#index'
end

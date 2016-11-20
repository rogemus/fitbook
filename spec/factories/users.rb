FactoryGirl.define do

  factory :jan_kowalski, class: User do
    name 'Jan Kowalski'
    email 'api.gymportal@gmail.com'
    facebook_id '104434019955083'
    graph_token 'EAAOBiJsdf14BAG6kXvy3eidYw5YZBr6gZA7ElW6P1juPyDM4ceBfZAXLRIw9erUCZCI7AESqkdHZBrPUnRgSeXXabNNqvT5ggEWlXO6SofwZAbDzZAPqBkXdrmbgCuzLZBwXpZAxTcnZBqDqZAX6o8PsTXZCWe9kOZBbPZAjAZD'
    is_trainer false
  end

  factory :user do

    name 'User'
    email 'user@example.com'

    trait :is_trainer do
      is_trainer true
    end

    trait :not_a_trainer do
      is_trainer false
    end
  end

end
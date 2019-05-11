FactoryGirl.define do

  factory :gym do

    name 'Gym 1'
    facebook_id 900202020
    graph_token 'xxxxxx'
    owner User.new({name: 'User', facebook_id: 1023912309 })

  end

end
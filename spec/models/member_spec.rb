require 'rails_helper'

RSpec.describe Member, type: :model do

  before(:all) do
    @user = User.create!({:name => 'Jan'})
    @gym = Gym.create(:owner => @user)
  end

  it 'x' do

  end

end

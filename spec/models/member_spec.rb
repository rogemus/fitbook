require 'rails_helper'

RSpec.describe Member, type: :model do

  before(:all) do
    @jan = User.create!({:name => 'Jan'})
    @wojciech = User.create!({:name => 'Wojciech'})

    @gym = Gym.create!(:owner => @jan, :name => 'Gym')
  end

  it 'is in own gym as owner, without need to approval' do
    membership = @jan.join_gym_as_owner(@gym)

    expect(membership[:membership_level]).to eq 'owner'
    expect(membership[:approved]).to be true
  end

  it 'join to other user gym as trainer, check for aproval' do
    membership = @wojciech.join_gym(@gym, :trainer)

    expect(membership[:approved]).to be false
  end

  it 'joins second time to same gym' do
    @jan.join_gym_as_owner(@gym)

    expect {
      @jan.join_gym(@gym, :regular)
    }.to raise_error ActiveRecord::RecordNotUnique
  end

end

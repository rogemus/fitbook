require 'rails_helper'

RSpec.describe Gym, type: :model do

  before(:all) do
    @user = User.create!({:name => 'Jan'})
  end

  it 'creates gym without owner' do
    expect(Gym.new).to_not be_valid
  end

  it 'creates gym without name' do
    expect {
      Gym.create!({:owner => @user})
    }.to raise_error ActiveRecord::RecordInvalid
  end

  it 'creates gym with owner' do
    expect {
      Gym.create!(:owner => @user, :name => 'Gym')
    }.to change { Gym.count }.by(1)
        .and change { @user.owned_gyms.count }.by(1)
  end

end

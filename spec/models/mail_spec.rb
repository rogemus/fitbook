require 'rails_helper'

RSpec.describe Mail, type: :model do

  let (:user) { build :user, :not_a_trainer }
  let (:trainer) { build :user, :is_trainer }

  subject { described_class.new({body: 'Some body', header: 'Some header',
                                 created_at: Time.now,
                                 gym_id: (build :gym)}) }

  it 'is valid' do
    expect(subject).to be_valid
  end

  it 'is not valid without header is too long' do
    subject.header = nil
    expect(subject).to be_valid

    subject.header = 'x' * 60
    expect(subject).to_not be_valid
  end

  it 'is not valid without gym' do
    subject.gym = nil
    expect(subject).to_not be_valid
  end

  context 'body' do

    it 'is not valid when empty' do
      subject.body = nil
      expect(subject).to_not be_valid
    end

    it 'is not valid when too short' do
      subject.body = '    x'
      expect(subject).to_not be_valid
    end

    it 'is not valid when too long' do
      subject.body = 'x' * 1025
      expect(subject).to_not be_valid
    end

  end

  context 'receivers count' do

    before(:all) do

      owner = User.create!({name: 'Owner', facebook_id: 0})
      gym = Gym.create!({name: 'Gym', owner: owner, facebook_id: 0})

      @members = 10.times.map do |i|
        user = User.create!({name: "User_#{i}", facebook_id: Random.rand(100_000_000)})
        Member.create!(user: user, gym: gym, mailing: false)
      end

      @mail = described_class.new({gym_id: gym.id})

    end

    context 'has 10 gym members' do

      it 'and 0 receivers' do
        @mail.recount_receivers
        expect (@mail.receivers_count).to eq 0
      end

      it 'and 1 receiver after change in mailing' do
        @members.first.update_attribute(:mailing, true)
        expect (@mail.recount_receivers).to eq 1
      end

    end

  end

end

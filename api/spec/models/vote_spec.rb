require 'rails_helper'

RSpec.describe Vote, type: :model do

  let (:user) { build :user, :not_a_trainer }

  let (:gym) { build :gym}
  let (:trainer) { build :user, :is_trainer }

  subject { described_class.new(user: user, voteable: gym, rating: 5.0) }

  it 'is valid with valid params' do
    expect(subject).to be_valid
  end

  context 'user' do

    it 'is not valid when missing' do
      subject.user = nil
      expect(subject).to_not be_valid
    end

  end

  context 'rating' do

    it 'is not valid when too low' do
      subject.rating = 0.99
      expect(subject).to_not be_valid
    end

    it 'is not valid when too high' do
      subject.rating = 5.01
      expect(subject).to_not be_valid
    end

  end

  context 'voteable' do

    context 'is gym' do

      it 'vote type is Gym' do
        subject.voteable = gym
        expect(subject.voteable_type).to eq 'Gym'
      end

    end

    context 'is a user' do

      it 'vote type is User' do
        subject.voteable = user
        expect(subject.voteable_type).to eq 'User'
      end

      it 'is not valid when is not trainer' do
        subject.voteable = user
        expect(subject).to_not be_valid
      end

      it 'it is valid when is trainer' do
        subject.voteable = trainer
        expect(subject).to be_valid
      end

      it 'cannot vote on himself' do
        subject.user = trainer
        subject.voteable = trainer

        expect(subject).to_not be_valid
      end

    end
  end

  it 'is invalid when votes on same thing' do
    user.save!

    id = 9999999

    trainer.id = id
    trainer.save!

    gym.id = id
    gym.save!

    vote1 = described_class.new(user: user, voteable: trainer, rating: 2)
    vote2 = described_class.new(user: user, voteable: trainer, rating: 2)
    vote3 = described_class.new(user: user, voteable: gym, rating: 2)

    vote1.save!

    expect(vote2).to_not be_valid
    expect(vote3).to be_valid
  end

end

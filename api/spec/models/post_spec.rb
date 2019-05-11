require 'rails_helper'

RSpec.describe Post, type: :model do

  subject { described_class.new(title: 'Tytul',
                                body: "Ciało tekstu \n kolejna linia",
                                heading: 'Wstęp',
                                author: (build :user, :is_trainer)) }

  it 'is valid with valid params' do
    expect(subject).to be_valid
  end

  describe 'content' do

    describe 'title' do
      it 'is not valid when too short' do
        subject.title = nil
        expect(subject).to_not be_valid
        subject.title = ' '
        expect(subject).to_not be_valid
      end

      it 'is not valid when too long' do
        subject.title = 'x' * 56
        expect(subject).to_not be_valid
      end
    end

    describe 'body' do
      it 'is not valid when too short' do
        subject.body = nil
        expect(subject).to_not be_valid
        subject.body = ' '
        expect(subject).to_not be_valid
      end

      it 'is not valid when too long' do
        subject.body = 'x' * 63_207
        expect(subject).to_not be_valid
      end
    end

    describe 'heading' do
      it 'is not valid when too short' do
        subject.heading = nil
        expect(subject).to_not be_valid
        subject.heading = ' '
        expect(subject).to_not be_valid
      end

      it 'is not valid when too long' do
        subject.heading = 'x' * 256
        expect(subject).to_not be_valid
      end
    end
  end

  describe 'author' do
    let (:not_trainer) { build :user, :not_a_trainer}

    it 'is not valid when author is not trainer' do
      subject.author = not_trainer
      expect(subject).to_not be_valid
    end
  end
end

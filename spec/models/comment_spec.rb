require 'rails_helper'

RSpec.describe Comment, type: :model do

  let (:user) { build :user, :not_a_trainer }

  let (:gym) { build :gym}
  let (:trainer) { build :user, :is_trainer }

  subject { described_class.new(user: user, commentable: gym, body: 'Dupa') }

  it 'is valid with valid params' do
    expect(subject).to be_valid
  end

end

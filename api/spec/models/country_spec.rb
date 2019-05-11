require 'rails_helper'

RSpec.describe Country, type: :model do

  context 'with no countries' do

    it 'adds Poland, Germany, France' do
      expect {
        Country.create({:name => 'Poland'})
        Country.create({:name => 'Germany'})
        Country.create({:name => 'France'})
      }.to change {Country.count}.by(3)
    end

    it 'adds without name' do
      expect(Country.new({:name => nil})).to_not be_valid
    end

  end

  context 'after adding countries' do

    it 'adds duplicate country' do
      Country.create({:name => 'Poland'})
      expect(Country.create({:name => 'Poland'})).to_not be_valid
    end

  end

end

require 'rails_helper'

RSpec.describe City, type: :model do

  before(:all) do
    @poland = Country.create({:name => 'Poland'})
    @country_2 = Country.create({:name => 'Country 2'})
    @country_3 = Country.create({:name => 'Country 3'})
  end

  context 'without valid country' do

    it 'creates city without country' do
      expect(City.create({:name => 'Poznan', :country => nil})).to_not be_valid
    end

  end

  context 'with valid country' do

    it 'adds country without name' do
      expect(City.create({:name => nil, :country => @poland})).to_not be_valid
    end

    it 'adds duplicate city/country pair' do
      City.create({:name => 'Poznan', :country => @poland})
      expect(City.new({:name => 'Poznan', :country => @poland})).to_not be_valid
    end

    it 'creates cities with same name in different countries' do
      expect {
        poznan = 'Poznan'
        City.create({:name => poznan, :country => @poland})
        City.create({:name => poznan, :country => @country_2})
        City.create({:name => poznan, :country => @country_3})
      }.to change {City.count}.by(3)
    end

  end

end

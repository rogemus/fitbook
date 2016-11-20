require 'rails_helper'

RSpec.describe Tag, type: :model do

  context 'tag names' do

    tag = Tag.create({name: 'tag'})
    tag2 = Tag.create({name: ' tag 2'})
    tag3 = Tag.create({name: '??!TaG3??'})

    it 'normalizes name' do

      expect(tag.name).to eq('tag')
      expect(tag).to be_valid

      expect(tag2.name).to eq('tag-2')
      expect(tag2).to be_valid

      expect(tag3.name).to eq('tag3')
      expect(tag3).to be_valid
    end

    it 'does not insert duplicate' do
      Tag.create({name: 'tag'})
      expect(Tag.create({name: 'tag'})).to_not be_valid
    end

  end

end

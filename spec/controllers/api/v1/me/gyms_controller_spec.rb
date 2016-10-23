require 'rails_helper'

RSpec.describe Api::V1::Me::GymsController, type: :controller do

  before(:all) do
    token = 'EAAOBiJsdf14BAICJZBiLFldAKZBRDOeZCoTVlcYsfDd7MOZB5qRRf0deGlaWx82lncFZANtBgJ6Tmo7SEQ1Nso9C6mmZCkgr8rQOSz6HXLXD8PvZCHuUgBrPTO2uqORoBCG2V0XnWKUcf4aQgpYdd6yrgSfjUfzKMx1ivXcBAH5DAZDZD'
    auth_hash = User.find_in_facebook(token)
    @jan = User.create!(
        {:name => auth_hash['name'],
         :facebook_id => auth_hash['id'],
         :email => auth_hash['email'],
         :graph_token => token})

    controller = Api::V1::Me::GymsController.new
    controller.instance_variable_set(:@current_user, @jan)
    controller.send(:koala)
    @controller = controller
  end

  context 'getting data from facebook' do

    it 'gets me/accounts and filter it' do
      expect(@controller.send(:facebook_gyms).count).to eq 2
    end

    it 'gets correct gym hash by given id' do
      id = '1117536144935437'
      # puts @controller.send(:facebook_gym, id)
    end

    it 'gets provides incorrect page id' do
      id = '205903233167688'
      # puts @controller.send(:facebook_gym, id)
    end

  end

end

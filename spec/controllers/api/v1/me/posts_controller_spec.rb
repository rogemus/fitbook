require 'rails_helper'

RSpec.describe Api::V1::Me::PostsController, type: :controller do

  subject { ActionController::Parameters.new(
      {post:
          {
              tile: 'Title',
              heading: 'Heading',
              body: 'Body',
              tags: ['dudu', 'dadda']}})}



end

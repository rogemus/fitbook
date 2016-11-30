class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :created_at, :updated_at

  belongs_to :author
  has_many :tags

  def content
    {
        title: object.title,
        heading: object.heading,
        body: object.body
    }
  end
end

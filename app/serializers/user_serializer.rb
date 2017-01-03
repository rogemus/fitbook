class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :images, :posts, :about,
             :gyms_attending, :gyms_owned,
             :is_trainer, :trained_gyms, :rating, :comments

  def images
    { :cover => object.cover, :picture => object.picture }
  end

  def gyms_owned
    if instance_options[:gyms_owned]
      Member.
          where(user: object.id).
          where(membership_level: :owner).map do |m|
        MemberSerializer.new(m)
      end
    end
  end

  def gyms_attending
    if instance_options[:gyms_attending]
      Member.
          where(user: object.id).
          where.not(membership_level: :owner).
          order(:membership_level).map do |m|
        MemberSerializer.new(m)
      end
    end
  end

  def comments
    if object.is_trainer
      object.comments = Comment.where({commentable_type: 'User', commentable_id: object.id})
    end
  end

  def trained_gyms
    if instance_options[:include_gyms] && object.is_trainer
      Member.
          where(user: object.id).
          where(membership_level: :trainer).
          order(:membership_level).map do |m|
        MemberSerializer.new(m)
      end
    end
  end

  def posts
    if object.is_trainer && instance_options[:include_posts] == true
      object.posts.map {|post| PostSerializer.new(post)}
    end
  end

  def rating
    if object.is_trainer
      {count: object.votes_count, rating: object.rating}
    end
  end

end

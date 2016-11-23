class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :images, :trained_gyms, :posts

  def images
    { :cover => object.cover, :picture => object.picture }
  end

  def trained_gyms
    if instance_options[:include_gyms] && object.is_trainer
      gyms_attending = object.members.select {|m| m.membership_level.to_sym == :trainer}
      gyms_attending.map {|member| GymSerializer.new(member.gym)}
    end
  end

  def posts
    if object.is_trainer && instance_options[:include_posts] == true
      object.posts.map {|post| PostSerializer.new(post)}
    end
  end

end

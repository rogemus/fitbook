class GymSerializer < ActiveModel::Serializer

  attributes :id, :name, :facebook_id, :rating, :about, :description, :website, :images,
             :parking, :hours, :membership

  has_one :location

  def membership
    user = instance_options[:include_user]
    {membership_level: Member.where(user: user, gym: object)&.pluck(:membership_level)&.first} if user
  end

  def parking
    merge(object.parking) if object.parking
  end

  def hours
    {hours: merge(object.hours)} if object.hours
  end

  def images
    {:cover => object.cover, :picture => object.picture}
  end

  def rating
    rat = {count: object.votes_count, rating: object.rating}
    rat[:your] = user_rating if instance_options[:include_user]
    rat
  end

  private

  def user_rating
    all_ratings_of_user.detect {|v| v.voteable_id == object.id}&.rating
  end

  def merge(flat)
    a = eval(flat)
    keys = a.values_at(* a.each_index.select(&:even?))
    values = a.values_at(* a.each_index.select(&:odd?))
    Hash[keys.zip values]
  end

  def all_ratings_of_user
    user = instance_options[:include_user]
    @ratings ||= Vote.where(user: user, voteable_type: 'Gym')
  end

end

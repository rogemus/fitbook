class MemberSerializer < ActiveModel::Serializer
  attributes :membership_level, :approved, :gym, :since

  def since
    object.created_at
  end

  def gym
    GymSerializer.new(Gym.find(object.gym.id))
  end

end

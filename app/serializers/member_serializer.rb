class MemberSerializer < ActiveModel::Serializer
  attributes :id, :membership_level, :approved, :mailing, :gym, :since

  def since
    object.created_at
  end

  def gym
    GymSerializer.new(Gym.find(object.gym.id))
  end

end

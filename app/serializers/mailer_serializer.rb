class MailerSerializer < ActiveModel::Serializer
  attributes :id, :body, :receivers, :created_at, :send_date

  def send_date
    object.send
  end

  def receivers
    if object.send
      object.users
    else
      object.receivers
    end
  end

end


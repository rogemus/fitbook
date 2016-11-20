class NotATrainerException < ::StandardError
  def initialize(message = nil)
    @message = message
    @default_message = 'User needs to be trainer'
  end

  def to_s
    @message || @default_message
  end
end
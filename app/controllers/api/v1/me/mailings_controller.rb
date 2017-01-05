module Api::V1::Me
  class MailingsController < BaseController

    include ::Api::V1::Me::MailingsDoc

    MAILING_INTERVAL = 30.days

    def index
      render json: gym.mailers
    end

    def info
      render json: {
          last_send: last_send,
          can_send: when_can_send
      }
    end

    def show
      render json: gym_mail
    end

    def receivers
      render json: gym_mail.receivers
    end

    def create
      mail = Mailer.new({gym: gym, body: params.require(:body)})

      if mail.save
        render json: mail
      else
        render json: mail.errors, status: :unprocessable_entity
      end
    end

    def commit
      #todo przetestowac
      mail_time = last_send < (Time.now - MAILING_INTERVAL)
      receivers_count = gym_mail.receivers.count

      if mail_time && receivers_count > 0
        render json: gym_mail.send_mails
      else
        errors = []
        if receivers_count == 0
          errors << 'Receivers ocunt eq 0'
        end
        if mail_time
          errors << "Can not send mail before #{last_send + MAILING_INTERVAL}"
        end
        render json: {error: errors}
      end

    end

    private

    def when_can_send
      l = last_send
      if l
        l + MAILING_INTERVAL
      else
        Time.now
      end
    end

    def last_send
      Mailer.where(gym: gym).order(send: :desc).limit(1).first&.send
    end

    def gym_mail
      gym.mailers.find(params[:mailing_id])
    end

    def gym
      @gym ||= current_user.owned_gyms.find(params[:id])
    end

  end
end

module Api::V1::Me
  class MailingsController < BaseController

    include ::Api::V1::Me::MailingsDoc

    MAILING_INTERVAL = 30.days

    def index
      render json: gym.mails
    end

    def show
      render json: gym_mail
    end

    def receivers
      render json: gym_mail.receivers
    end

    def create
      mail = Mail.new({gym: gym, body: params.require(:body), header: params.require(:header)})
      mail.recount_receivers

      if mail.save
        render json: mail
      else
        render json: mail.errors, status: :unprocessable_entity
      end
    end

    def commit

    end

    private

    def gym_mail
      gym.mails.find(params[:mailing_id])
    end

    def gym
      @gym ||= current_user.owned_gyms.find(params[:id])
    end

  end
end

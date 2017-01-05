module Api::V1::Me::MailingsDoc
  extend BaseDoc

  namespace 'api/v1/me'
  resource :mailings

  resource_description do
    short 'Current user owned gyms mailing'
  end

  doc_for :index do
    api :GET, '/v1/me/gyms/:gym_id/mailings', 'Show current gym emails'
  end

  doc_for :info do
    api :GET, '/v1/me/gyms/:gym_id/mailings/:id_mail/info', 'Get info about mailer'
  end

  doc_for :create do
    api :POST, '/v1/me/gyms/:gym_id/mailings/', 'Create mail'
    param :header, String, desc: 'Mail title, length in 1..55', required: true
    param :body, String, desc: 'Mail body, length in 1..255', required: true
  end

  doc_for :show do
    api :GET, '/v1/me/gyms/:gym_id/mailings/:id_mail/show/', 'Show mail data'
  end

  doc_for :receivers do
    api :GET, '/v1/me/gyms/:gym_id/mailings/:id_mail/receivers/', 'Mail receivers'
  end

  doc_for :commit do
    api :POST, '/v1/me/gyms/:gym_id/mailings/:id_mail/send/', 'Send mail //TODO'
  end

end
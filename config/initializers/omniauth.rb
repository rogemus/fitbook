Rails.application.config.middleware.use OmniAuth::Builder do
  silence_warnings do
    OpenSSL::SSL::VERIFY_PEER = OpenSSL::SSL::VERIFY_NONE unless Rails.env.production?
  end

  provider :facebook, '986848648068958', 'bb170e0a654a9bef5bb65e7507fd4f40',
           scope: :email, info_fields: 'id,name,email'
end
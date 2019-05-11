desc 'update gyms by facebook'
namespace :api do
  task update_gyms: :environment do
    Gym.where(owner: User.where('updated_at > ?', 1.hour.ago)).each do |g|
      g.include_facebook_data!
      g.save
    end
  end
end
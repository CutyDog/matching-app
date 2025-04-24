namespace :ridgepole do
  desc "Apply ridgepole schemafile"
  task apply: :environment do
    ridgepole('--apply') || exit(1)
    Rake::Task['db:schema:dump'].invoke if Rails.env.development?
    Rake::Task['annotate_models'].invoke if Rails.env.development?
  end

  private

  def schema_file
    Rails.root.join('db', 'schemas', 'Schemafile')
  end

  def config_file
    Rails.root.join('config', 'database.yml')
  end

  def ridgepole(*options)
    command = ['bundle exec ridgepole', "--file #{schema_file}", "-c #{config_file}", "-E #{Rails.env}"]
    system (command + options).join(' ')
  end
end
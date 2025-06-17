namespace :graphql do
  desc "Generate GraphQL object"
  task :object, [:model] => :environment do |t, args|
    model = args[:model]

    command = ['bin/rails', 'g', 'graphql:object', model].join(' ')
    system command

    move_file(model.downcase)
  end

  private

  def move_file(file_name)
    generated_file = File.join("app/graphql/types", "#{file_name}_type.rb")
    target_file = File.join("app/graphql/object_types", "#{file_name}_type.rb")

    if File.exist?(generated_file)
      FileUtils.mv(generated_file, target_file)
      puts "Moved #{generated_file} to #{target_file}"
    else
      puts "File not found: #{generated_file}"
    end
  end
end
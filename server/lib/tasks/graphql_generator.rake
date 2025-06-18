class GraphqlObjectGenerator
  class << self
    def execute(model)
      command = ['bin/rails', 'g', 'graphql:object', model].join(' ')
      system command
      move_file(model.downcase)
      overwrite_file(model.downcase)
    end

    private

    def move_file(file_name)
      generated_file = File.join("app/graphql/types", "#{file_name}_type.rb")
      target_file = File.join("app/graphql/object_types", "#{file_name}_type.rb")
      FileUtils.mv(generated_file, target_file) if File.exist?(generated_file)
    end

    def overwrite_file(file_name)
      file_path = File.join("app/graphql/object_types", "#{file_name}_type.rb")

      if File.exist?(file_path)
        content = File.read(file_path)
        content.gsub!('module Types', 'module ObjectTypes')
        content.gsub!('< Types::BaseObject', '< ::Types::BaseObject')
        File.write(file_path, content)
      end
    end
  end
end

class GraphqlInputGenerator
  class << self
    def execute(model)
      command = ['bin/rails', 'g', 'graphql:input', model].join(' ')
      system command
      move_file(model.downcase)
      overwrite_file(model.downcase)
    end

    private

    def move_file(file_name)
      generated_file = File.join("app/graphql/types", "#{file_name}_input_type.rb")
      target_file = File.join("app/graphql/input_types", "#{file_name}_input_type.rb")
      FileUtils.mv(generated_file, target_file) if File.exist?(generated_file)
    end

    def overwrite_file(file_name)
      file_path = File.join("app/graphql/input_types", "#{file_name}_input_type.rb")

      if File.exist?(file_path)
        content = File.read(file_path)
        content.gsub!('module Types', 'module InputTypes')
        content.gsub!('< Types::BaseInputObject', '< ::Types::BaseInputObject') 
        File.write(file_path, content)
      end
    end
  end
end

namespace :graphql do
  desc "Generate GraphQL object"
  task :object, [:model] => :environment do |t, args|
    GraphqlObjectGenerator.execute(args[:model])
  end

  desc "Generate GraphQL input"
  task :input, [:model] => :environment do |t, args|
    GraphqlInputGenerator.execute(args[:model])
  end
end
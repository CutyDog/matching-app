require 'graphql/rake_task'

GraphQL::RakeTask.new(
  schema_name: 'ServerSchema',
  directory: 'app/graphql',
  idl_outfile: 'server_schema.graphql'
)
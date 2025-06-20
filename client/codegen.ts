
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../server/app/graphql/server_schema.graphql",
  documents: "./app/**/*.{ts,tsx}",
  generates: {
    "graphql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
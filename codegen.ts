import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["http://localhost:8080/graphql"],
  documents: ["src/**/*.tsx", "src/**/*.ts"],
  emitLegacyCommonJSImports: false,
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
      config: {
        documentMode: "documentNode"
      },
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;

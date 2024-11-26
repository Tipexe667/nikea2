import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string(),
  GOOGLE_CLIENT_ID: zod.string(),
  GOOGLE_CLIENT_SECRET: zod.string(),
});

const env = envSchema.parse({
  DATABASE_URL: "mongodb+srv://hubaulouen:abT6TlQAItntJS5u@cluster0.md8ve.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
  GOOGLE_CLIENT_ID: "630039385758-uhb7jup2uvisem0v0uu3a903jgun36bn.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: "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",
});

export default env;

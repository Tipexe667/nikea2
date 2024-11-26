import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string(),
  GOOGLE_CLIENT_ID: zod.string(),
  GOOGLE_CLIENT_SECRET: zod.string(),
  NEXTAUTH_SECRET: zod.string(),
  NEXTAUTH_URL: zod.string(),
  SECRET: zod.string(),
});

const env = envSchema.parse({
  DATABASE_URL: "mongodb+srv://hubaulouen:abT6TlQAItntJS5u@cluster0.md8ve.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
  GOOGLE_CLIENT_ID: "630039385758-uhb7jup2uvisem0v0uu3a903jgun36bn.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: "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",
  NEXTAUTH_SECRET: "fU2/V+vI4x2x26nZPgoShxvurIpN7PMFo3hNZkkdHCmBB3OckMs33AwoNX4=",
  NEXTAUTH_URL: "http://localhost:3000",
  SECRET: "f96fb07bc66341ade0f6ff437b14163f",
});

export default env;

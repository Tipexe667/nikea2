import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().nonempty(),
  GOOGLE_CLIENT_ID = "630039385758-uhb7jup2uvisem0v0uu3a903jgun36bn.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET = "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",
  NEXTAUTH_URL="http://localhost:3000",
  NEXTAUTH_SECRET="kK1HZx+oN9w8b1iM3V5Afn9QK8Y2MlOQ4+AQWgLpGso=",
});

export const env = envSchema.parse(process.env);

import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(`${process.env.NEXT_PUBLIC_MONGODB_URI}`);
const db = client.db("Assainment-11");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                required: false
            }
        }
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 60 * 24,
        }
    },
    plugins: [jwt()],
});

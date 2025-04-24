import dontenv from "dotenv";

dontenv.config({ path: ".env" });

export const PORT = process.env.PORT;

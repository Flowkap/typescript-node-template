
import { fastify, FastifyInstance } from "fastify";
import { register } from "./routes";

let app: FastifyInstance;
export async function start(): Promise<void> {
    try {
        app = fastify({ logger: true });
        register(app);
        await app.listen(3000, "0.0.0.0");
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

export async function stop(): Promise<void> {
    await app.server.close();
}

// start();

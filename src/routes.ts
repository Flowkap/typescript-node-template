import { FastifyInstance } from "fastify";
import { getAll }  from "./handler/persons";
import { hello } from "./handler/hello";

export function register(app: FastifyInstance): void {
    app.get("/", hello);
    app.get("/persons", getAll);
}

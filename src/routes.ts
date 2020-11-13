import { FastifyInstance } from "fastify";
import * as persons from "./handler/persons";

export function register(app: FastifyInstance): void {
    app.get("/persons", persons.getAll);
}

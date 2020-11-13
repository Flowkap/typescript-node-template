import { FastifyRequest, FastifyReply } from "fastify";
import { Person } from "../types/Person";

export async function getAll(req: FastifyRequest, reply: FastifyReply): Promise<Person[]> {
    reply.type("application/json; charset=utf-8").code(200);
    return [new Person({
        firstName: "Rick",
        lastName: "Sanchez",
    })];
}

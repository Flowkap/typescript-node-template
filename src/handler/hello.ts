import { FastifyRequest, FastifyReply } from "fastify";

export async function hello(req: FastifyRequest, reply: FastifyReply): Promise<string> {
    reply.type("text/html; charset=utf-8").code(200);
    return "<h1>Hallo!</h1><a href='/persons'>Fetch persons here</a>";
}

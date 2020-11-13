/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
import * as routes from "../src/routes";
import * as fastify from "fastify";

use(chaiAsPromised);
describe("Integration", () => {

    let sandbox: sinon.SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    const fakeFastify: any = {
        listen: sinon.spy(),
        get: sinon.spy(),
        log: {
            error: sinon.spy(),
        },
        server: {
            close: sinon.spy(),
        },
    };

    before(() => {
        const fastifyStub = sinon.stub(fastify, "fastify");
        fastifyStub.returns(fakeFastify);
    });

    let app: any;
    it("Successful app startup", async () => {
        const mock = sandbox.mock(routes);

        // conditional loading as we can only test this when module loads FIRST time as its auto executing!
        // This is just as app auto executes itself on start
        app = await import("../src/app");

        mock.expects("register").calledOnce;
        expect(fakeFastify.listen.calledOnce, "listen called once").to.be.true;
        expect(fakeFastify.get.calledTwice, "get called twice").to.be.true;
    });

    it("Failed app startup", async () => {
        const exitStub = sandbox.stub(process, "exit");
        fakeFastify.listen = () => { throw new Error(); };
        await app.start();
        expect(fakeFastify.log.error.calledOnce, "log.error called once").to.be.true;
        expect(exitStub.calledOnce, "process.exit called once").to.be.true;
    });

    it("Close the server", async () => {
        await app.stop();
        expect(fakeFastify.server.close.calledOnce, "server close called once").to.be.true;
    });
});

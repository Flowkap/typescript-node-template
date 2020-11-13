/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect, use } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import * as sinon from "sinon";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const server = require("fastify/lib/server");

use(chaiAsPromised);
describe("Integration", () => {

    let sandbox: sinon.SinonSandbox;
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    let createServerStub: any;
    const mockServer: any = {
        server: {
            on: () => { /*nothing*/ },
            close: () => { /*nothing*/ },
        },
        listen: () => { /*nothing*/ },
    };

    before(() => {
        createServerStub = sinon.stub(server, "createServer");
        createServerStub.returns(mockServer);
    });

    let app: any;
    it("Successful app startup", async () => {
        // conditional loading as we can only test this when module loads FIRST time as its auto executing!
        app = await import("../src/app");
        await app.start();
        await expect(createServerStub.calledOnce).to.be.true;
    });

    it("Failed app startup", async () => {
        const exitStub = sandbox.stub(process, "exit");
        mockServer.listen = () => { throw new Error(); };
        await app.start();
        await expect(createServerStub.calledTwice).to.be.true;
        await expect(exitStub.calledOnce).to.be.true;
    });

    it("Close the server", async () => {
        await app.stop();
    });
});


import { expect, use } from "chai";
import { run } from "../src/app";
import * as chaiAsPromised from "chai-as-promised";

use(chaiAsPromised);
describe("Integration", () => {
    it("run app.ts", async () => {
        await expect(run()).to.be.fulfilled;
    });
});

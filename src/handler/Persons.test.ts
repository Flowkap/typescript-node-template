
import { expect } from "chai";
import { getAll } from "./persons";

describe("Persons", () => {
    it("handler", async () => {
        const persons = await getAll();
        expect(persons[0].firstName).to.equal("Rick");
        expect(persons[0].lastName).to.equal("Sanchez");
    });
});

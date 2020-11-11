
import { expect } from "chai";
import { Person } from "./Person";

describe("Person", () => {
    it("Constructor", async () => {
        const person = new Person({
            firstName: "Awesome",
            lastName: "Guy",
        });
        expect(person.firstName).to.equal("Awesome");
        expect(person.lastName).to.equal("Guy");
    });
});

import { Person } from "./types/Person";

const { lastName, firstName } = new Person({
    firstName: "Rick",
    lastName: "Sanchez",
});

console.log(`Hello ${firstName} ${lastName}!`);

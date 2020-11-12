import { Person } from "./types/Person";

export async function run(): Promise<void> {
    const { lastName, firstName } = new Person({
        firstName: "Rick",
        lastName: "Sanchez",
    });

    console.log(`Hello ${firstName} ${lastName}!`);
}

run();

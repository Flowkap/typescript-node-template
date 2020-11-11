export interface IPerson {
    lastName: string;
    firstName: string;
}

export class Person implements IPerson {
    lastName: string;
    firstName: string;

    constructor(data: IPerson) {
        this.lastName = data.lastName;
        this.firstName = data.firstName;
    }
}

export function nothing(): void {
    console.log("uncovered");
}

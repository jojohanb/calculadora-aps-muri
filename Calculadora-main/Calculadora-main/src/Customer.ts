//Customer.ts
export default class Customer { 
    name: string = "";
    age: number = 0;
    email: string = "";
    birthDate: Date = new Date();

    constructor(name: string, email: string, birthDate: Date) {
        this.name = name;
        this.email = email;
        this.birthDate = birthDate;
        this.age = new Date().getFullYear() - birthDate.getFullYear();
    }   
}
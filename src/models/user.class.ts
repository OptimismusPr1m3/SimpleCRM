export class User {
    firstName: string | undefined;
    lastName: string | undefined;
    birthDate: number | undefined;
    street: string | undefined;
    zipCode: number | undefined;
    city: string | undefined;
    email: string | undefined;

    constructor(obj?: any) { // mit dem ? kann man sagen , dass da nicht unbedingt was reingegeben werden muss
        this.firstName = obj ? obj.firstName : ''; // auch if else abfrage !
        this.lastName = obj ? obj.lastName : ''; 
        this.birthDate = obj ? obj.birthDate : ''; 
        this.street = obj ? obj.street : ''; 
        this.zipCode = obj ? obj.zipCode : ''; 
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            email: this.email
        }
    }

    
}
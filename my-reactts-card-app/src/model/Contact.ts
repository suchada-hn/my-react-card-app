// class Contact {
//   id: string;
//   name: string;
//   email: string;
//   telephone: string;
//   constructor(name: string, email: string, telephone: string, id: string) {
//     this.name = name;
//     this.email = email;
//     this.telephone = telephone;
//     this.id = id;
//   }
// }

class Company {
  name: string;
  catchPhrase?: string;
  bs?: string;
  constructor(name: string) {
    this.name = name;
    
  }
}

class Contact {
  id: any;
  name: string;
  username?: string;
  email: string;
  address?: any;
  phone: string;
  website?: string;
  company?: Company;
  isDisabled? : boolean;
  constructor(name: string, email: string, phone: string, id: string, company: Company, isDisabled: boolean) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.id = id;
    this.company = company;
    this.isDisabled = isDisabled;
  }
}

export default Contact;

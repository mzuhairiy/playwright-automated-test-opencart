import { faker } from '@faker-js/faker';

export function generateUserCheckoutData() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    company: faker.company.name(),
    address1: faker.location.streetAddress(),
    address2: faker.location.streetAddress(),
    city: faker.location.city(),
    postcode: faker.finance.routingNumber()
  };
}

export function generateUserCreds(){
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: "admin1234"
  }
}
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  address: string;
}

export interface UserWithoutPassword {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
  address: string;
}

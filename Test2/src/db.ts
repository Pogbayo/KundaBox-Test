type User = {
  user_name: any;
  dob: Date;
  email: string;
  password: any;
};

export const mockDB: User[] = [];

export function findUserByUsername(user_name: string) {
  return mockDB.find((u) => u.user_name === user_name);
}

export function findUserByEmail(email: string) {
  return mockDB.find((u) => u.email === email);
}

export function addUser(user: User) {
  mockDB.push(user);
}

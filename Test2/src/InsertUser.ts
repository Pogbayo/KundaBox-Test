import {  findUserByUsername, findUserByEmail, addUser } from "./db";

type InsertResult = {
  result: boolean;
  code?: "USER_ALREADY_REGISTERED" | "INVALID_NAME" | "INVALID_DOB" | "INVALID_EMAIL" | "INVALID_PASSWORD";
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string) {
  const hasTwoNumbers = (password.match(/\d/g) || []).length >= 2;
  const hasUpperCase = /[A-Z]/.test(password);
  return password.length >= 5 && password.length <= 16 && hasTwoNumbers && hasUpperCase;
}

export function insert_user(user_name: any, dob: Date, email: string, password: any): InsertResult {
    
  const age = new Date().getFullYear() - dob.getFullYear();
  
  if (user_name.length < 5 || user_name.length > 16) {
    return { result: false, code: "INVALID_NAME" };
  }

  if (age < 18) {
    return { result: false, code: "INVALID_DOB" };
  }

  if (!isValidEmail(email)) {
    return { result: false, code: "INVALID_EMAIL" };
  }

  if (!isValidPassword(password)) {
    return { result: false, code: "INVALID_PASSWORD" };
  }

  if (findUserByUsername(user_name) || findUserByEmail(email)) {
    return { result: false, code: "USER_ALREADY_REGISTERED" };
  }

  addUser({ user_name, dob, email, password });
  return { result: true };
}

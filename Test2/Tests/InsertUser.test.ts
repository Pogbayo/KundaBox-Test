import { insert_user } from "../src/InsertUser";
import { mockDB } from "../src/db";

beforeEach(() => {
  mockDB.length = 0;
  mockDB.push({
    user_name: "joeboy",
    dob: new Date("2000-01-01"),
    email: "joe@kundabox.com",
    password: "12ABCabc"
  });
});

//adding a user with proper values
test("Valid user should be inserted", () => {
  const result = insert_user("david123", new Date("1990-06-01"), "david@example.com", "Abc12345");
  expect(result.result).toBe(true);
});

//adding an already existing user 
test("User already exists", () => {
  const result = insert_user("joeboy", new Date("2000-01-01"), "joe@kundabox.com", "12ABCabc");
  expect(result.result).toBe(false);
  expect(result.code).toBe("USER_ALREADY_REGISTERED");
  // fails because a user with the exact details already exists in the DB as shown in the beforeEach function above
});

//Checking for invalid usernames
test("Invalid usernames", () => {
 const result1 = insert_user( 21 , new Date("1990-01-01"), "joe1@x.com", "Abc12345");
  expect(result1.code).toBe("INVALID_NAME");
  //fails becasue user_name is not a string 

  const result2 = insert_user("j", new Date("1990-01-01"), "joe2@x.com", "Abc12345");
  expect(result2.code).toBe("INVALID_NAME");
  // fails because user_name.lenght must not be below 5 characters in lenght

  const result3 = insert_user("Harry_JoshMaguire", new Date("1990-01-01"), "joe2@x.com", "Abc12345");
  expect(result3.code).toBe("INVALID_NAME");
  //fails becasue user_name.lenght must not be more than 16 characters in lenght

 const result4 = insert_user("joeboy", new Date("1990-01-01"), "joe1@x.com", "Abc12345");
  expect(result4.code).toBe("INVALID_NAME");
  //lenght is okay but name is not unique
  
});

//checkng for invalid DOB
test("Invalid DOBs", () => {
  const recentDob = new Date();
  recentDob.setFullYear(recentDob.getFullYear() - 17);

  const result = insert_user("uniqueuser", recentDob, "young@x.com", "Abc12345");
  expect(result.code).toBe("INVALID_DOB");
  // fails because user is below the age of 18
});

//checking for non-valid email
test("Invalid emails", () => {
  const result1 = insert_user("newuser1", new Date("1990-01-01"), "noatsign.com", "Abc12345");
  expect(result1.code).toBe("INVALID_EMAIL");
  // fails because it does not follow the xxx@yyy.com pattern

  const result2 = insert_user("newuser2", new Date("1990-01-01"), "joe@kundabox.com", "Abc12345");
  expect(result2.code).toBe("INVALID_EMAIL");
  // fails because a user with the email already exists in the DB
});

//checking for invalid passwords
test("Invalid passwords", () => {
  const result1 = insert_user("user1", new Date("1990-01-01"), "test1@x.com", 234);
  expect(result1.code).toBe("INVALID_PASSWORD");
  // fails because password is not a string

  const result2 = insert_user("user2", new Date("1990-01-01"), "test2@x.com", "ABCd");
  expect(result2.code).toBe("INVALID_PASSWORD");
  // fails because password is less than 5 characters in length

  const result3 = insert_user("user3", new Date("1990-01-01"), "test3@x.com", "A1b");
  expect(result3.code).toBe("INVALID_PASSWORD");
  // fails because password is more than 16 characters in lenght

  const result4 = insert_user("user3", new Date("1990-01-01"), "test3@x.com", "As2bssSb");
  expect(result4.code).toBe("INVALID_PASSWORD");
  // fails because password does not contain at least two numbers

  const result5 = insert_user("user3", new Date("1990-01-01"), "test3@x.com", "aabbcc23");
  expect(result5.code).toBe("INVALID_PASSWORD");
  // fails because password is does not contain an upper case character
});

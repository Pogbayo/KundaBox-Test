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

test("Valid user should be inserted", () => {
  const result = insert_user("david123", new Date("1990-06-01"), "david@example.com", "Abc12345");
  expect(result.result).toBe(true);
});

test("User already exists", () => {
  const result = insert_user("joeboy", new Date("2000-01-01"), "joe@kundabox.com", "12ABCabc");
  expect(result.result).toBe(false);
  expect(result.code).toBe("USER_ALREADY_REGISTERED");
});

test("Invalid usernames", () => {
  expect(insert_user("joe", new Date("1990-01-01"), "joe1@x.com", "Abc12345").code).toBe("INVALID_NAME");
  expect(insert_user("j", new Date("1990-01-01"), "joe2@x.com", "Abc12345").code).toBe("INVALID_NAME");
});

test("Invalid DOBs", () => {
  const recentDob = new Date();
  recentDob.setFullYear(recentDob.getFullYear() - 17);
  expect(insert_user("uniqueuser", recentDob, "young@x.com", "Abc12345").code).toBe("INVALID_DOB");
});

test("Invalid emails", () => {
  expect(insert_user("newuser1", new Date("1990-01-01"), "invalidemail", "Abc12345").code).toBe("INVALID_EMAIL");
  expect(insert_user("newuser2", new Date("1990-01-01"), "noatsign.com", "Abc12345").code).toBe("INVALID_EMAIL");
});

test("Invalid passwords", () => {
  expect(insert_user("user1", new Date("1990-01-01"), "test1@x.com", "abcde").code).toBe("INVALID_PASSWORD"); 
  expect(insert_user("user2", new Date("1990-01-01"), "test2@x.com", "ABCdef").code).toBe("INVALID_PASSWORD"); 
  expect(insert_user("user3", new Date("1990-01-01"), "test3@x.com", "A1b").code).toBe("INVALID_PASSWORD"); 
});

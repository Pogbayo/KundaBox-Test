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
  const result1 = insert_user("joe", new Date("1990-01-01"), "joe1@x.com", "Abc12345");
  expect(result1.code).toBe("INVALID_NAME");

  const result2 = insert_user("j", new Date("1990-01-01"), "joe2@x.com", "Abc12345");
  expect(result2.code).toBe("INVALID_NAME");
});

test("Invalid DOBs", () => {
  const recentDob = new Date();
  recentDob.setFullYear(recentDob.getFullYear() - 17);

  const result = insert_user("uniqueuser", recentDob, "young@x.com", "Abc12345");
  expect(result.code).toBe("INVALID_DOB");
});

test("Invalid emails", () => {
  const result1 = insert_user("newuser1", new Date("1990-01-01"), "invalidemail", "Abc12345");
  expect(result1.code).toBe("INVALID_EMAIL");

  const result2 = insert_user("newuser2", new Date("1990-01-01"), "noatsign.com", "Abc12345");
  expect(result2.code).toBe("INVALID_EMAIL");
});

test("Invalid passwords", () => {
  const result1 = insert_user("user1", new Date("1990-01-01"), "test1@x.com", "abcde");
  expect(result1.code).toBe("INVALID_PASSWORD");

  const result2 = insert_user("user2", new Date("1990-01-01"), "test2@x.com", "ABCdef");
  expect(result2.code).toBe("INVALID_PASSWORD");

  const result3 = insert_user("user3", new Date("1990-01-01"), "test3@x.com", "A1b");
  expect(result3.code).toBe("INVALID_PASSWORD");
});

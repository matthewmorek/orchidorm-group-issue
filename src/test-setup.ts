import { afterAll, afterEach, beforeAll, beforeEach } from "bun:test";
import { testTransaction } from "orchid-orm";
import { db } from "./index";

beforeAll(async () => {
  await testTransaction.start(db);
});

beforeEach(async () => {
  await testTransaction.start(db);
});

afterEach(async () => {
  await testTransaction.rollback(db);
});

afterAll(async () => {
  await testTransaction.close(db);
});

import { change } from "../script";

change(async (db) => {
  await db.createTable("user", (t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar(),
  }));

  await db.createTable("region", (t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar(),
  }));

  await db.createTable("location", (t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar(),
    regionId: t.uuid(),
  }));

  await db.createTable("user_check_in", (t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid(),
    locationId: t.uuid(),
  }));
});

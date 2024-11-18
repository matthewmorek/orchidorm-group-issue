import { test, expect } from "bun:test";
import { db } from ".";

test("issue", async () => {
  const userId = await db.user.insert({ name: "John" }).get("id");
  await db.region.create({
    name: "north-west",
  });

  await db.location.createFrom(
    db.region.findBy({ name: "north-west" }).select({ regionId: "id" }),
    {
      name: "Manchester",
    },
  );

  await db.userCheckIn.create({
    locationId: db.location.get("id"),
    userId: db.user.get("id"),
  });

  const result = await db.userCheckIn
    .select("locationId", {
      locationRegion: (q) => q.location.chain("region"),
      checkInCount: (q) => q.count(),
    })
    .group("locationId", "locationRegion.r")
    .where({ userId });

  expect(result).toBeObject();
});

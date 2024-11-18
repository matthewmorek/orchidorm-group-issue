import { createBaseTable, orchidORM } from "orchid-orm";
import { config } from "./config";

const BaseTable = createBaseTable({ snakeCase: true });

class LocationTable extends BaseTable {
  readonly table = "location";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar().unique(),
    regionId: t.uuid().foreignKey(() => RegionTable, "id"),
  }));

  relations = {
    region: this.belongsTo(() => RegionTable, {
      required: true,
      references: ["id"],
      columns: ["regionId"],
    }),
  };
}

class RegionTable extends BaseTable {
  readonly table = "region";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar().unique(),
  }));
}

class UserTable extends BaseTable {
  readonly table = "user";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar(),
  }));
}

class UserCheckInTable extends BaseTable {
  readonly table = "user_check_in";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid().foreignKey(() => UserTable, "id", { onDelete: "CASCADE" }),
    locationId: t.uuid().foreignKey(() => LocationTable, "id"),
  }));

  relations = {
    location: this.hasOne(() => LocationTable, {
      required: true,
      references: ["id"],
      columns: ["locationId"],
    }),
  };
}

export const db = orchidORM(config.database, {
  location: LocationTable,
  region: RegionTable,
  user: UserTable,
  userCheckIn: UserCheckInTable,
});

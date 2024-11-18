import { Selectable } from "orchid-orm";

import { BaseTable } from "./BaseTable";
import { LocationTable } from "./Location";
import { UserTable } from "./User";

export class UserCheckInTable extends BaseTable {
  readonly table = "user_check_in";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    userId: t.uuid().foreignKey(() => UserTable, "id", { onDelete: "CASCADE" }),
    locationId: t.uuid().foreignKey(() => LocationTable, "id"),
    ...t.timestamps(),
  }));

  relations = {
    location: this.hasOne(() => LocationTable, {
      required: true,
      references: ["id"],
      columns: ["locationId"],
    }),
    user: this.belongsTo(() => UserTable, {
      required: true,
      references: ["id"],
      columns: ["userId"],
    }),
  };
}

export type UserCheckIn = Selectable<UserCheckInTable>;

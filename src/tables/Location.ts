import { Selectable } from "orchid-orm";

import { BaseTable } from "./BaseTable";
import { Region, RegionTable } from "./Region";

export type Location = Selectable<LocationTable>;
export class LocationTable extends BaseTable {
  readonly table = "location";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar().unique(),
    ...t.timestamps(),

    // foreign keys
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

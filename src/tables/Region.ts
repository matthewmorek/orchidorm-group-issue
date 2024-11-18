import { Selectable } from "orchid-orm";

import { BaseTable } from "./BaseTable";
import { LocationTable } from "./Location";

export type Region = Selectable<RegionTable>;

export class RegionTable extends BaseTable {
  readonly table = "region";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    name: t.varchar().unique(),
    title: t.varchar(),
    description: t.varchar().nullable(),
    ...t.timestamps(),
  }));

  // relations = {
  //   locations: this.hasMany(() => LocationTable, {
  //     required: false,
  //     columns: ["id"],
  //     references: ["regionId"],
  //   }),
  // };
}

import { Selectable } from "orchid-orm";

import { BaseTable } from "./BaseTable";

export type User = Selectable<UserTable>;
export class UserTable extends BaseTable {
  readonly table = "user";
  columns = this.setColumns((t) => ({
    id: t.uuid().primaryKey(),
    ...t.timestamps(),
  }));
}

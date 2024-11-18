import { rakeDb } from "orchid-orm/migrations";

import { config } from "./config";
import { BaseTable } from "./tables/BaseTable";

export const change = rakeDb(config.database, {
  snakeCase: true,
  baseTable: BaseTable,
  migrationsPath: "./migrations",
  import: (path) => import(path),
});

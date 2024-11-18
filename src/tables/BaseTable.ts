import { createBaseTable } from "orchid-orm";

export const BaseTable = createBaseTable({
  snakeCase: true,
  columnTypes: (t) => ({
    id: () =>
      t
        .uuid()
        .primaryKey()
        .default(t.sql`gen_random_uuid()`),
    ...t,
  }),
  exportAs: "BaseTable",
});

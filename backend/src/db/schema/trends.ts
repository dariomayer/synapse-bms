// backend/src/db/schema/trends.ts
import { pgTable, serial, uuid, timestamp, numeric, text, index } from 'drizzle-orm/pg-core';
import { points } from './points';

export const trends = pgTable(
  'trends',
  {
    id: serial('id').primaryKey(),
    pointId: uuid('point_id').notNull().references(() => points.id, { onDelete: 'cascade' }),
    ts: timestamp('ts', { withTimezone: true }).notNull().defaultNow(),
    valueNum: numeric('value_num'),
    valueStr: text('value_str'),
  },
  (t) => ({
    trendsPointTsIdx: index('idx_trends_point_ts').on(t.pointId, t.ts),
  })
);

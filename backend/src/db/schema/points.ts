// backend/src/db/schema/points.ts
import { pgTable, uuid, varchar, numeric, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { devices } from './devices';

export const points = pgTable(
  'points',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    deviceId: uuid('device_id').notNull().references(() => devices.id, { onDelete: 'cascade' }),
    key: varchar('key', { length: 120 }).notNull(),
    type: varchar('type', { length: 32 }).notNull(), // analog | binary | string
    unit: varchar('unit', { length: 32 }),
    rw: varchar('rw', { length: 8 }).notNull().default('r'), // r | rw
    scale: numeric('scale'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    pointsDeviceIdx: index('idx_points_device_id').on(t.deviceId),
    pointsDeviceKeyUq: uniqueIndex('uq_points_device_key').on(t.deviceId, t.key),
  })
);

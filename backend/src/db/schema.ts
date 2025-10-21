// backend/src/db/schema.ts
import { pgTable, serial, text, timestamp, uuid, varchar, boolean, numeric, index, uniqueIndex } from 'drizzle-orm/pg-core';

export const devices = pgTable('devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  protocol: varchar('protocol', { length: 32 }).notNull(), // bacnet | modbus | knx | mqtt
  address: text('address').notNull(),
  enabled: boolean('enabled').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

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

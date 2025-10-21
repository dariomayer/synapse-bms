// backend/src/db/schema/devices.ts
import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';

export const devices = pgTable('devices', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 120 }).notNull(),
  protocol: varchar('protocol', { length: 32 }).notNull(), // bacnet | modbus | knx | mqtt
  address: text('address').notNull(),
  enabled: boolean('enabled').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

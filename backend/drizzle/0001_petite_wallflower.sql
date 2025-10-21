CREATE INDEX IF NOT EXISTS "idx_points_device_id" ON "points" USING btree ("device_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uq_points_device_key" ON "points" USING btree ("device_id","key");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_trends_point_ts" ON "trends" USING btree ("point_id","ts");
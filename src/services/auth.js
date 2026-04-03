import { adminApi } from "@/services/api";

export function checkUserAuthApi() {
  return adminApi.post("/api/user/check");
}

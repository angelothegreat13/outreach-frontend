import { User, UsersResponse } from "@/types/user";

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${process.env.API_BASE_URL}/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status}`);
  }

  const json: UsersResponse = await res.json();
  return json.data;
}

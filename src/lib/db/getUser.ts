"use server";

import { appConfig } from "../config";
import { UserData } from "../types";

interface GetUserOptions {
  userId: string;
}

export async function getUser({ userId }: GetUserOptions) {
  const uri =
    appConfig.servicesEndpoint +
    "/users/getUser?userId=" +
    encodeURIComponent(userId);

  const response = await fetch(uri, {
    method: "GET",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.user as UserData;
}

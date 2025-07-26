"use server";

import { auth0 } from "@/lib/auth0";
import { appConfig } from "@/lib/config";
import { redirect } from "next/navigation";

export async function updateUserName(formData: FormData) {
  const session = await auth0.getSession();

  if (!session?.user) {
    throw new Error("Not authenticated");
  }

  const name = formData.get("name") as string;

  if (!name || name.trim().length === 0) {
    throw new Error("Name is required");
  }

  const userData = {
    id: session.user.sub,
    name: name,
    picture: session.user.picture,
  };

  try {
    const response = await fetch(
      `${appConfig.servicesEndpoint}/users/saveUser`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData }),
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update user name");
    }

    const result = await response.json();

    if (!result.ok) {
      throw new Error("Failed to update user name");
    }

    redirect(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/roadmaps`);
  } catch (error) {
    console.error("Error updating user name:", error);
    throw error;
  }
}

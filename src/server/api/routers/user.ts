import { clerkClient } from "@clerk/nextjs/server";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    if (!userId) {
      return null;
    }

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      username: user.username,
      profilePicture: user.profileImageUrl,
    };
  }),
});

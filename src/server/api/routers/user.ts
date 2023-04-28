import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getByUsername: publicProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const { username } = input;

      const [user] = await clerkClient.users.getUserList({
        username: [username],
      });

      if (!user) {
        throw new TRPCError({ code: "NOT_FOUND", message: "User not found." });
      }

      return {
        id: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        username: user.username,
        profilePicture: user.profileImageUrl,
      };
    }),
});

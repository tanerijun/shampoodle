import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
      })
    ).map((user) => ({
      id: user.id,
      name:
        user.firstName + (user.lastName ? " " + user.lastName : "") ||
        user.username ||
        "A kind stranger",
      profilePicture: user.profileImageUrl,
    }));

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
    }));
  }),
});

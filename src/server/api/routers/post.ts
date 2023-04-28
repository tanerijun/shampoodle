import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
      orderBy: { createdAt: "desc" },
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
      })
    ).map((user) => {
      const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

      return {
        id: user.id,
        name,
        username: user.username,
        profilePicture: user.profileImageUrl,
      };
    });

    return posts.map((post) => ({
      post,
      author: users.find((user) => user.id === post.authorId),
    }));
  }),

  getAllByUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const posts = await ctx.prisma.post.findMany({
        where: { authorId: userId },
        take: 100,
        orderBy: { createdAt: "desc" },
      });

      return posts;
    }),

  create: protectedProcedure
    .input(
      z.object({
        post: z
          .string()
          .trim()
          .min(20, { message: "A good shower thought should be longer." })
          .max(200, { message: "A good shower thought should be shorter." }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx;

      // Prevent users from spamming the API
      const { success } = await ctx.ratelimit.limit(userId);

      if (!success) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "You are posting too much. Please try again later.",
        });
      }

      const { post } = input;
      const cleanedPost = cleanPost(post);

      const newPost = await ctx.prisma.post.create({
        data: {
          authorId: userId,
          content: cleanedPost,
        },
      });

      return newPost;
    }),
});

function cleanPost(post: string) {
  // Trim whitespaces
  let res = post.trim();

  // Post must start with a capital letter
  if (res.charAt(0) !== res.charAt(0).toUpperCase()) {
    res = res.charAt(0).toUpperCase() + res.slice(1);
  }

  // Post must end with a punctuation mark (!, ?, .)
  if (!["!", "?", "."].includes(res.charAt(res.length - 1))) {
    res += ".";
  }

  return res;
}

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import crypto from "crypto";

export const shortenedUrlRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let slug = crypto.randomBytes(2).toString("hex");

      let slugExists = await ctx.prisma.shortenedUrl.findUnique({
        where: {
          slug: slug,
        },
      });

      while (slugExists) {
        slug = crypto.randomBytes(2).toString("hex");
        slugExists = await ctx.prisma.shortenedUrl.findUnique({
          where: {
            slug: slug,
          },
        });
      }

      const newUrl = await ctx.prisma.shortenedUrl.create({
        data: {
          slug: slug,
          original: input.url,
        },
      });
      return newUrl;
    }),

  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.shortenedUrl.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import crypto from "crypto";

export const shortenedUrlRouter = createTRPCRouter({
  getOriginalUrl: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const url = await ctx.prisma.shortenedUrl.findUnique({
        where: {
          slug: input.slug,
        },
      });
      if (url) {
        await ctx.prisma.shortenedUrl.update({
          where: {
            slug: input.slug,
          },
          data: {
            clicks: url.clicks + 1,
          },
        });
        return url.original;
      }
      return null;
    }),

  getShortenedUrls: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        cursor: z.object({ id: z.string() }).optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { limit = 10, cursor } = input;
      const userId = ctx.session.user.id;
      const urls = await ctx.prisma.shortenedUrl.findMany({
        where: {
          userId,
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor.id } : undefined,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          slug: true,
          original: true,
          createdAt: true,
          clicks: true,
          userId: true,
        },
      });


      let nextCursor: typeof cursor | undefined;
      if (urls.length > limit) {
        const nextItem = urls.pop();
        nextCursor = nextItem ? { id: nextItem.id } : undefined;
      }

      return {
        urls,
        nextCursor,
      };
    }),

  create: protectedProcedure
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input, ctx }) => {
      let slug = crypto.randomBytes(3).toString("hex");

      let slugExists = await ctx.prisma.shortenedUrl.findUnique({
        where: {
          slug: slug,
        },
      });

      while (slugExists) {
        slug = crypto.randomBytes(3).toString("hex");
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
          userId: ctx.session.user.id,
        },
      });
      return newUrl;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.shortenedUrl.findMany();
  }),
});

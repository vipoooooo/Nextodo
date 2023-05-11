import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input, ctx }) => {
      const res = ctx.prisma.todo.create({
        data: { todo: input.text, isCompleted: false },
      });
      return res;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input, ctx }) => {
      const res = ctx.prisma.todo.delete({
        where: { id: input.id },
      });
      return res;
    }),
  update: publicProcedure
    .input(z.object({ id: z.string(), text: z.string() }))
    .mutation(({ input, ctx }) => {
      const res = ctx.prisma.todo.update({
        where: { id: input.id },
        data: { todo: input.text },
      });
      return res;
    }),
  toggleComplete: publicProcedure
    .input(z.object({ id: z.string(), isComplete: z.boolean() }))
    .mutation(({ input, ctx }) => {
      const res = ctx.prisma.todo.update({
        where: { id: input.id },
        data: { isCompleted: input.isComplete },
      });
      return res;
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany({ orderBy: { createdAt: "desc" } });
  }),
});

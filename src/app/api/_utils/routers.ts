import { createEdgeRouter } from "next-connect";

export const publicRouter = createEdgeRouter()
  .use((_req, _ctx, next) => {
    console.log("Middleware 1");
    return next();
  })
  .use((_req, _ctx, next) => {
    console.log("Middleware 2");
    return next();
  });

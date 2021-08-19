const Koa = require("koa");
const next = require("next");
const dotenv = require("dotenv");
const Router = require("koa-router");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const registerRoutes = require("./routes/register_routes");
const formidable   = require('koa2-formidable');
dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const apiRouter = new Router();
  registerRoutes(apiRouter);

  // setup server
  server.use(session(server));
  server.use(formidable({}))
  server.use(bodyParser({formidable:{maxFileSize:200 * 1024 * 1024,keepExtensions: true},multipart: true,urlencoded: true,enableTypes : ['json','form']}));
  server.use(apiRouter.routes());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    return;
  });

  server.listen(port, host, () => {
    console.log(`> Ready on http://${host}:${port}`);
  });
});

/**
 * Cloudflare Worker Entry Point
 * Minimal infrastructure layer - business logic is in MoonBit
 */
import { Hono } from 'hono';
import { basicAuth } from 'hono/basic-auth';
import { secureHeaders } from 'hono/secure-headers';
import { configure_app } from '../target/js/release/build/__gen__/server/server.js';

type Env = {
  DB: D1Database;
  BASIC_AUTH_USER: string;
  BASIC_AUTH_PASS: string;
};

const app = new Hono<{ Bindings: Env }>();

// Security headers (HSTS, X-Frame-Options, etc.)
app.use('*', secureHeaders());

// Basic Auth middleware for admin routes
app.use('/admin/*', basicAuth({
  verifyUser: (username, password, ctx) => {
    return username === ctx.env.BASIC_AUTH_USER && password === ctx.env.BASIC_AUTH_PASS;
  },
  realm: 'Admin',
}));

// Basic Auth middleware for API routes
app.use('/api/*', basicAuth({
  verifyUser: (username, password, ctx) => {
    return username === ctx.env.BASIC_AUTH_USER && password === ctx.env.BASIC_AUTH_PASS;
  },
  realm: 'API',
}));

// Configure MoonBit/Luna routes (all business logic here)
configure_app(app);

// Export for Cloudflare Workers
export default {
  fetch: (request: Request, env: Env, ctx: ExecutionContext): Promise<Response> => {
    // Set D1 binding for MoonBit database access
    (globalThis as any).__D1_DB = env.DB;
    return app.fetch(request, env, ctx);
  }
};

import Fastify, { FastifyRequest, FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import { fetchDevelopers, fetchRepositories } from "./helpers.mjs";

export const createApp = (options: FastifyServerOptions = {}) => {
  const app = Fastify({
    ignoreTrailingSlash: true,
    ...options,
  });

  app.register(cors, { origin: true, methods: ["GET"] });
  app.register(sensible);

  app.get("/favicon.ico", (_, reply) => reply.code(204).send());

  app.get(
    "/developers",
    async (
      request: FastifyRequest<{
        Querystring: {
          language?: string;
          since?: "daily" | "weekly" | "monthly";
        };
      }>
    ) => {
      return (await fetchDevelopers(request.query)) || [];
    }
  );

  app.get(
    "/repositories",
    async (
      request: FastifyRequest<{
        Querystring: {
          language?: string;
          spokenLanguage?: string;
          since?: "daily" | "weekly" | "monthly";
        };
      }>
    ) => {
      return (await fetchRepositories(request.query)) || [];
    }
  );

  app.get("/languages", async (_, reply) => {
    reply.cacheControl("max-age", 86400);
    return (await import("./languages.json")).default;
  });

  app.get("/spoken_languages", async (_, reply) => {
    reply.cacheControl("max-age", 86400);
    return (await import("./spoken-languages.json")).default;
  });

  return app;
};

import { getFetch, httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";
import { appRouter } from "~/server/routers/app.routes";

export const trpc = createTRPCNext<typeof appRouter>({
  config({ ctx }) {
    // Determine the URL based on the environment
    const url = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000/api/trpc/";

    return {
      // Configure the query client options
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      },
      // Set headers for server-side rendering
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
      // Configure the HTTP batch link
      links: [
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
      // Set the data transformer to superjson
      transformer: superjson,
    };
  },
  // Enable server-side rendering
  ssr: true,
});

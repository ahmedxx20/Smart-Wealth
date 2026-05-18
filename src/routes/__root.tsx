import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, HeadContent, Scripts, Link } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AuthProvider } from "@/lib/auth-context";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Smart Wealth — AI Investment Platform" },
      { name: "description", content: "Smart mining and safe automated investment with decentralized AI." },
      { property: "og:title", content: "Smart Wealth — AI Investment Platform" },
      { name: "twitter:title", content: "Smart Wealth — AI Investment Platform" },
      { property: "og:description", content: "Smart mining and safe automated investment with decentralized AI." },
      { name: "twitter:description", content: "Smart mining and safe automated investment with decentralized AI." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3d0ea6cf-21d8-4cc9-a4b6-6360c223e0b4/id-preview-d3cb42dc--e5e62567-0953-4c96-8d8f-f56fe834f073.lovable.app-1779085503846.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/3d0ea6cf-21d8-4cc9-a4b6-6360c223e0b4/id-preview-d3cb42dc--e5e62567-0953-4c96-8d8f-f56fe834f073.lovable.app-1779085503846.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: ({ children }) => (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  ),
  component: () => {
    const { queryClient } = Route.useRouteContext();
    return (
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Outlet />
          <Toaster theme="dark" position="top-center" />
        </AuthProvider>
      </QueryClientProvider>
    );
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-8 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="mt-2 text-muted-foreground">Page not found</p>
        <Link to="/dashboard" className="btn-glow mt-4 inline-flex">Go home</Link>
      </div>
    </div>
  ),
});

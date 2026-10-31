import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { store } from "~/redux/store/store";
import AuthProvider from "~/hooks/providers/AuthProvider";
import { useRouteTracking } from "~/hooks/useRouteTracking";
import { generateMeta } from "~/utils";
import "./styles/index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

export function meta(): ReturnType<Route.MetaFunction> {
  return generateMeta();
}

export const links: Route.LinksFunction = () => [
  { rel: "icon", type: "image/x-icon", href: "/AmmoLogo.ico" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Poppins:wght@300;400;500;600;700&family=Saira+Stencil+One&family=Urbanist:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-T48HQE6N4W"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T48HQE6N4W');
            `,
          }}
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-mainBG">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const googleClientId = import.meta.env.VITE_GOOGLE_LOGIN_CLIENT_ID || "";

  // Track visited routes for smart redirect after login
  useRouteTracking();

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                style: {
                  border: "1px solid #333333",
                  padding: "4px 6px",
                  color: "#ffffff",
                  borderRadius: "5px",
                  background: "#1f0c01",
                },
              }}
            />
            <Outlet />
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="min-h-screen bg-mainBG flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl heading-gradient mb-4">{message}</h1>
        <p className="text-secondaryColor text-lg mb-8">{details}</p>
        {stack && (
          <pre className="text-left bg-footerBG p-4 rounded overflow-auto max-w-2xl text-xs text-secondaryColor">
            {stack}
          </pre>
        )}
        <a
          href="/"
          className="inline-block mt-8 bg-orange text-primaryWhite px-8 py-3 font-Poppins hover:bg-[#CC4910] transition"
        >
          Go Home
        </a>
      </div>
    </main>
  );
}

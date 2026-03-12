import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import Home from "./pages/Home";
import Partner from "./pages/Partner";
import Partners from "./pages/Partners";
import Services from "./pages/Services";

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  component: Services,
});

const destinationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/destinations",
  component: Destinations,
});

const partnerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner",
  component: Partner,
});

const partnersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partners",
  component: Partners,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  destinationsRoute,
  partnerRoute,
  partnersRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}

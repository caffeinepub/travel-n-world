import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import Layout from "./components/Layout";
import About from "./pages/About";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import Contact from "./pages/Contact";
import Destinations from "./pages/Destinations";
import DomesticPackages from "./pages/DomesticPackages";
import FlightBooking from "./pages/FlightBooking";
import Home from "./pages/Home";
import HotelBooking from "./pages/HotelBooking";
import InternationalPackages from "./pages/InternationalPackages";
import LatestTravelLeads from "./pages/LatestTravelLeads";
import Partner from "./pages/Partner";
import PartnerDashboard from "./pages/PartnerDashboard";
import PartnerLogin from "./pages/PartnerLogin";
import Partners from "./pages/Partners";
import PaymentPage from "./pages/PaymentPage";
import Pricing from "./pages/Pricing";
import Services from "./pages/Services";
import TransportServices from "./pages/TransportServices";
import VisaAssistance from "./pages/VisaAssistance";

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

const flightBookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/flight-booking",
  component: FlightBooking,
});

const hotelBookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hotel-booking",
  component: HotelBooking,
});

const domesticPackagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/domestic-packages",
  component: DomesticPackages,
});

const internationalPackagesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/international-packages",
  component: InternationalPackages,
});

const visaAssistanceRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/visa-assistance",
  component: VisaAssistance,
});

const transportServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/transport-services",
  component: TransportServices,
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

const latestLeadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/latest-leads",
  component: LatestTravelLeads,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: Pricing,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-login",
  component: AdminLogin,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin-dashboard",
  component: AdminDashboard,
});

const partnerLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner-login",
  component: PartnerLogin,
});

const partnerDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/partner-dashboard",
  component: PartnerDashboard,
});

const paymentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/payment",
  component: PaymentPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  servicesRoute,
  flightBookingRoute,
  hotelBookingRoute,
  domesticPackagesRoute,
  internationalPackagesRoute,
  visaAssistanceRoute,
  transportServicesRoute,
  destinationsRoute,
  partnerRoute,
  partnersRoute,
  latestLeadsRoute,
  pricingRoute,
  contactRoute,
  adminLoginRoute,
  adminDashboardRoute,
  partnerLoginRoute,
  partnerDashboardRoute,
  paymentRoute,
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

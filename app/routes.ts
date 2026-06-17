import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("universities/:id", "routes/universities.$id.tsx"),
  route("universities", "routes/universities.tsx"),
  route("about", "routes/about.tsx"),
  route("registration", "routes/registration.tsx"),
  route("services/:id", "routes/services.$id.tsx"),
  route("services", "routes/services.tsx"),
  route("contact", "routes/contact.tsx"),
  route("admin", "routes/admin.tsx"),
  route("apply", "routes/apply.tsx"),
  route("events", "routes/events.tsx"),
  route("events/:id", "routes/events.$id.tsx"),
] satisfies RouteConfig;

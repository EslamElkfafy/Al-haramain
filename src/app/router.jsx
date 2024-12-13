import { ContentLayout, DashboardLayout } from "@/components/layouts";
import { HandleLanguage } from "@/shared/components/HandleLanguage";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";
import ScrollToTop from "@/shared/components/ScrollToTop";
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const LandingRoute = React.lazy(() =>
  import("./routes/Landing").then((module) => ({
    default: module.LandingRoute,
  }))
);
const AboutRoute = React.lazy(() =>
  import("./routes/About").then((module) => ({ default: module.AboutRoute }))
);
const ContactRoute = React.lazy(() =>
  import("./routes/Contact").then((module) => ({
    default: module.ContactRoute,
  }))
);
const ProjectsRoute = React.lazy(() =>
  import("./routes/Projects").then((module) => ({
    default: module.ProjectsRoute,
  }))
);
const SingleProjectRoute = React.lazy(() =>
  import("./routes/SingleProject").then((module) => ({
    default: module.SingleProjectRoute,
  }))
);
const ServicesRoute = React.lazy(() =>
  import("./routes/Services").then((module) => ({
    default: module.ServicesRoute,
  }))
);
const SingleServiceRoute = React.lazy(() =>
  import("./routes/SingleService").then((module) => ({
    default: module.SingleServiceRoute,
  }))
);
const DashboardLoginRoute = React.lazy(() =>
  import("./routes/dashboard/Login").then((module) => ({
    default: module.DashboardLoginRoute,
  }))
);
const DashboardControlRoute = React.lazy(() =>
  import("./routes/dashboard/Control").then((module) => ({
    default: module.DashboardControlRoute,
  }))
);
const GetDashboardProjectsRoute = React.lazy(() =>
  import("./routes/dashboard/Projects/GetProjects").then((module) => ({
    default: module.GetDashboardProjectsRoute,
  }))
);
const AddDashboardProjectRoute = React.lazy(() =>
  import("./routes/dashboard/Projects/AddProject").then((module) => ({
    default: module.AddDashboardProjectRoute,
  }))
);
const UpdateDashboardProjectRoute = React.lazy(() =>
  import("./routes/dashboard/Projects/EditProject").then((module) => ({
    default: module.UpdateDashboardProjectRoute,
  }))
);
const GetDashboardServicesRoute = React.lazy(() =>
  import("./routes/dashboard/services/GetServices").then((module) => ({
    default: module.GetDashboardServicesRoute,
  }))
);
const AddDashboardServiceRoute = React.lazy(() =>
  import("./routes/dashboard/services/AddService").then((module) => ({
    default: module.AddDashboardServiceRoute,
  }))
);
const UpdateDashboardServiceRoute = React.lazy(() =>
  import("./routes/dashboard/services/EditService").then((module) => ({
    default: module.UpdateDashboardServiceRoute,
  }))
);
const DashboardHerosRoute = React.lazy(() =>
  import("./routes/dashboard/Heros").then((module) => ({
    default: module.DashboardHerosRoute,
  }))
);
const DashboardContactRoute = React.lazy(() =>
  import("./routes/dashboard/Contact").then((module) => ({
    default: module.DashboardContactRoute,
  }))
);

export const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <HandleLanguage />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<ContentLayout />}>
            <Route index element={<LandingRoute />} />
            <Route path="about" element={<AboutRoute />} />
            <Route path="contact" element={<ContactRoute />} />
            <Route path="projects" element={<ProjectsRoute />} />
            <Route path="project/:projectId" element={<SingleProjectRoute />} />
            <Route path="services" element={<ServicesRoute />} />
            <Route path="service/:serviceId" element={<SingleServiceRoute />} />
          </Route>
          <Route path="dashboard/login" element={<DashboardLoginRoute />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route
              path="control"
              element={
                <ProtectedRoute>
                  <DashboardControlRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects"
              element={
                <ProtectedRoute>
                  <GetDashboardProjectsRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="project/add"
              element={
                <ProtectedRoute>
                  <AddDashboardProjectRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="project/:id"
              element={
                <ProtectedRoute>
                  <UpdateDashboardProjectRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="services"
              element={
                <ProtectedRoute>
                  <GetDashboardServicesRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="service/add"
              element={
                <ProtectedRoute>
                  <AddDashboardServiceRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="service/:id"
              element={
                <ProtectedRoute>
                  <UpdateDashboardServiceRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="heros"
              element={
                <ProtectedRoute>
                  <DashboardHerosRoute />
                </ProtectedRoute>
              }
            />
            <Route
              path="contact"
              element={
                <ProtectedRoute>
                  <DashboardContactRoute />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import { SignUp } from "./pages/auth/sign-up";
import { LogoutOnly } from "./routes/LogoutOnly";
import { LoginOnly } from "./routes/LoginOnly";
import { MainLayout } from "./components/main-layout";
import AddPet from "./pages/add";
import Profile from "./pages/account/profile";
import { ErrorBoundary } from "./components/error-boundary";
import Forgot from "./pages/auth/forgot";
import Code from "./pages/auth/code";
import Reset from "./pages/auth/reset";
import { Details } from "./pages/[details]";
import EditPet from "./pages/[edit]";

const LoginPage = React.lazy(async () => import("@/pages/auth/login"));

const DashboardPage = React.lazy(async () => import("@/pages/dashboard"));

const NotFoundPage = React.lazy(async () => import("@/pages/not-found"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />}>
      <Route element={<LogoutOnly />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/code" element={<Code />} />
        <Route path="/reset" element={<Reset />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />

      <Route element={<MainLayout />}>
        <Route element={<LoginOnly />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add" element={<AddPet />} />
          <Route path="/edit/:petId" element={<EditPet />} />
          <Route path="/details/:petId" element={<Details />} />
          <Route path="/account/profile" element={<Profile />} />
        </Route>
      </Route>
    </Route>,
  ),
);

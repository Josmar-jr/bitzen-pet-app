import { Outlet } from "react-router";
import { Header } from "./header";

export function MainLayout() {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}

import { Header } from "./header";
import { Footer } from "./footer";
import { MobileNavBar } from "./mobileNavBar";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet/>
      <MobileNavBar />
      <Footer />
    </>
  );
};

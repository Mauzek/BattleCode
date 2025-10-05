import { Header } from "./header";
import { Footer } from "./footer";
import { MobileNavBar } from "./mobileNavBar";
import { AppToaster } from "@/components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <MobileNavBar />
      <Footer />
      <AppToaster />
    </>
  );
};

export default Layout;

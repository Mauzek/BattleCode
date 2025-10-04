import { Header } from "./header";
import { Footer } from "./footer";
import { MobileNavBar } from "./mobileNavBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <MobileNavBar />
      <Footer />
    </>
  );
};

export default Layout;

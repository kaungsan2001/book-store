import { authApi } from "@/api/axios";
import Footer from "@/components/web/Footer";
import Header from "@/components/web/Header";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <div className="">
      <Header />
      <Outlet />

      <Footer />
    </div>
  );
}

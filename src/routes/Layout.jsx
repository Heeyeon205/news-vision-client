import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import TopButton from "../utils/Topbutton";

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <TopButton />
      </main>
      <Footer />
    </>
  );
}

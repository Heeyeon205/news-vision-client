import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import TopButton from "../utils/Topbutton";

export default function Layout() {
  return (
    <>
      {" "}
      <Header />
      <main
        className="flex-1 min-h-screen max-w-5xl w-full mx-auto p-4"
        style={{ fontFamily: "ONE-Mobile-Title" }}
      >
        <Outlet />
        <TopButton />
      </main>
      <Footer />
    </>
  );
}

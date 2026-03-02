import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import logo from "../assets/logo.png";

const LayoutAdmin = () => {
  const sidebar = [
    {
      path: "/admin",
      label: "Dashboard",
    },
    {
      path: "/admin/majalah",
      label: "Majalah",
    },
    {
      path: "/admin/layanan-terpadu",
      label: "Layanan Terpadu",
    },
    {
      path: "/admin/pola-rencana",
      label: "Pola dan Rencana",
    },
    {
      path: "/admin/tugas-fungsi",
      label: "Tugas dan Fungsi",
    },
    {
      path: "/admin/dipa",
      label: "Dipa",
    },
    {
      path: "/admin/rpsda",
      label: "RPSDA",
    },
    {
      path: "/admin/prediksi-cuaca",
      label: "Prediksi Cuaca",
    },
  ];
  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <Sidebar shadow="shadow-md" items={sidebar} />
      <div className="flex flex-col w-full overflow-hidden">
        <Navbar
          logoIcon={<img src={logo} className="w-9" />}
          shadow="shadow-md"
        />
        <div className="overflow-y-auto h-full p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;

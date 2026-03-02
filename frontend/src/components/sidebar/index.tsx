import { Button } from "../button";
import { ReactNode } from "react";
import SidebarItem from "./item";
import { SidebarItemType } from "./type";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import { Link } from "react-router-dom";

interface SidebarProps {
  header?: ReactNode;
  items: SidebarItemType[];
  backgroundColor?: string;
  textColor?: string;
  activeColor?: string;
  hoverBgColor?: string;
  hoverTextColor?: string;
  fontSize?: string;
  padding?: string;
  borderRadius?: string;
  shadow?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  header,
  items,
  backgroundColor = "bg-white",
  textColor = "text-black",
  activeColor = "bg-gray-100 text-gray-900",
  hoverBgColor = "hover:bg-gray-100",
  hoverTextColor = "hover:text-gray-900",
  fontSize = "text-base",
  padding = "p-2",
  borderRadius = "rounded-lg",
  shadow = "shadow-sm",
}) => {
  const navigate = useNavigate();
  const { changeToken } = useToken();
  const handleLogout = () => {
    changeToken();
    toast.success("Logout successfully");
    navigate("/login");
  };
  return (
    <div
      className={`${backgroundColor} flex flex-col gap-2 p-5 w-1/5  ${shadow} overflow-y-auto`}
    >
      {header}
        <Button variant="outline" className="w-full margin-b-6" onClick={handleLogout}>
          Logout
        </Button>
      <ul className={`space-y-2 font-medium ${textColor}`}>
        <li>
          <p className="mb-3 mt-3 border-b-2">Home</p>
          <Link to="/admin/banner" className="flex font-thin mb-3 ml-3">Banner</Link>
          <Link to="/admin/pengumuman" className="flex font-thin mb-3 ml-3">Pengumuman</Link>
          <Link to="/admin/geoportal" className="flex font-thin mb-3 ml-3">Geoportal</Link>
          <Link to="/admin/infografis" className="flex font-thin mb-3 ml-3">Infografis</Link>
          <Link to="/admin/youtube" className="flex font-thin mb-3 ml-3">Youtube</Link>
          <Link to="/admin/gallery" className="flex font-thin mb-3 ml-3">Gallery Infrastruktur</Link>
        </li>
        <li>
          <p className="mb-3 mt-3 border-b-2">Profil</p>
          <Link to="/admin/struktur-organisasi" className="flex font-thin mb-3 ml-3">Struktur Organisasi</Link>
          <Link to="/admin/tugas-fungsi" className="flex font-thin mb-3 ml-3">Tugas dan Fungsi</Link>
          <Link to="/admin/pola-rencana" className="flex font-thin mb-3 ml-3">Pola dan Rencana</Link>
          <Link to="/admin/dipa" className="flex font-thin mb-3 ml-3">DIPA</Link>
        </li>
        <li>
          <p className="mb-3 mt-3 border-b-2">Informasi Publik</p>
          <Link to="/admin/berita" className="flex font-thin mb-3 ml-3">Berita</Link>
          <Link to="/admin/peraturan" className="flex font-thin mb-3 ml-3">Peraturan</Link>
          <Link to="/admin/informasi" className="flex font-thin mb-3 ml-3">Informasi</Link>
          <Link to="/admin/majalah" className="flex font-thin mb-3 ml-3">Majalah Bidar</Link>
        </li>

        {items.map((item: SidebarItemType, index: number) => (
          <SidebarItem
            key={index}
            item={item}
            textColor={textColor}
            activeColor={activeColor}
            hoverBgColor={hoverBgColor}
            hoverTextColor={hoverTextColor}
            fontSize={fontSize}
            padding={padding}
            borderRadius={borderRadius}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

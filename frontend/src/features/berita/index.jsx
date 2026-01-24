import { Hash } from "../../constants";
import DetailPage from "./detail";
import ListPage from "./list";
import { useLocation } from "react-router-dom";

const BeritaPage = () => {
  const { hash } = useLocation();

  if (hash === Hash.DETAIL) {
    return <DetailPage />;
  }

  return <ListPage />;
};

export default BeritaPage;

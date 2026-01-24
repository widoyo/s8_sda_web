import Card from "../../../components/card";
import { Hash } from "../../../constants";
import { isPDF } from "../../../utils/isPdf";
import { truncateText } from "../../../utils/truncate-text";
import { useBeritaData } from "../../home/hooks/useBeritaData";
import { useNavigate } from "react-router-dom";
import { usePeraturanDetail } from "../hooks/usePeraturanDetail";
import { useQuery } from "../../../hooks/useQuery";

const DetailPeraturan = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const id = query.get("id");
  const { beritaData } = useBeritaData();
  const peraturanDetail = usePeraturanDetail(id);

  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[400px] object-cover"
        src={
          "https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/bendung%20perjaya.jpg"
        }
        alt="bendungan"
      />

      <section className="flex flex-col lg:flex-row p-10">
        {peraturanDetail ? (
          <div className="flex flex-col lg:flex-col w-full justify-center mx-6  lg:mx-12 ">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
              {peraturanDetail.title}
            </h1>

            {isPDF(peraturanDetail.url) ? (
              <iframe
                src={peraturanDetail.url}
                title="PDF Viewer"
                width="100%"
                height="100%"
                className="h-screen"
                style={{ border: "none" }}
              />
            ) : (
              <img
                src={peraturanDetail.url}
                alt={"photo"}
                className="w-full object-cover rounded-t-md"
              />
            )}
          </div>
        ) : (
          <p>Loading peraturan data...</p>
        )}

        {beritaData.length >= 1 && (
          <div className="flex flex-col space-y-5 border border-indigo rounded-sm mx-auto lg:w-1/3 w-full h-fit">
            <h1 className="text-2xl border-b border-b-indigo p-2 bg-indigo text-white">
              Berita Terkini
            </h1>
            <div className="flex flex-col ">
              {beritaData.map((item) => (
                <Card
                  key={item.id}
                  shadow={true}
                  rounded={true}
                  className="transition-transform transform hover:scale-95 hover:shadow-lg cursor-pointer"
                  onClick={() =>
                    navigate(`/berita?id=${item.id}${Hash.DETAIL}`)
                  }
                >
                  <div className="flex p-2">
                    <img
                      src={item.img}
                      alt={"berita"}
                      className="h-36 w-36 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h1 className="text-md text-indigo">
                        {truncateText(item.title, 100)}
                      </h1>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default DetailPeraturan;

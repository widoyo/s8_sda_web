import { Button } from "../../components/button";
import Card from "../../components/card";
import { useLayananTerpaduData } from "../home/hooks/useLayananTerpaduData";

const Application = () => {
  const { layananTerpaduData } = useLayananTerpaduData();
  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[50vh] md:h-[60vh] object-cover"
        src="https://mediabbwssviii.sgp1.cdn.digitaloceanspaces.com/image/WhatsApp%20Image%202024-10-25%20at%2015.11.43.jpeg"
        alt="Call center picture"
      />

      <section className="p-10">
        <h1 className="text-2xl text-indigo font-bold">APLIKASI</h1>
      </section>
      <section className="flex flex-col gap-10 px-20 pb-20">
        {layananTerpaduData.map((item) => (
          <Card
            shadow={true}
            rounded={true}
            size="w-full"
            className="border"
            key={item.id}
          >
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="md:w-1/2">
                <img
                  src={item.img}
                  alt="photo"
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
              <div className="md:w-1/2 space-y-2 p-8">
                <h1 className="text-xl text-indigo font-bold">{item.title}</h1>
                <p className="font-semibold text-xs">{item.platform}</p>
                <p className="text-sm text-justify">{item.description}</p>
                <br />
                <div className="flex justify-end">
                  <Button
                    className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-indigo"
                    onClick={() => {
                      window.location.href = item.url;
                    }}
                  >
                    Kunjungi Website
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>
    </div>
  );
};

export default Application;

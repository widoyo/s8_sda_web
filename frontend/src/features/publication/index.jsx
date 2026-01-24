import { Button } from "../../components/button";
import Card from "../../components/card";
import callCenter from "../../assets/CallCenter.png";

const Publication = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <img
        className="w-full h-[400px] object-cover"
        src={callCenter}
        alt="Call center picture"
      />

      <section className="p-10">
        <h1 className="text-2xl text-indigo font-bold">PUBLIKASI</h1>
        <div className="flex flex-row justify-end items-center gap-4 mt-5">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Cari publikasi..."
              className="block w-full px-4 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex">
            <Button className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950">
              Cari
            </Button>
          </div>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20 pb-20">
        <Card shadow={true} rounded={true} size="w-96">
          <div className="p-4 space-y-2">
            <h1 className="text-xl text-indigo">
              LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
            </h1>
            <div className="flex justify-between">
              <p>Palembang</p>
              <p>27 Juni 2024</p>
            </div>
            <p className="text-sm text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
            <div className="flex justify-end">
              <Button className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950">
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card shadow={true} rounded={true} size="w-96">
          <div className="p-4 space-y-2">
            <h1 className="text-xl text-indigo">
              LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
            </h1>
            <div className="flex justify-between">
              <p>Palembang</p>
              <p>27 Juni 2024</p>
            </div>
            <p className="text-sm text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
            <div className="flex justify-end">
              <Button className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950">
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card shadow={true} rounded={true} size="w-96">
          <div className="p-4 space-y-2">
            <h1 className="text-xl text-indigo">
              LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
            </h1>
            <div className="flex justify-between">
              <p>Palembang</p>
              <p>27 Juni 2024</p>
            </div>
            <p className="text-sm text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
            <div className="flex justify-end">
              <Button className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950">
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card shadow={true} rounded={true} size="w-96">
          <div className="p-4 space-y-2">
            <h1 className="text-xl text-indigo">
              LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
            </h1>
            <div className="flex justify-between">
              <p>Palembang</p>
              <p>27 Juni 2024</p>
            </div>
            <p className="text-sm text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
            <div className="flex justify-end">
              <Button className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950">
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card shadow={true} rounded={true} size="w-96">
          <div className="p-4 space-y-2">
            <h1 className="text-xl text-indigo">
              LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
            </h1>
            <div className="flex justify-between">
              <p>Palembang</p>
              <p>27 Juni 2024</p>
            </div>
            <p className="text-sm text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
            <div className="flex justify-end">
              <Button className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950">
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card shadow={true} rounded={true} size="w-96">
          <div className="p-4 space-y-2">
            <h1 className="text-xl text-indigo">
              LOREM IPSUM DOLOR SIT AMET 2024 KA SA LOR MA
            </h1>
            <div className="flex justify-between">
              <p>Palembang</p>
              <p>27 Juni 2024</p>
            </div>
            <p className="text-sm text-justify">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt.
            </p>
            <div className="flex justify-end">
              <Button className="bg-indigo text-white rounded-lg px-6 py-3 hover:bg-blue-950">
                Download
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Publication;

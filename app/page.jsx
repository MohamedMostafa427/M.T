import Link from "next/link";
import Image from "next/image";
import me from "./components/asets/img/message-text.png";
import { ITEMS_URL } from "@/constants/apiUrls";

export default async function Home() {
  const res = await fetch(ITEMS_URL);
  const data = await res.json();
  const items = data.data?.items;
  return (
    <main className="flex relative text-center justify-center">
      <div className="relative w-[80%] flex flex-col justify-center text-center">
        <h1 className=" my-12 font-bold">{data.message}</h1>
        <div className="mx-auto flex w-full gap-8 items-center flex-wrap relative justify-center text-center">
          {items.map((e, index) =>
            <Link key={index} href={e.services.length > 0?`/services/${e.id}`:`./notfoundPade`}><div className="w-72 bg-white rounded-lg shadow-md p-6 text-center relative">
              <div className={`absolute top-0 left-0 right-0 h-2 ${index < 3 || index > 6 ? "bg-[#658d96]" : "bg-[#d1b06b]"} rounded-t-lg`}></div>
              <div className="flex justify-center items-center mb-4">
                <Image src={me} width={50} height={50} />
              </div>
              <div className="text-gray-700 font-medium text-lg mb-2">{e.name}</div>
              <div className="text-white mx-auto w-20 font-bold text-sm bg-yellow-500 py-2 px-4 rounded">
                {e.services.length > 0 ? e.services[0].ymtaz_price : "--"}
              </div>
            </div>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

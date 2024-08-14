import Link from "next/link";
import Image from "next/image";
import me from "./components/asets/img/message-text.png";
import { ITEMS_URL } from "@/constants/apiUrls";
import CardFirstPage from "./components/CardFirstPage";


export default async function Home() {

  return (
    <main className="flex relative text-center justify-center">
      <CardFirstPage/>
    </main>
  );
}

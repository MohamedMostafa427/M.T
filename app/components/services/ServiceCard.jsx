"use client";
import { useAtom } from 'jotai';
import { selectedServiceAtom } from '@/atoms/selectedServiceAtom';
import Link from 'next/link';
import Image from 'next/image';
import me from '../asets/img/message-text.png';

export default function ServiceCard({ e, index }) {
    const [, setSelectedService] = useAtom(selectedServiceAtom);

    const handleClick = (e) => {
        setSelectedService(e);
        
    };

    return (
        <Link onClick={()=>setSelectedService({w:e.title,a:e.ymtaz_levels_prices})} href={`/ask-for-service`}>
            <div className="w-72 bg-white rounded-lg shadow-md p-6 text-center relative">
                <div className={`absolute top-0 left-0 right-0 h-2 ${index % 2 === 0 ? "bg-[#658d96]" : "bg-[#d1b06b]"} rounded-t-lg`}></div>
                <div className="flex justify-center items-center mb-4">
                    <Image src={me} width={50} height={50} alt="Service" />
                </div>
                <div  className="text-gray-700 font-medium text-lg mb-2">{e.title}</div>
                <div className="text-white mx-auto w-20 font-bold text-sm bg-yellow-500 py-2 px-4 rounded">
                    {e.ymtaz_price}
                </div>
            </div>
        </Link>
    );
}

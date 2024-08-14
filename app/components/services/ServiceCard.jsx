"use client";
import { useAtom } from 'jotai';
import { selectedServiceAtom1, selectedServiceAtom2 } from '@/atoms/selectedServiceAtom';
import Link from 'next/link';
import Image from 'next/image';
import me from '../asets/img/message-text.png';
import { motion } from 'framer-motion';

export default function ServiceCard({ e, index }) {
    const [, setSelectedService1] = useAtom(selectedServiceAtom1);
    const [, setSelectedService2] = useAtom(selectedServiceAtom2);

    const handleClick = () => {
        setSelectedService1(e.title);
        setSelectedService2(e.ymtaz_levels_prices);
    };

    const cardVariants = {
        hidden: {
            y: 50,
            opacity: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                delay: index * 0.1,
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <Link onClick={handleClick} href={`/ask-for-service`}>
                <div className="w-72 bg-white rounded-lg shadow-md p-6 text-center relative">
                    <div className={`absolute top-0 left-0 right-0 h-2 ${index % 2 === 0 ? "bg-[#658d96]" : "bg-[#d1b06b]"} rounded-t-lg`}></div>
                    <div className="flex justify-center items-center mb-4">
                        <Image src={me} width={50} height={50} alt="Service" />
                    </div>
                    <div className="text-gray-700 font-medium text-lg mb-2">{e.title}</div>
                    <div className="text-white mx-auto w-20 font-bold text-sm bg-yellow-500 py-2 px-4 rounded">
                        {e.ymtaz_price}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

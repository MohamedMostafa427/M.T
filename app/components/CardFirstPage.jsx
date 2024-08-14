"use client"
import React from 'react';
import { ITEMS_URL } from '@/constants/apiUrls';
import Link from 'next/link';
import Image from 'next/image';
import me from "./asets/img/message-text.png";
import { motion } from 'framer-motion';

export default async function CardFirstPage() {
    const res = await fetch(ITEMS_URL);
    const data = await res.json();
    const items = data.data?.items;

    const h1Variants = {
        hidden: {
            opacity: 0,
            y: 20,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeInOut",
            },
        },
    };

    const cardVariants = {
        hidden: {
            y: 100,
            opacity: 0,
        },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                delay: i * 0.12, 
                duration: 0.6,
                ease: "easeInOut",
            },
        }),
    };

    return (
        <div className="relative w-[80%] max-w-[1200px] flex flex-col justify-center text-center">
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={h1Variants}
                className="my-12 font-bold"
            >
                {data.message}
            </motion.h1>
            <div className="mx-auto flex w-full gap-8 items-center flex-wrap relative justify-center text-center">
                {items.map((e, index) =>
                    <motion.div
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={cardVariants}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={index}
                    >
                        <Link href={e.services.length > 0 ? `/services/${e.id}` : `./notfoundPade`}>
                            <div className="w-72 bg-white rounded-lg shadow-md p-6 text-center relative">
                                <div className={`absolute top-0 left-0 right-0 h-2 ${index < 3 || index > 6 ? "bg-[#658d96]" : "bg-[#d1b06b]"} rounded-t-lg`}></div>
                                <div className="flex justify-center items-center mb-4">
                                    <Image src={me} width={50} height={50} />
                                </div>
                                <div className="text-gray-700 font-medium text-lg mb-2">{e.name}</div>
                                <div className="text-white mx-auto w-20 font-bold text-sm bg-yellow-500 py-2 px-4 rounded">
                                    {e.services.length > 0 ? e.services.length : "--"}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

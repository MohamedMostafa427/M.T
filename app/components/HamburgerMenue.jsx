"use client"
import { MotionConfig, motion } from "framer-motion"
import { useState } from "react";
import { navTitle } from "./asets";
export const HamBurgerIcon = () => {
    const [HamBurgerState, setHamBurgerState] = useState(false);
    const variants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };
    return (
        <div className="md:hidden flex fixed top-0 left-0 z-10">
            <MotionConfig

            >
                <motion.div animate={HamBurgerState ? "open" : "closed"} onClick={() => setHamBurgerState(!HamBurgerState)} className={`$ relative w-14 h-14 rounded-full`}>
                    <motion.span style={{
                        position: "absolute",
                        top: "35%",
                        left: "50%",
                        x: "-50%",
                    }}
                        className="cursor-pointer w-[50%] h-[3px] rounded-xl bg-black absolute z-10 "
                        variants={{
                            open: {
                                rotate: ["0deg", "0deg", "-45deg"],
                                top: ["35%", "50%", "50%"]
                            },
                            closed: {
                                rotate: ["-45deg", "0deg", "0deg"],
                                top: ["50%", "50%", "35%"]
                            }
                        }} />
                    <motion.span
                        style={{
                            top: "50%",
                            left: "50%",
                            x: "-50%"

                        }}
                        className=" cursor-pointer w-[50%] z-10 h-[3px] rounded-xl bg-black absolute "
                        variants={{
                            open: {
                                rotate: ["0deg", "0deg", "45deg"]
                            },
                            closed: {
                                rotate: ["45deg", "0deg", "0deg"]
                            }
                        }}
                    />
                    <motion.span
                        style={{
                            top: "65%",
                            left: "50%",
                            x: "-50%"

                        }}
                        className="cursor-pointer z-10 w-[50%] h-[3px] rounded-xl bg-black absolute "
                        variants={{
                            open: {
                                rotate: ["0deg", "0deg", "45deg"],
                                top: ["65%", "50%", "50%"]
                            },
                            closed: {
                                rotate: ["45deg", "0deg", "0deg"],
                                top: ["50%", "50%", "65%"]
                            }
                        }}
                    />
                    {HamBurgerState && (
                        <motion.div
                            style={{
                                x: "-200px"
                            }}
                            variants={{
                                open: {
                                    x: ["-200px", "0px", "0px"]
                                },
                                closed: {
                                    x: ["0px", "00px", "0px"]
                                }
                            }}

                            className='text-white justify-center rounded absolute h-[98dvh] w-[290%] left-[-7px]  bg-[#696f79] md:flex gap-5 md:gap-10'>
                            <div className="justify-center relative top-24 flex flex-col gap-4">
                                {navTitle.map((e) =>
                                    <motion.div variants={variants}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="m-auto" key={e.id}>
                                        <a href='#'>
                                            {e.title}
                                        </a>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </MotionConfig>
        </div>
    )
}
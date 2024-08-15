"use client";
import { useState, useEffect } from "react";
import { MdCloudUpload, MdCancel } from "react-icons/md";
import { axiosInstance } from "@/lib/axiosInstance";
import { POST_URL, TOKEN } from "@/constants/apiUrls";
import { selectedServiceAtom1, selectedServiceAtom2, selectedServiceAtom3 } from "@/atoms/selectedServiceAtom";
import { useAtomValue } from "jotai";
import { motion } from "framer-motion";
import { Loading } from "../components/Loading";
import axios from "axios";

export default function AskForService() {
    const selectedService1 = useAtomValue(selectedServiceAtom1);
    const selectedService2 = useAtomValue(selectedServiceAtom2);
    const selectedService3 = useAtomValue(selectedServiceAtom3);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        service_id: selectedService3,
        priority: "",
        description: "",
        accept_rules: 1,
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : "");
    };
    console.log(file)
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!data.description) {
            setError("يرجى ملء حقل الوصف");
            return;
        }

        if (!data.priority) {
            setError("يرجى اختيار مستوي الطلب");
            return;
        }

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("service_id", selectedService3);
        formData.append("priority", data.priority);
        formData.append("description", data.description);
        formData.append("accept_rules", 1);
        if (file) {
            formData.append("file", file);
        }

        try {
            const response = await axios.post(POST_URL, formData, {
                headers: {
                    Authorization: TOKEN,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Success:", response.data);
            setMessage("تم الإرسال بنجاح");
            setFile(null);
            setFileName("");
            setData({
                service_id: "",
                priority: "",
                description: "",
                accept_rules: 1,
            })
        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
            setError("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة مرة أخرى");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (error || message) {
            const timer = setTimeout(() => {
                setError(null);
                setMessage(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [error, message]);

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.6, ease: "easeInOut" },
        },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.2 } },
    };

    return (
        <div className="flex flex-col gap-12 my-5">
            <motion.h1
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="flex relative font-semibold text-2xl"
            >
                {selectedService1}
            </motion.h1>
            <motion.form
                onSubmit={handleSubmit}
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="flex flex-col gap-6 text-[#696f79]"
            >
                <div className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[920px] flex flex-col">
                    <label>نوع الخدمة</label>
                    <motion.input
                        name="service_id"
                        value={selectedService1}
                        readOnly
                        type="text"
                        className="lg:w-full h-12 rounded"
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                    />
                </div>
                <div className="flex flex-col">
                    <label>مستوي الطلب</label>
                    <motion.select
                        required
                        onChange={handleChange}
                        value={data.priority}
                        className="h-12 rounded"
                        name="priority"
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                    >
                        <option>--اختر مستوي--</option>
                        {selectedService1 && selectedService2.map((e, idx) => (
                            <option key={idx} value={e.level.id}>{e.level.name}</option>
                        ))}
                    </motion.select>
                </div>
                <div className="flex flex-col gap-2">
                    <label>محتوي الطلب</label>
                    <motion.textarea
                        onChange={handleChange}
                        name="description"
                        value={data.description}
                        className="h-24"
                        initial="hidden"
                        animate="visible"
                        variants={formVariants}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    {!file && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={formVariants}
                        >
                            <label>المرفقات</label>
                            <motion.label
                                htmlFor="file-upload"
                                className="cursor-pointer p-5 bg-white flex flex-col rounded items-center"
                                initial="hidden"
                                animate="visible"
                                variants={formVariants}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                                <MdCloudUpload className="text-7xl" />
                                <p className="mt-2 text-xs text-gray-400">مرفقات الطلب اختيارية</p>
                            </motion.label>
                        </motion.div>
                    )}
                    {fileName && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={formVariants}
                            className="mt-2 flex text-xl items-center gap-1 text-gray-600"
                        >
                            <p>{fileName}</p>
                            <MdCancel
                                onClick={() => {
                                    setFile(null);
                                    setFileName("");
                                }}
                                className="text-red-700 cursor-pointer"
                            />
                        </motion.div>
                    )}
                    {file && file.type.startsWith("image/") && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={formVariants}
                            className="mt-2"
                        >
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                            />
                        </motion.div>
                    )}
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-600 bg-red-100 p-4 rounded mx-auto"
                    >
                        <p>{error}</p>
                    </motion.div>
                )}
                {message && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-600 bg-green-100 p-4 rounded mx-auto"
                    >
                        <p>{message}</p>
                    </motion.div>
                )}
                <motion.button
                    type="submit"
                    disabled={loading}
                    className={`p-3 text-white md:w-[35%] rounded mx-auto bg-[#ddb762] ${loading ? "opacity-50" : ""}`}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    تأكيد الطلب
                </motion.button>
            </motion.form>
            {loading && <Loading />}
        </div>
    );
}

"use client";
import { useState } from 'react';
import { MdCloudUpload } from 'react-icons/md';
import { axiosInstance } from '@/lib/axiosInstance';
import { POST_URL } from '@/constants/apiUrls';
import { selectedServiceAtom1 ,selectedServiceAtom2 } from '@/atoms/selectedServiceAtom';
import { useAtomValue } from 'jotai';

export default function AskForService() {
    const selectedService1 = useAtomValue(selectedServiceAtom1);
    const selectedService2 = useAtomValue(selectedServiceAtom2);
    const [fileName, setFileName] = useState("");

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        service_id: 11 ,
        priority: "",
        description: "",
        accept_rules: "",
        AttachmentKey: "",
        
    });
    console.log(file)
    console.log(data)
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {

        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axiosInstance.post(POST_URL, {
                ...data,
                file: file || null,
            });
            alert("تم بنجاح");
        } catch {
            alert("حدث خطأ");
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className='flex flex-col gap-12 mt-5'>
            <h1 className='flex relative font-semibold text-2xl'>{selectedService1} </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6 text-[#696f79]'>
                <div className='w-[300px] sm:w-[500px] md:w-[700px] lg:w-[920px] flex flex-col'>
                    <label>نوع الخدمة</label>
                    <input
                        name=''
                        onChange={handleChange}
                        value={selectedService1}
                        readOnly
                        type="text"
                        className='lg:w-full h-12 rounded'

                    />
                </div>
                <div className='flex flex-col'>
                    <label >مستوي الطالب</label>
                    <select
                        required

                        onChange={handleChange}
                        value={data.priority}
                        className='h-12 rounded'
                        name='priority'>
                        {selectedService1 && (selectedService2.map((e) => (
                            <option >{e.level.name}</option>
                        )))}

                    </select>
                </div>
                <div className='flex flex-col gap-2'>
                    <label>محتوي الطالب</label>
                    <textarea
                        required
                        onChange={handleChange}
                        name='description'
                        className='h-24'>
                    </textarea>
                </div>
                <div className='flex flex-col gap-2'>
                    <label>المرفقات</label>
                    <label
                        htmlFor="file-upload" 
                        className="cursor-pointer p-5 bg-white flex flex-col rounded items-center">
                        <input
                            name='AttachmentKey'
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <MdCloudUpload className='text-7xl' />
                        <p className="mt-2 text-xs text-gray-400">مرفقات الطلب اختيارية</p>
                    </label>
                    {fileName && (
                        <div className="mt-2 text-sm text-gray-600">
                            <p>Selected file: {fileName}</p>
                        </div>
                    )}
                    {file && file.type.startsWith("image/") && (
                        <div className="mt-2">
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`p-3 text-white md:w-[35%] rounded mx-auto bg-[#ddb762] ${loading ? "opacity-50" : ""}`}>
                    تأكيد الطلب
                </button>
            </form>
        </div>
    );
}

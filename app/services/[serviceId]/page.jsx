import Link from 'next/link';
import { ITEMS_URL } from '@/constants/apiUrls';
import ServiceCard from '@/app/components/services/ServiceCard';

const ServicePage = async ({ params: { serviceId } }) => {
    const res = await fetch(ITEMS_URL);
    const data = await res.json();
    const items = data.data?.items;
    const currentItem = items.find((item) => item.id?.toString() === serviceId)

    if (!currentItem) {
        return (
            <div>
                This item doesn't exist
                <Link href='/'>
                    Go home
                </Link>
            </div>
        )
    }
    return (
        <div className="relative w-[80%] flex flex-col justify-center text-center">
            <h1 className=" my-12 font-bold">{}</h1>
            <div className="mx-auto flex w-full gap-8 items-center flex-wrap relative justify-center text-center">
                {currentItem.services.map((e, index) =>
                    <ServiceCard e={e} index={index} />
                )}
            </div>
        </div>
    )

}
export default ServicePage;
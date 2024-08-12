import { HamBurgerIcon } from './HamburgerMenue'
import { navTitle } from './asets'
import Image from 'next/image';
import me from "./asets/img/logo.png"
export const Nav = () => {
    return (
        <div className='flex items-center flex-row-reverse p-[1%] justify-between '>
            <div>
                <HamBurgerIcon/>
            </div>
            <div className='hidden md:flex gap-5 md:gap-10'>
                {navTitle.map((e) => <div key={e.id}><a href='#'>{e.title}</a></div>)}
            </div>
            <div>
                <Image
                    src={me}
                    width={100}
                    height={100}
                    alt="logo"
                />
            </div>
        </div>
    )
}

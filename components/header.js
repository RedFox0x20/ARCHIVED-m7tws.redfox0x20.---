import Link from 'next/link';

const NavbarLinks = [
    { text: 'Home', url: 'https://www.redfox0x20.xyz/' },
    { text: 'Amateur Radio', url: '/' },
    { text: 'NOAA Gallery', url: '/wx-captures' },
    // { text: 'SSTV Gallery', url: '/sstv-captures' }
];

export default function Header() {
    return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content lg:sticky lg:top-0 lg:z-50 drop-shadow-2xl">
            <div className="hidden md:flex-none px-2 mx-2">
                <span className="text-lg font-bold">
                    {'RedFox0x20 | M7TWS'}
                </span>
            </div>
            <div className="flex-1 px-2 m-auto sm:mx-2">
                <div className="items-stretch flex">
                    {NavbarLinks.map((item, index) => {
                        return (
                            <Link
                                href={item.url}
                                key={index.toString()}
                                passHref
                            >
                                <a className="btn btn-ghost btn-sm rounded-btn">
                                    {item.text}
                                </a>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

import Link from 'next/link';

const NavbarLinks = [{ text: 'Home', url: '/' }];

export default function Header() {
    return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content lg:sticky lg:top-0 lg:z-50 drop-shadow-2xl">
            <div className="flex-none px-2 mx-2">
                <span className="text-lg font-bold">{'RedFox0x20'}</span>
            </div>
            <div className="flex-1 px-2 mx-2">
                <div className="items-stretch hidden md:flex">
                    {NavbarLinks.map((item, index) => {
                        return (
                            <Link
                                href={item.url}
                                key={index.toString()}
                                passHref
                            >
                                <span className="btn btn-ghost btn-sm rounded-btn">
                                    {item.text}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

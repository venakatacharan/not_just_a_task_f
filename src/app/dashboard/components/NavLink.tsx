"use client"
import Link from 'next/link';
import { usePathname } from "next/navigation"; // usePathname is a hook now imported from navigation
import {NavLinkProps} from "@/types";
import {navLinks} from "@/site.config";

const NavLink: React.FC<NavLinkProps> = ({ href, label, Icon, badge }) => {
    const pathName = usePathname();
    const firstPage = "/dashboard/"+ (pathName.split('/')[2] || '')
    const isActive = firstPage === href;

    return (
        <Link href={href} passHref className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${isActive ? 'bg-muted text-primary' : 'text-muted-foreground'} w-full text-left`}>
            <Icon className="h-5 w-5"/>
            {label}
            {badge !== undefined && (
                <div className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-black text-sm">
                    {badge}
                </div>
            )}
        </Link>
    );
};

function NavLinksSet() {
    return(
        <>
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navLinks.map((link, index) => (
                    <NavLink key={index} {...link} />
                ))}
            </nav>
        </>
    )
}

export default NavLinksSet
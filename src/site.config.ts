import {NavLinkProps} from "@/types";
import {Home, Banknote, Megaphone, Users, ReceiptText, Target} from 'lucide-react';

export const navLinks: NavLinkProps[] = [
    {href: "/dashboard/", label: "Dashboard", Icon: Home},
    {href: "/dashboard/customers", label: "Customers", Icon: Users},
    {href: "/dashboard/orders", label: "Orders", Icon: ReceiptText},
    {href: "/dashboard/audience", label: "Audience", Icon: Target},
    {href: "/dashboard/campaign", label: "Campaign", Icon: Megaphone},
];

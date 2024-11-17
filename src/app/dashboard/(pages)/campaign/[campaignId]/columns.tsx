"use client"

import { ColumnDef } from "@tanstack/react-table"
import {format} from "date-fns";

import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";
import {useRouter} from "next/navigation";
import {Customer} from "@/app/dashboard/(pages)/customers/columns";
import {Audience} from "@/app/dashboard/(pages)/audience/columns";


// Define the Order interface based on the Prisma model
export interface Log {
    id: string;
    customerId:string;
    campaignId:string;
    vendorMsgId:string;
    status:string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    Customer: Customer
}

export const columns: ColumnDef<Log>[] = [
    {
        accessorKey: "vendorMsgId",
        header: "Vendor Id",
    },
    {
        accessorKey: "name",
        header: "Customer Name",
        accessorFn: originalRow => {
            console.log(originalRow)
            return originalRow?.Customer?.name
        }
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "createdAt",
        header: "Sent/Failed At",
        cell: ({row}) =>{
            const date = row.getValue("createdAt") as Date;
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
    }
]

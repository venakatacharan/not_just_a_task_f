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


// Define the Order interface based on the Prisma model
export interface Audience {
    id: string;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    customers: Customer[]
}

export const columns: ColumnDef<Audience>[] = [
    {
        accessorKey: "id",
        header: "Audience ID",
    },
    {
        header: "Total Customers",
        accessorFn: originalRow => {
            return originalRow?.customers?.length
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({row}) =>{
            const date = row.getValue("createdAt") as Date;
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const audience = row.original

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();

            const deleteOrder = async (id: string) => {
                const userConfirmed = window.confirm('Are you sure you want to delete this audience?');

                if (userConfirmed) {
                    try {
                        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/audience/${id}`, {
                            maxBodyLength: Infinity,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: {
                                id: id
                            },
                            withCredentials: true
                        });

                        console.log('Audience deleted:', response.data);
                        router.refresh();
                    } catch (error) {
                        console.error('Error deleting Audience:', error);
                    }
                } else {
                    console.log('Audience deletion cancelled');
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={()=>{deleteOrder(audience.id)}}>Delete Order</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

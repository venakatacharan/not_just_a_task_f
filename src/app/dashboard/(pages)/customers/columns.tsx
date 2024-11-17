"use client"

import {ColumnDef} from "@tanstack/react-table"
import {format} from "date-fns";

import {MoreHorizontal} from "lucide-react"

import {Button} from "@/components/ui/button"
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


export interface Customer {
    id: string,
    name: string,
    email: string,
    totalVisits: number,
    lastVisit: Date,
    createdAt: Date,
    updatedAt: Date
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "totalVisits",
        header: "Total Visits",
    },
    {
        accessorKey: "lastVisit",
        header: "Last Visited",
        cell: ({row}) => {
            const date = row.getValue("lastVisit") as Date;
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({row}) => {
            const date = row.getValue("createdAt") as Date;
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
        cell: ({row}) => {
            const date = row.getValue("updatedAt") as Date;
            return format(new Date(date), 'dd/MM/yyyy HH:mm');
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const customer = row.original

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const router = useRouter();


            const markCustomerVisit = async (id: string) => {
                try {
                    const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers/add-visit/${id}`, {},{
                        maxBodyLength: Infinity,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });

                    console.log('Customer Visit Added:', response.data);
                    router.refresh();
                } catch (error) {
                    console.error('Error adding customer visit:', error);
                }

            };


            const deleteCustomer = async (id: string) => {
                const userConfirmed = window.confirm('Are you sure you want to delete this customer?');

                if (userConfirmed) {
                    try {
                        const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/customers`, {
                            maxBodyLength: Infinity,
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            data: {
                                ids: [id]
                            },
                            withCredentials: true
                        });

                        console.log('Customer deleted:', response.data);
                        router.refresh();
                    } catch (error) {
                        console.error('Error deleting customer:', error);
                    }
                } else {
                    console.log('Customer deletion cancelled');
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                            markCustomerVisit(customer.id)
                        }}>Mark Customer Visit</DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                router.push(`/dashboard/customers/update?id=${customer.id}`)
                            }}
                        >Update Customer
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            deleteCustomer(customer.id)
                        }}>Delete Customer</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

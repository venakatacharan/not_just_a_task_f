'use client'

import {useAuth} from "@/contexts/AuthContext";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {LoaderCircle} from "lucide-react";

const UserButton = () => {
    const {loading, user, login, logout} = useAuth();

    return (
        <>
            {
                loading &&
                <div className="flex justify-center items-center overflow-hidden rounded-full bg-gray-200 h-10 w-10">
                    <LoaderCircle className={'animate-spin'}/>
                </div>
            }
            {
                !loading &&
                <>
                    {
                        user ?
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="overflow-hidden rounded-full"
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={user.photo}
                                                alt={user.name}
                                                className="overflow-hidden rounded-full"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel className={'flex flex-col'}>
                                            <span>{user.name}</span>
                                            <span
                                                className={"text-muted-foreground text-sm font-normal"}>{user.email}</span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator/>
                                        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                            :
                            <Button variant={'default'} onClick={login}>Login</Button>
                    }
                </>
            }
        </>
    )
}

export default UserButton
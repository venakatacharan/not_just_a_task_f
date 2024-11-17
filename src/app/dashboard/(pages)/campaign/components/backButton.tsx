"use client"
import {useRouter} from "next/navigation"
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

const BackButton = () => {
    const router = useRouter();
    return (
        <Button onClick={() => {
            router.back()
        }} variant={"outline"} className="w-fit flex flex-row items-center">
            <ArrowLeft/> Back
        </Button>
    )
}

export default BackButton

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ContinueWithGoogleButton from "./components/googleLoginBtn";

//images-imports
import loginPageArtImage from "./images/login-page-art.jpg"

const LoginPage = () => {
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12 m-4">
                <div className="mx-auto grid w-auto md:w-[400px] gap-6 border p-10 rounded-lg shadow">
                    <div className="grid gap-6 text-center">
                        <h1 className="text-3xl font-bold">Login to Dashboard</h1>
                        <ContinueWithGoogleButton/>
                        <p className={"text-sm"}>
                            By logging in you accept all the <a href={"#terms"}>terms & condition</a> and <a href={"#privacy"}>privacy policy</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="hidden object-cover bg-muted lg:block">
                <Image
                    src={loginPageArtImage.src}
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default LoginPage
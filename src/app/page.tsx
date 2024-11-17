import Login from "@/components/login";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {


  return (
      <main className="flex min-h-screen flex-col items-center p-24">
          <div className="flex flex-col gap-4 justify-between items-center w-full">
              <h1 className={'text-4xl font-bold'}>
                  XENO - CRM - Assignment
              </h1>
              <h2 className={'text-2xl'}>
                  This is the Landing Page
              </h2>
              <Link href={'/login'} passHref={true}>
                  <Button>
                      Login
                  </Button>
              </Link>
          </div>
      </main>
);
}

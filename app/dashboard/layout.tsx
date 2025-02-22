import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/skyflow.png";
import { DashboardLinks } from "../components/DashboardLinks";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ModeToggle } from "../components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {  signOut } from "../auth";
import userAuth from "../utils/userAuth";
import { ReactNode } from "react";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      userName: true,
      grantId: true,
    },
  });
  if (!data?.userName) {
    redirect("/onboarding");
  }

  if(!data.grantId){
    return redirect("/onboarding/grant-id");
  }
  return data;
}
async function DashboardLayout({ children }: { children: ReactNode }) {
  const session = await userAuth();
  const data = await getData(session.user?.id as string);
  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]  ">
        <div className="hidden md:block border-r bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="flex  gap-1 items-center ">
                <Image
                  src={Logo}
                  alt="Skyflow Logo"
                  className="  size-11   rounded-full"
                ></Image>
                <span className="text-3xl font-semibold">
                  Sky<span className=" text-primary ">flow</span>
                </span>
              </Link>
            </div>

            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4 ">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col  ">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ">
            {" "}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="md:hidden shrink-0 "
                  size="icon"
                  variant="outline"
                >
                  <Menu className="size-5"></Menu>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <VisuallyHidden>
                  <SheetTitle>Sign in</SheetTitle>
                </VisuallyHidden>
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>
            <div className="ml-auto  flex items-center gap-x-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className=" rounded-full "
                  >
                    <img
                      src={session?.user?.image as string}
                      alt="profile picture"
                      width={20}
                      height={20}
                      className="w-full h-full rounded-full"
                    ></img>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form
                      className="w-full"
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
      <Toaster richColors closeButton />
    </>
  );
}

export default DashboardLayout;

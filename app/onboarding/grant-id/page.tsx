import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

export default function OnboardingrouteTwo(){
    return(

        <div className="min-h-screen w-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>You are almost done!</CardTitle>
                    <CardDescription> Next you will have to connect your account to the calender. </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild className="w-full ">
                        <Link href="/api/auth"  >
                        <CalendarCheck2 className="size-4 "></CalendarCheck2>
                        Connect to your Account 
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
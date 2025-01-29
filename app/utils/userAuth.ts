import { redirect } from "next/navigation";
import { auth } from "../auth"

const userAuth = async ()=>{
const session = await auth();
if(!session || !session.user){
    redirect("/")
}

return session;
}

export default userAuth
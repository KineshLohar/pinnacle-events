import { cacheLife } from "next/cache";
import { redirect } from "next/navigation";

export default async function NotFound(){
    "use cache";
    cacheLife("max");

    redirect("/");
}
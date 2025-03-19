"use client";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
export default function Home() {

  const { user } = useUser();

  const createUser = useMutation(api.user.createUser);

  useEffect(()=>{
    user&&CheckUser();
  },[user])

  const CheckUser =async()=>{
    const result = await createUser({
      email:user?.primaryEmailAddress?.emailAddress || "",
      imageUrl:user?.imageUrl || "",
      userName:user?.fullName || "",
    });

    console.log(result);
  }
  return (
    <div>Hello World!</div>
  )
}

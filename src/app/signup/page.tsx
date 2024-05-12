import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {hash} from "bcryptjs"
import User from "@/models/userModels";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/connecttodb";

const page = () => {
    const signUp = async (formData : FormData) => {
        "use server" 
        const name = formData.get("name") as string | undefined;
        const email = formData.get("email") as string | undefined;
        const password = formData.get("password") as string | undefined;

        if(!name || !email || !password){
            throw new Error("Please enter all required fields")
        }

        connectToDatabase();

        const user = await User.findOne({email});
        if(user) {
            throw new Error("User already exists")
        }
        const hashedPassword = await hash(password, 10);
        User.create({
            name ,
            email,
            password: hashedPassword,
        })
        redirect('/login');
      }

  return (
    <div className="relative">
      <div className=" bg-gray-100 flex justify-end items-center h-screen z-20">
        <img
          src="https://wallpapercave.com/wp/wp9109423.jpg"
          alt="background"
          className=" w-2/3 h-full opacity-25"
        />
        <Card className="w-96 flex flex-col justify-center h-screen">
          <CardHeader>
            <CardTitle>SignUp</CardTitle>
            <CardDescription>SignUp to connect</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={signUp}
              className="flex flex-col items-center space-y-4"
            >
              <Input name="name" placeholder="Name" />
              <Input name="email" placeholder="email" />
              <Input name="password" placeholder="password" />
              <Button type="submit">SignUp</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 justify-center items-center">
            <form action="">
              <Button variant={"outline"} type="submit">
                Sign in with Google
              </Button>
            </form>
            <Link className="mt-2" href="/login">
              Already have a account? LoginIn
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;

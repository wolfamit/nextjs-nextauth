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
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";


const page = () => {
  const loginHandler = async (formData : FormData) => {
    "use server" 
    const email = formData.get("email") as string | undefined;
    const password = formData.get("password") as string | undefined;

    if(!email || !password) throw new Error("PLease provide all the fiels");

    try {
      await  signIn('credentials', {
        email,
        password,
        redirect : true,
        redirectTo : '/'
      })
    } catch (error) {
      const err = error as CredentialsSignin;
      return err.message;
    }
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
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to connect</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action= {loginHandler}
              className="flex flex-col items-center space-y-4"
            >
              <Input name="email" placeholder="john@gmail.com" />
              <Input name="password" placeholder="password" />
              <Button type="submit">Login</Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 justify-center items-center">
            <form action="">
              
              <Button variant={"outline"} type="submit">
                Sign in with Google
              </Button>
            </form>
            <Link className="mt-2" href="/signup">
              Don't have a account? SignIn
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default page;

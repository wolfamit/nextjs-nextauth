import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

const page = () => {
  return (
    <div className="flex justify-center item-center h-100">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to connect</CardDescription>
        </CardHeader>
        <CardContent>
            <label htmlFor="email">Email</label>
          <input title="email" name="email" type="email"/>
        </CardContent>
        <CardFooter>
          <label htmlFor="password">passsord</label>
          <input className="border-solid px-2" name="passsord" title="password"/>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;

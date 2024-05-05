import NextAuth , { CredentialsSignin } from "next-auth"
import GitHub from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import credentialProvider from "next-auth/providers/credentials"
import User from "./models/userModels"
import {compare} from "bcryptjs"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub, 
    GoogleProvider({
      clientId : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET
    }),
    credentialProvider({
      name : "Credentials",
      credentials : {
        email: { label : "Email", type: "email" },
        password: { label : "password",type: "password" } 
      },
       authorize : async (credentials , req) => {
        const email = credentials.email as string;
        const password = credentials.password as string | undefined;
        
        if(!email || !password) {
          throw new CredentialsSignin("please provide both email and password");
        }
       
        // connection to MongoDb 

        const user = await User.findOne({ email }).select("+password");

        if(!user) throw new CredentialsSignin("Invalid username or password")
        if(!user.password) throw new CredentialsSignin("Invalid username or password")
        
        const isMatch = await compare(password , user.password);
        
        if(!isMatch) throw new CredentialsSignin("Invalid password");
       
        return {name: user.name,email: user.email , id: user._id};
        
      },
    })

  ],
})
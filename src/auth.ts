import NextAuth , { CredentialsSignin} from "next-auth"
import GitHub from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import credentialProvider from "next-auth/providers/credentials"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub, 
    GoogleProvider({
      clientId : process.env.GOOGLE_CLIENT_ID,
      clientSecret : process.env.GOOGLE_CLIENT_SECRET
    }),
    credentialProvider({
      name : "credentials",
      credentials : {
        email: {
          label : "Email",
          type: "email"
        },
        password: { label : "password",type: "password" } 
      },
      authorize : async ({email,password}) => {
        console.log(email,password);

        if(typeof email !== "string"){
          throw new CredentialsSignin("Email is invalid");
        }

        const user = { email, id: 'dfg' };

        if(password === 'passcode'){
          throw new CredentialsSignin({
            cause: "Password is invalid"
          })
        }
        else return user;
      },
    })

  ],
})
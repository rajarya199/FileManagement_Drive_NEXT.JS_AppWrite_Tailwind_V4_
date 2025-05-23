//user enter details
//check if user already exist(check email)
// send otp to user email
//secret key for creating session
//create new user doc if new
//return user's account id to complete login
//verify otp and authenticate to login
"use server"
import { createAdminClient,createSessionClient } from "../appwrite"
import { appwriteConfig } from "@/lib/appwrite/config";
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils";
import { cookies } from "next/headers";

const handleError = (error: unknown, message: string) => {
  console.log(error, message);
  throw error;
};


const getUserByEmail=async(email:string)=>{
      const { databases } = await createAdminClient();

  const result = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal("email", [email])],
  );
    return result.total > 0 ? result.documents[0] : null;

}

const sendEmailOTP=async({email}:{email:string})=>{
  const{account}=await createAdminClient()
  try{
    const session=await account.createEmailToken(ID.unique(),email);
  return session.userId;

  }
  catch(error){
    handleError(error, "Failed to send email OTP");
  }
}


 export const createAccount=async({fullName,email,}:{fullName:string,email:string})=>{
      const existingUser = await getUserByEmail(email);
const accountId=await sendEmailOTP({email});
if(!accountId) throw new Error("failed to send an opt")

if(!existingUser){
    const { databases } = await createAdminClient();

    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        fullName,
        email,
        avatar:   "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
        accountId,
      },
    );
}
    return parseStringify({accountId})

}
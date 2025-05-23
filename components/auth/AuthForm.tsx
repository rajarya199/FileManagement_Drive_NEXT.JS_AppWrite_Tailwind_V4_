"use client";
import React, { useState } from "react";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createAccount } from "@/lib/actions/users.action";
import OtpModel from "../otp/OTPModel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
type FormType = "login" | "register";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName:
      formType === "register"
        ? z.string().min(2).max(50)
        : z.string().optional(),
  });
};
const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });
  const onSubmit=async (values: z.infer<typeof formSchema>) =>{
    setIsLoading(true);
    try{
 const user = await createAccount({
      fullName: values.fullName || "",
      email: values.email,
    })
     
    setAccountId(user.accountId);
    }
    catch(error){
      setErrorMessage("Failed to create account");
      console.log(error);
    } finally{
      setIsLoading(false);
    }
   

    setErrorMessage("");
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 auth-form"
        >
          <h1 className="form-title">
            {type === "register" ? "Sign Up" : "Sign In"}
          </h1>
          {type === "register" && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">Full Name</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === "login" ? "Sign In" : "Register"}
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>
          {errorMessage && <p className="error-message">*{errorMessage}</p>}
          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "login" ? "/sign-up" : "/sign-in"}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === "login" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>

         {accountId && (
        <OtpModel email={form.getValues("email")} accountId={accountId} />
      )}
    </>
  );
};

export default AuthForm;

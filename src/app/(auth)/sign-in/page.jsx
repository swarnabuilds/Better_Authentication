"use client";

import { signIn } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

export default function SignInPage() {
  const onSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data  = Object.fromEntries(formData.entries());

    const {data:resData, error} = await signIn.email({
      email: data.email, // required, The email address of the user.
      password: data.password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
      rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
      callbackURL: "/", 
    }) 
    console.log(resData , error)
     
  };

  // google signIn handler 
  const handelGoogleSignIn = async () => {
    const data = await signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-zinc-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="mb-6 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Sign In
        </h1>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }

              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return "Password must be at least 8 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[0-9]/.test(value)) {
                return "Password must contain at least one number";
              }

              return null;
            }}
          >
            <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</Label>
            <Input placeholder="Enter your password" />
            <Description className="text-xs text-gray-500">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 font-medium shadow-sm">
              <Check className="h-4 w-4" />
              Submit
            </Button>
            <Button type="reset" variant="secondary" className="flex-1 font-medium">
              Reset
            </Button>
          </div>
        </Form>

        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-zinc-800" />
          </div>
          <span className="relative bg-white px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:bg-zinc-900 dark:text-zinc-500">
            OR
          </span>
        </div>

        <Button 
          onClick={handelGoogleSignIn} 
          variant="secondary" 
          className="w-full font-medium"
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
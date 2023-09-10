"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Loader } from "lucide-react";
import { LoginForm, loginSchema } from "@/app/api/(auth)/_schemas/login-schema";
import { LoginResponse } from "@/app/api/(auth)/login/route";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formValues: LoginForm) => {
    setHasSubmitted(true);

    try {
      const result = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ ...formValues }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => (await res.json()) as LoginResponse);

      console.log(result);

      if (result._type === "success") {
        location.reload();
      }

      if (result._type === "error") {
        console.log(result.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }

    setHasSubmitted(false);
  };

  return (
    <div className="flex flex-col mx-auto lg:w-[400px] gap-4 mt-12 px-4">
      <h1 className="text-4xl">Login</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input placeholder="john@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            {!hasSubmitted && <Button type="submit">Login</Button>}
            {hasSubmitted && (
              <Button type="button" disabled>
                <span>Login</span>
                <span className="ml-2 animate-spin">
                  <Loader />
                </span>
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

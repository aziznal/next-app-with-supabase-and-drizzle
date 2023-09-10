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
import {
  RegisterForm,
  registerSchema,
} from "@/app/api/(auth)/_schemas/register-schema";
import { RegisterResponse } from "@/app/api/(auth)/register/route";

export default function RegisterPage() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formValues: RegisterForm) => {
    setHasSubmitted(true);

    try {
      const result = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ ...formValues }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (res) => (await res.json()) as RegisterResponse);

      console.log(result);

      if (result._type === "success") {
        console.log(result.data);
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
      <h1 className="text-4xl">Register</h1>

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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            {!hasSubmitted && <Button type="submit">Register</Button>}
            {hasSubmitted && (
              <Button type="button" disabled>
                <span>Register</span>
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

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
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Loader } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formValues: LoginForm) => {
    setHasSubmitted(true);
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

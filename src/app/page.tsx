"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, loginFormSchemaType } from "@/schema/login-schema";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

const Home = () => {
  const form = useForm<loginFormSchemaType>({
    defaultValues: DEFAULT_VALUES,
    mode: "onBlur",
    resolver: zodResolver(loginFormSchema),
  });

  const router = useRouter();

  const { handleSubmit, formState } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (data: loginFormSchemaType) => {
    console.log("Form submitted", data);

    router.replace("/dashboard");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-16">
      <Card className="w-4/5 sm:w-3/4 md:w-1/4 h-auto flex items-center justify-center">
        <h1 className="text-xl font-bold w-full text-center">
          Journal
        </h1>
        <p className="text-sm font-semibold w-full text-center">
          Login to continue
        </p>

        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full p-5 flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      autoComplete="email"
                      {...field}
                    />
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
                    <Input
                      placeholder="********"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formState.errors.root && (
              <p className="text-sm text-red-500">
                {formState.errors.root.message}
              </p>
            )}

            <Button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Logging in ..." : "Login"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Home;

import { Link } from "react-router-dom";
import { useFormController } from "./use-form-controller";

import { Logo } from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";

export default function Login() {
  const { controller, onSubmit, loginMutation } = useFormController();

  return (
    <Card className="!bg-backgorund max-w-2xl h-screen lg:h-auto w-screen lg:w-full flex justify-center items-center lg:block">
      <CardContent className="p-6 lg:p-16">
        <Logo />

        <div className="flex flex-col gap-4 mt-12 mb-10">
          <h2 className="text-2xl font-semibold">Entrar na plataforma</h2>
          <span className="text-base">
            Não tem uma conta?{" "}
            <Link
              to="/sign-up"
              className="text-primary font-semibold hover:underline hover:text-primary hover:opacity-70 transition-all"
            >
              Cadastre-se gratuitamente
            </Link>
          </span>
        </div>

        <Form {...controller}>
          <form onSubmit={controller.handleSubmit(onSubmit)} method="POST" className="space-y-8">
            <FormField
              control={controller.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      error={!!formState.errors.email?.message}
                      placeholder="Seu email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={controller.control}
              name="password"
              render={({ field, formState }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>

                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      error={!!formState.errors.password?.message}
                      placeholder="••••••••"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col lg:justify-between gap-4 lg:items-center lg:flex-row">
              <FormField
                control={controller.control}
                name="connected"
                render={({ field }) => (
                  <FormItem className="flex gap-4 items-center space-y-0">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>

                    <FormLabel className="!font-normal">Manter conectado</FormLabel>
                  </FormItem>
                )}
              />
              <Link
                to="/forgot"
                className="text-primary font-semibold hover:underline hover:text-primary hover:opacity-70 transition-all"
              >
                Esqueceu sua senha?
              </Link>
            </div>

            <div>
              <Button size="lg" type="submit" className="mt-2 w-full">
                {loginMutation.isPending && <Loader className="size-4 mr-1 animate-spin" />}
                Entrar na plataforma
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

import { Link } from "react-router-dom";
import { useFormController } from "./use-form-controller";
import { ArrowLeft, Loader } from "lucide-react";

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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Reset() {
  const { controller, onSubmit, sendCodeMutation } = useFormController();

  return (
    <Card className="!bg-backgorund max-w-2xl h-screen lg:h-auto w-screen lg:w-full flex justify-center items-center lg:block">
      <CardContent className="p-6 lg:p-16">
        <Logo />

        <Link
          to="/code"
          className="flex gap-2 text-primary font-semibold text-base hover:opacity-70 transition-all group mt-12"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>

        <div className="flex flex-col gap-4 mt-6 mb-10">
          <h2 className="text-2xl font-semibold">Crie uma nova senha</h2>
          <span className="text-base">Crie uma nova senha de acesso à sua conta.</span>
        </div>

        <Form {...controller}>
          <form onSubmit={controller.handleSubmit(onSubmit)} method="POST" className="space-y-8">
            <FormField
              control={controller.control}
              name="password"
              render={({ field, formState }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>Senha</FormLabel>

                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      error={!!formState.errors.password?.message}
                      placeholder="Crie uma nova senha"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={controller.control}
              name="confirmPassword"
              render={({ field, formState }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>Confirmar senha</FormLabel>

                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      error={!!formState.errors.confirmPassword?.message}
                      placeholder="Repita a nova senha"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button size="lg" type="submit" className="mt-2 w-full">
                {sendCodeMutation.isPending && <Loader className="size-4 mr-1 animate-spin" />}
                Próximo
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

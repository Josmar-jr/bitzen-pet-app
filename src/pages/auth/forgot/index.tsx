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

import { ArrowLeft, Loader } from "lucide-react";

export default function Forgot() {
  const { controller, onSubmit, sendCodeMutation } = useFormController();

  return (
    <Card className="!bg-backgorund max-w-2xl h-screen lg:h-auto w-screen lg:w-full flex justify-center items-center lg:block">
      <CardContent className="p-6 lg:p-16">
        <Logo />

        <Link
          to="/login"
          className="flex gap-2 text-primary font-semibold text-base hover:opacity-70 transition-all group mt-12"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>

        <div className="flex flex-col gap-4 mt-6 mb-10">
          <h2 className="text-2xl font-semibold">Esqueceu sua senha?</h2>
          <span className="text-base">
            Vamos te ajudar nisso! Primeiro, digite seu e-mail cadastrado ao criar a sua conta.
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

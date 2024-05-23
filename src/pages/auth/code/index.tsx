import { Link } from "react-router-dom";
import { useFormController } from "./use-form-controller";

import { Logo } from "@/components/logo";
import { Card, CardContent } from "@/components/ui/card";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Button } from "@/components/ui/button";

import { ArrowLeft, Loader } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function Code() {
  const { controller, onSubmit, sendCodeMutation, resendEmail } = useFormController();

  return (
    <Card className="!bg-backgorund max-w-2xl h-screen lg:h-auto w-screen lg:w-full flex justify-center items-center lg:block">
      <CardContent className="p-6 lg:p-16">
        <Logo />

        <Link
          to="/forgot"
          className="flex gap-2 text-primary font-semibold text-base hover:opacity-70 transition-all group mt-12"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>

        <div className="flex flex-col gap-4 mt-6 mb-10">
          <h2 className="text-2xl font-semibold">Confira o seu email</h2>
          <span className="text-base">
            Insira nos campos abaixo o código que enviamos para você no seu endereço de e-mail.
          </span>
        </div>

        <Form {...controller}>
          <form onSubmit={controller.handleSubmit(onSubmit)} method="POST" className="space-y-8">
            <FormField
              control={controller.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="gap-2 lg:gap-6 *:rounded *:border justify-center mx-auto">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Button
                disabled={sendCodeMutation.isPending}
                size="lg"
                type="submit"
                className="mt-2 w-full"
              >
                {sendCodeMutation.isPending && <Loader className="size-4 mr-1 animate-spin" />}
                Próximo
              </Button>
            </div>

            <span className="text-center mx-auto block">
              Não recebeu o código?{" "}
              <button
                disabled={sendCodeMutation.isPending}
                type="button"
                onClick={resendEmail}
                className="text-primary font-semibold hover:opacity-70 transition-all"
              >
                Reenviar
              </button>
            </span>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

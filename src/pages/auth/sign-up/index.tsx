import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { schema, type SignUpData } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ArrowLeft, Loader } from "lucide-react";
import { formatCPF } from "@/utils/formatters";
import { PhoneInput } from "@/components/ui/phone-input";
import { useAuthQueries } from "@/hooks/queries/use-auth-queries";
import type { Value } from "react-phone-number-input";

export function SignUp() {
  const { signUpMutation } = useAuthQueries();

  const form = useForm<SignUpData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: SignUpData) {
    signUpMutation.mutate({
      name: data.fullname,
      email: data.email,
      document: data.document,
      phone_number: data.phone,
      password: data.password,
      password_confirmation: data.confirmPassword,
    });
  }

  return (
    <Card className="bg-card max-w-6xl min-h-screen lg:min-h-0 w-screen lg:w-full flex justify-center items-center lg:block">
      <CardContent className="p-6 lg:p-16">
        <Link
          to="/login"
          className="flex gap-2 text-primary font-semibold text-base hover:opacity-70 transition-all group"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Voltar
        </Link>

        <div className="flex flex-col gap-4 mt-12 mb-10">
          <h2 className="text-2xl font-semibold">Cadastre-se</h2>
          <span className="text-base">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline hover:text-primary hover:opacity-70 transition-all"
            >
              Entrar na plataforma
            </Link>
          </span>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="POST"
            className="grid grid-cols-2 gap-6 lg:gap-8 w-full"
          >
            <FormField
              control={form.control}
              name="fullname"
              render={({ field, formState }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      error={!!formState.errors.fullname?.message}
                      placeholder="Seu nome"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, formState }) => (
                <FormItem className="col-span-2">
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      error={!!formState.errors.email?.message}
                      placeholder="Insira o seu e-mail"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field: { onChange, ...rest }, formState }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>CPF</FormLabel>

                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      error={!!formState.errors.password?.message}
                      placeholder="Insira o seu CPF"
                      onChange={(e) => {
                        const { value } = e.target;
                        e.target.value = formatCPF(value);

                        if (value.length > 14) {
                          return;
                        }

                        onChange(e);
                      }}
                      {...rest}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field, formState }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>Telefone</FormLabel>

                  <FormControl>
                    <PhoneInput
                      maxLength={15}
                      error={!!formState.errors.phone?.message}
                      defaultCountry="BR"
                      placeholder="Enter a phone number"
                      {...field}
                      value={field.value as Value}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field, formState }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>Senha</FormLabel>

                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      error={!!formState.errors.password?.message}
                      placeholder="Crie uma senha"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, formState }) => (
                <FormItem className="col-span-2 lg:col-span-1">
                  <FormLabel>Confirmar senha</FormLabel>

                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      error={!!formState.errors.confirmPassword?.message}
                      placeholder="Repita a senha"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 flex flex-col lg:justify-between gap-4 lg:items-center lg:flex-row">
              <FormField
                control={form.control}
                name="termsConfirm"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-4 items-center space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>

                      <FormLabel className="!font-normal">
                        Li e concordo com os{" "}
                        <Link
                          to="#"
                          className="text-primary font-semibold hover:underline hover:text-primary hover:opacity-70 transition-all"
                        >
                          Termos de uso
                        </Link>{" "}
                        e a{" "}
                        <Link
                          to="#"
                          className="text-primary font-semibold hover:underline hover:text-primary hover:opacity-70 transition-all"
                        >
                          Política de privacidade
                        </Link>{" "}
                        do sistema.
                      </FormLabel>
                    </div>

                    <FormMessage className="block" />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-2">
              <Button
                disabled={signUpMutation.isPending}
                size="lg"
                type="submit"
                className="mt-2 w-full"
              >
                {signUpMutation.isPending && <Loader className="size-4 mr-1 animate-spin" />}
                Entrar na plataforma
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

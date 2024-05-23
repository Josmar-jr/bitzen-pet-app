import { PageTitleArea } from "@/components/page-title-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormController } from "./use-form-controller";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogoutArea } from "./components/logout-area";

export default function Profile() {
  const { controller, onSubmit } = useFormController();

  return (
    <div>
      <PageTitleArea title="Meu perfil" />

      <main className="w-full max-w-2xl mx-auto mt-6 lg:mt-20 space-y-9 p-4">
        <Card className="w-full">
          <CardHeader className="border-b border-slate-200 pt-6">
            <CardTitle>Meus dados</CardTitle>
          </CardHeader>
          <CardContent className="lg:px-10 px-7 py-6 lg:pb-11 lg:pt-8">
            <Form {...controller}>
              <form onSubmit={controller.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={controller.control}
                  name="fullname"
                  render={({ field, formState }) => (
                    <FormItem className="col-span-1">
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
                  control={controller.control}
                  name="email"
                  render={({ field, formState }) => (
                    <FormItem className="col-span-1">
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="new-password"
                          error={!!formState.errors.email?.message}
                          placeholder="Seu nome"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <Button size="lg" className="w-full mt-4">
                    Salvar
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <LogoutArea />
      </main>
    </div>
  );
}

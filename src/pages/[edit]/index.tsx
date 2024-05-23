import { Input } from "@/components/ui/input";
import { useFormController, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./use-form-controller";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CalendarDays, Loader, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Calendar } from "@/components/ui/calendar";
import { PageTitleArea } from "@/components/page-title-area";

import { toast } from "sonner";

export default function EditPet() {
  const { controller, errors, onSubmit, updatePet, imageGenerate, setImageGenerate } =
    useFormController();

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (file) {
      if (ACCEPTED_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE) {
        controller.setValue("image", file);

        const reader = new FileReader();

        reader.onloadend = () => {
          const result = reader.result as string;

          controller.setValue("imageUrl", result);
          setImageGenerate(result);
        };

        reader.readAsDataURL(file);

        controller.clearErrors("image");
      } else {
        toast.error("Tipo de arquivo inválido. A imagem deve ser do tipo: jpg, jpeg, png.");
      }
    }

    // controller.trigger("image");
  }

  function handleRemoveImage() {
    controller.resetField("image");
    controller.setValue("imageUrl", null);
    setImageGenerate(null);
  }

  return (
    <>
      <PageTitleArea title="Adicionar pet" />

      <main className="w-full max-w-[1352px] mx-auto mt-6 lg:mt-20 space-y-9 p-4">
        <Form {...controller}>
          <form
            onSubmit={controller.handleSubmit(onSubmit)}
            className="flex-col lg:flex-row flex gap-8 w-full"
          >
            <div>
              <div
                className={cn(
                  "border bg-[#EDEDED] aspect-auto border-dashed w-[336px] h-[280px] rounded-md relative gap-2 flex flex-col justify-center items-center",
                  errors.image?.message && "border-destructive bg-red-50",
                )}
              >
                {imageGenerate === null ? (
                  <>
                    <Input
                      onChange={handleImageUpload}
                      className="w-[336px] opacity-0 h-[280px] cursor-pointer size-full absolute top-0 left-0"
                      type="file"
                    />
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.654 12.3499C13.294 12.9197 12.8136 13.4039 12.2467 13.7684C11.6797 14.1329 11.0399 14.3689 10.372 14.4599C9.612 14.5679 8.858 14.6839 8.104 14.8099C5.998 15.1599 4.5 17.0139 4.5 19.1479V35.9999C4.5 37.1934 4.97411 38.338 5.81802 39.1819C6.66193 40.0258 7.80653 40.4999 9 40.4999H39C40.1935 40.4999 41.3381 40.0258 42.182 39.1819C43.0259 38.338 43.5 37.1934 43.5 35.9999V19.1479C43.5 17.0139 42 15.1599 39.896 14.8099C39.1414 14.6842 38.3854 14.5675 37.628 14.4599C36.9605 14.3686 36.321 14.1325 35.7544 13.768C35.1878 13.4035 34.7078 12.9195 34.348 12.3499L32.704 9.71792C32.3348 9.11812 31.8264 8.61611 31.2221 8.25439C30.6177 7.89268 29.9351 7.68191 29.232 7.63992C25.7465 7.45271 22.2535 7.45271 18.768 7.63992C18.0649 7.68191 17.3823 7.89268 16.7779 8.25439C16.1736 8.61611 15.6652 9.11812 15.296 9.71792L13.654 12.3499Z"
                        stroke="#595959"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M33 25.5C33 27.8869 32.0518 30.1761 30.364 31.864C28.6761 33.5518 26.3869 34.5 24 34.5C21.6131 34.5 19.3239 33.5518 17.636 31.864C15.9482 30.1761 15 27.8869 15 25.5C15 23.1131 15.9482 20.8239 17.636 19.136C19.3239 17.4482 21.6131 16.5 24 16.5C26.3869 16.5 28.6761 17.4482 30.364 19.136C32.0518 20.8239 33 23.1131 33 25.5ZM37.5 21H37.516V21.016H37.5V21Z"
                        stroke="#595959"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <span className="px-12 text-center text-sm leading-6">
                      Clique para adicionar uma imagem
                    </span>
                  </>
                ) : (
                  <>
                    <img className="w-[336px] h-[278px]" src={imageGenerate} alt="Pet do usuário" />

                    <Button
                      onClick={handleRemoveImage}
                      variant="outline"
                      className="size-10 p-0 rounded-full absolute -bottom-4 -right-4 border-dashed text-destructive"
                    >
                      <Trash2 className="text-destructive" />
                    </Button>
                  </>
                )}
              </div>
              {errors.image?.message && (
                <p className="text-destructive text-sm text-center mt-2">
                  {errors.image.message as string}
                </p>
              )}
            </div>

            <div className="w-full">
              <Card className="w-full">
                <CardContent className="lg:px-10 px-7 py-6 lg:py-11 space-y-6 lg:w-1/2">
                  <FormField
                    control={controller.control}
                    name="name"
                    render={({ field, formState }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="new-password"
                            error={!!formState.errors.name?.message}
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
                    name="birthday"
                    render={({ field, formState }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Data de nascimento</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                size="lg"
                                className={cn(
                                  "pl-3 w-full text-left font-normal hover:text-muted-foreground",
                                  !field.value && "text-muted-foreground",
                                  formState.errors.birthday && "border-destructive",
                                )}
                              >
                                {field.value ? (
                                  dayjs(field.value).format("DD/MM/YYYY")
                                ) : (
                                  <span>Selecione a data</span>
                                )}
                                <CalendarDays
                                  className={cn(
                                    "ml-auto h-4 w-4 opacity-50",
                                    formState.errors.birthday && "text-destructive",
                                  )}
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              captionLayout="dropdown-buttons"
                              mode="single"
                              fromYear={Number(dayjs().get("y")) - 100}
                              toYear={Number(dayjs().get("y"))}
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={controller.control}
                    name="color"
                    render={({ field, formState }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Cor</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="new-password"
                            error={!!formState.errors.color?.message}
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
                    name="description"
                    render={({ field, formState }) => (
                      <FormItem className="col-span-1">
                        <FormLabel>Sobre o pet</FormLabel>
                        <FormControl>
                          <Textarea
                            className="min-h-[120px]"
                            autoComplete="new-password"
                            error={!!formState.errors.description?.message}
                            placeholder="Seu nome"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button
                disabled={updatePet.isPending}
                type="submit"
                className="mt-8 w-full"
                size="lg"
              >
                {updatePet.isPending && <Loader className="size-4 mr-1 animate-spin" />}
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
}

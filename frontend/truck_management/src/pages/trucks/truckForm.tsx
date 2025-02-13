"use client"
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from "sonner";

// Componentes do shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema de validação para trucks
const formSchema = z.object({
  plate: z.string().min(1, "Truck plate is required"),
  minimum_license_required: z
    .string()
    .nonempty("Select a licence type")
    .refine(
      (val) => ["A", "B", "C", "D", "E"].includes(val),
      { message: "Select a valid licence type!" }
    ),
});

export type TruckFormValues = z.infer<typeof formSchema>;

interface TruckFormProps {
  initialData?: TruckFormValues & { id?: number };
  mode?: "create" | "update";
}

export default function TruckForm({ initialData, mode = "create" }: TruckFormProps) {
  const navigate = useNavigate();

  // Configuração do formulário com react-hook-form
  const form = useForm<TruckFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      plate: "",
      minimum_license_required: "",
    },
  });

  // Atualiza os valores do formulário caso os dados iniciais mudem (para edição)
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form.reset]);

  async function onSubmit(values: TruckFormValues) {
    try {
      if (mode === "create") {
        // Criação: envia um POST e redireciona para a lista de trucks
        await api.post("trucks/", values);
        toast.success("Truck created!");
        form.reset();
        navigate("/trucks");
      } else {
        // Atualização: envia um PUT para o truck existente e redireciona para a view do truck
        await api.put(`trucks/${initialData?.id}/`, values);
        toast.success("Truck updated!");
        form.reset();
        navigate(`/trucks/${initialData?.id}`);
      }
    } catch (error: any) {
      console.error("Error submitting truck form:", error);
      
      if (error.response && error.response.data) {
        const errors = error.response.data;
        let errorMessage = "";
  
        if (errors.non_field_errors) {
          errorMessage = errors.non_field_errors.join(" ");
        } else {
          errorMessage = Object.values(errors)
            .flat()
            .join(" ");
        }
        
        toast.error(`Truck creation failed: ${errorMessage}`);
      } else {
        toast.error("Truck creation failed. Try again.");
      }
    }
  }

  return (
    // Passa o objeto completo "form" para o componente Form
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        {/* Campo para a placa */}
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Truck Plate</FormLabel>
              <FormControl>
                <Input placeholder="Enter truck plate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo para o tipo mínimo de licença */}
        <FormField
          control={form.control}
          name="minimum_license_required"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum License Required</FormLabel>
              <FormDescription>
                This is the minimum license required to operate this truck.
              </FormDescription>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="E">E</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button type="submit" disabled={!form.formState.isDirty}>
            {mode === "create" ? "Create Truck" : "Update Truck"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

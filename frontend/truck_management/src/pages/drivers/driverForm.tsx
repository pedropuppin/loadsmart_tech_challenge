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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema de validação
const formSchema = z.object({
  name: z.string().min(1, "Driver name is required"),
  license_type: z
    .string()
    .nonempty("Select a licence type")
    .refine(
      (val) => ["A", "B", "C", "D", "E"].includes(val),
      { message: "Select a valid licence type!" }
    ),
});

export type DriverFormValues = z.infer<typeof formSchema>;

interface DriverFormProps {
  initialData?: DriverFormValues & { id?: number };
  mode?: "create" | "update";
}

export default function DriverForm({ initialData, mode = "create" }: DriverFormProps) {
  const navigate = useNavigate();
  
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      license_type: "",
    },
  });
  
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [initialData, form.reset]);

  async function onSubmit(values: DriverFormValues) {
    try {
      if (mode === "create") {
        await api.post("drivers/", values);
        toast.success("Driver created!");
        form.reset();
        navigate("/drivers");
      } else {
        await api.put(`drivers/${initialData?.id}/`, values);
        toast.success("Driver updated!");
        form.reset();
        navigate(`/drivers/${initialData?.id}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Driver creation/update failed... Try again.");
    }
  }

  return (
    // Aqui passamos o objeto completo `form` para o componente Form
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Driver Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter driver name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="license_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License Type</FormLabel>
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
          <Button variant="outline" type="button" onClick={() => navigate(`/drivers/${initialData?.id}`)}>
            Back
          </Button>
          <Button type="submit" disabled={!form.formState.isDirty}>
            {mode === "create" ? "Create Driver" : "Update Driver"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

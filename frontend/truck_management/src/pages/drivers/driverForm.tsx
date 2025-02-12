"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import * as z from "zod"
import api from "../../services/api" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

// form scheema definition
const formSchema = z.object({
  name: z.string().min(1, "Driver name is required"),
  license_type: z
    .string()
    .nonempty("Select a licence type")
    .refine(
      (val) => ["A", "B", "C", "D", "E"].includes(val),
      { message: "Select a valid licence type!" }
    ),
})

export default function DriverForm() {
  const navigate = useNavigate()
  // react-hook-form config
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      license_type: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // send POST to "drivers/"
      await api.post("drivers/", values)
      toast.success("Driver created!")
      form.reset()
      navigate("/drivers")
    } catch {
      toast.error("Driver creation failed... Try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        {/* Name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drive name</FormLabel>
              <FormControl>
                <Input placeholder="Type the driver name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* License type field */}
        <FormField
          control={form.control}
          name="license_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Driver!</Button>
      </form>
    </Form>
  )
}
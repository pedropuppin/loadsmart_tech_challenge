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
  FormDescription,
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
  plate: z.string().min(1, "Truck plate is required"),
  minimum_license_required: z
    .string()
    .nonempty("Select a licence type")
    .refine(
      (val) => ["A", "B", "C", "D", "E"].includes(val),
      { message: "Select a valid licence type!" }
    ),
})

export default function TruckForm() {
  const navigate = useNavigate()
  // react-hook-form config
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plate: "",
      minimum_license_required: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // send POST to "trucks/"
      await api.post("trucks/", values)
      toast.success("Truck created!")
      form.reset()
      navigate("/trucks")
    } catch {
      toast.error("Truck creation failed... Try again.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        {/* Plate field */}
        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Truck plate</FormLabel>
              <FormControl>
                <Input placeholder="Type the truck plate" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Minimum license type field */}
        <FormField
          control={form.control}
          name="minimum_license_required"
          render={({ field }) => (
            <FormItem>
              <FormLabel>License type</FormLabel>
              <FormDescription>This is the minimum license required to drive the truck.</FormDescription>
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
        <Button type="submit">Create Truck!</Button>
      </form>
    </Form>
  )
}
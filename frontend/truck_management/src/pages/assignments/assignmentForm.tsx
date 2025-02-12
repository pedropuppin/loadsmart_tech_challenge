"use client"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import api from "../../services/api"
import { Driver, TruckType } from '@/types'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
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
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"

// Form with basic validations (the main validation is in the backend)
const formSchema = z.object({
  driver: z.string().nonempty("Please select a driver"),
  truck: z.string().nonempty("Please select a truck"),
  date: z
  .date({ required_error: "Please select a date" })
  .nullable()
  .refine((date) => date !== null, {
    message: "Please select a date",
  }),
})

export default function AssignmentForm() {
  const navigate = useNavigate()
  
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [trucks, setTrucks] = useState<TruckType[]>([])
  
  useEffect(() => {
    async function fetchData() {
      try {
        const driversResponse = await api.get("drivers/?all=true")
        const driversData = driversResponse.data.results ?? driversResponse.data
        setDrivers(driversData)
      } catch (error) {
        console.error("Error fetching drivers:", error)
      }
      try {
        const trucksResponse = await api.get("trucks/?all=true")
        const trucksData = trucksResponse.data.results ?? trucksResponse.data
        setTrucks(trucksData)
      } catch (error) {
        console.error("Error fetching trucks:", error)
      }
    }
    fetchData()
  }, [])
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      driver: "",
      truck: "",
      date: null,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        driver: parseInt(values.driver, 10),
        truck: parseInt(values.truck, 10),
        date: format(values.date, "yyyy-MM-dd"),
      }

      // send POST to "assignments/"
      await api.post("assignments/", payload)
      toast.success("Assignment created successfully!")
      form.reset()
      navigate("/assignments")
    } catch (error: any) {
      console.error("Assignment creation error:", error);
      
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
        
        toast.error(`Assignment creation failed: ${errorMessage}`);
      } else {
        toast.error("Assignment creation failed. Try again.");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <div className="grid grid-cols-12 gap-4">
          {/* Driver select field */}
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="driver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a driver" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* maps drivers */}
                      {drivers.map((driver) => (
                        <SelectItem key={driver.id} value={driver.id.toString()}>
                          {driver.name} | {driver.license_type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>The driver should meet the minimum requirement to dirve the truck.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Truck select field */}
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="truck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Truck</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Truck" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* maps trucks */}
                      {trucks.map((truck) => (
                        <SelectItem key={truck.id} value={truck.id.toString()}>
                          {truck.plate} | {truck.minimum_license_required}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Date field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of assignment</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Select the assignment date</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button type="submit">Create assignment!</Button>
        </div>
      </form>
    </Form>
  )
}
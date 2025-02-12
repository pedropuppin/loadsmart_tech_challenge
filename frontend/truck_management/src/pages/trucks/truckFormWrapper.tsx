"use client"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { TruckFormValues } from "./truckForm";
import TruckForm from "./truckForm";
import { toast } from "sonner";

export default function TruckFormWrapper() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<TruckFormValues & { id: number } | null>(null);

  useEffect(() => {
    async function fetchTruck() {
      try {
        const response = await api.get(`trucks/${id}/`);
        setInitialData({
          id: response.data.id,
          plate: response.data.plate,
          minimum_license_required: response.data.minimum_license_required,
        });
      } catch (error) {
        console.error("Error fetching truck:", error);
        toast.error("Error fetching truck data.");
      }
    }
    fetchTruck();
  }, [id]);

  if (!initialData) return <div>Loading...</div>;

  return <TruckForm initialData={initialData} mode="update" />;
}
"use client"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { DriverFormValues } from "./driverForm";
import DriverForm from "./driverForm";
import { toast } from "sonner";

export default function DriverUpdateFormWrapper() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState<DriverFormValues & { id: number } | null>(null);

  useEffect(() => {
    async function fetchDriver() {
      try {
        const response = await api.get(`drivers/${id}/`);
        setInitialData({
          id: response.data.id,
          name: response.data.name,
          license_type: response.data.license_type,
        });
      } catch (error) {
        console.error("Error fetching driver:", error);
        toast.error("Error fetching driver data.");
      }
    }
    fetchDriver();
  }, [id]);

  if (!initialData) return <div>Loading...</div>;

  return <DriverForm initialData={initialData} mode="update" />;
}
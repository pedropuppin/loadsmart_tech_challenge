"use client"
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AssignmentCard from '@/components/cards/assignmentCard'
import { Driver, Assignment, PaginatedResponse } from "@/types";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Pencil, Trash } from "lucide-react";

const DriverDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [driver, setDriver] = useState<Driver | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  useEffect(() => {
    // Buscando os dados do driver
    api.get<Driver>(`drivers/${id}/`)
      .then((response) => setDriver(response.data))
      .catch((error) => {
        console.error("Error fetching driver:", error);
        toast.error("Error fetching driver details.");
      });
    
    // Buscando os assignments relacionados ao driver.
    // Se sua API retornar os assignments paginados, verifique se precisa de ajuste (ex: response.data.results).
    api.get<PaginatedResponse<Assignment>>(`assignments/?driver=${id}`)
      .then((response) => {
        const data = response.data.results ?? response.data;
        setAssignments(data);
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, [id]);

  const handleDelete = async () => {
    if (!driver) return;
    try {
      await api.delete(`drivers/${driver.id}/`);
      toast.success("Driver deleted successfully!");
      navigate("/drivers");
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("Failed to delete driver. Try again.");
    }
  };

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Driver name and action buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{driver.name}</h2>
        <div className="flex gap-2">
          <Link to={`/driver/edit/${driver.id}`}>
            <Button variant="ghost" className="text-muted-foreground">
              <Pencil className="w-4 h-4" />
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-red-500">
                <Trash className="w-4 h-4" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this driver? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Driver details */}
      <div className="mb-8">
        <p className="flex items-center gap-2">
          <strong className="text-muted-foreground">License Type:</strong> 
          <Badge variant="secondary">{driver.license_type}</Badge>
        </p>
      </div>

      {/* show assignments if exists */}
      {assignments.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold mb-6 text-center">Assignments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">No assignments found for this driver.</p>
      )}
      
      <div className="mt-8 flex justify-center">
        <Link to="/drivers">
          <Button variant="outline">
            Back
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DriverDetail;

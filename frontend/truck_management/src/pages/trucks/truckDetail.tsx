"use client"
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AssignmentCard from '@/components/cards/assignmentCard'
import { TruckType, Assignment, PaginatedResponse } from "@/types";
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

const TruckDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [truck, setTruck] = useState<TruckType | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    api.get<TruckType>(`trucks/${id}/`)
      .then((response) => setTruck(response.data))
      .catch((error) => {
        console.error("Error fetching truck:", error);
        toast.error("Error fetching truck details.");
      });

    api.get<PaginatedResponse<Assignment>>(`assignments/?truck=${id}`)
      .then((response) => {
        const data = response.data.results ?? response.data;
        setAssignments(data);
      })
      .catch((error) => console.error("Error fetching assignments:", error));
  }, [id]);

  const handleDelete = async () => {
    if (!truck) return;
    try {
      await api.delete(`trucks/${truck.id}/`);
      toast.success("Truck deleted successfully!");
      navigate("/trucks");
    } catch (error) {
      console.error("Error deleting truck:", error);
      toast.error("Failed to delete truck. Try again.");
    }
  };

  if (!truck) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Truck details and action buttons */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Truck: {truck.plate}</h2>
        <div className="flex gap-2">
          <Link to={`/truck/edit/${truck.id}`}>
            <Button variant="ghost" className="text-muted-foreground">
              <Pencil className="w-4 h-4" /> Edit
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
                  Are you sure you want to delete this truck? This action cannot be undone.
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

      {/* Truck license*/}
      <div className="mb-8">
        <p className="flex items-center gap-2">
          <strong className="text-muted-foreground">Minimum License Required:</strong>
          <Badge variant="secondary">{truck.minimum_license_required}</Badge>
        </p>
      </div>

      {/* Truck related assignments */}
      {assignments.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold mb-6 text-center">Assignments</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} onDelete={() => {}} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">No assignments found for this truck.</p>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-center">
        <Link to="/trucks">
          <Button variant="outline">Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default TruckDetail;
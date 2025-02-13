"use client"
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { User, Truck, Calendar, Trash } from "lucide-react";
import { Assignment } from "@/types";

interface AssignmentCardProps {
  assignment: Assignment;
  onDelete: (assignmentId: number) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onDelete }) => {
  return (
    <Card className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10">
      <CardHeader className="flex justify-between flex-row space-y-0 items-center">
        <div>
          <CardTitle className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="font-semibold">{assignment.driver_detail.name}</span>
            <Badge variant="secondary">{assignment.driver_detail.license_type}</Badge>
          </CardTitle>
          <CardDescription className="flex items-center gap-2 mt-2">
            <Truck className="w-4 h-4 text-muted-foreground" />
            <span>{assignment.truck_detail.plate}</span>
          </CardDescription>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="text-red-500 p-2">
              <Trash className="w-2 h-2" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this assignment (
                {assignment.driver_detail.name} - {assignment.date}).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(assignment.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        <Calendar className="w-4 h-4 text-muted-foreground" />
        <Badge variant="outline" className="font-light">
          {assignment.date}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default AssignmentCard;

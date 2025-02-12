import React from "react";
import { Link } from "react-router-dom";
import { Truck, Trash, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TruckType } from "@/types";

interface TruckCardProps {
  truck: TruckType;
  onDelete: (id: number) => void;
}

const TruckCard: React.FC<TruckCardProps> = ({ truck, onDelete }) => {
  return (
    <Card className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10">
      <CardHeader className="flex justify-between flex-row space-y-0 items-center">
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-muted-foreground" />
          <span>Truck Plate: {truck.plate}</span>
          <Button variant="ghost" className="p-2">
            <Link to={`/truck/edit/${truck.id}`}>
              <Pencil className="w-2 h-2 text-muted-foreground" />
            </Link>
          </Button>
        </CardTitle>
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
                This action cannot be undone. This will permanently delete this truck ({truck.plate}).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(truck.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          Minimum License: 
          <Badge variant="secondary">
            {truck.minimum_license_required}
          </Badge>
        </p>
      </CardContent>
    </Card>
  );
};

export default TruckCard;
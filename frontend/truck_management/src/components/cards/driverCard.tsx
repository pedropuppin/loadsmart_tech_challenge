// DriverCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { User, Trash, Pencil } from "lucide-react";
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
import { Driver } from "@/types";

interface DriverCardProps {
  driver: Driver;
  onDelete: (id: number) => void;
}
const DriverCard: React.FC<DriverCardProps> = ({ driver, onDelete }) => {
  return (
    <Card className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10">
      <CardHeader className="flex justify-between flex-row space-y-0 items-center">
        <CardTitle className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          {driver.name}
          <Button variant="ghost" className="p-2">
            <Link to={`/driver/edit/${driver.id}`}>
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
                This action cannot be undone. This will permanently delete this driver ({driver.name}).
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(driver.id)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          License: <Badge variant="secondary">{driver.license_type}</Badge>
        </p>
      </CardContent>
    </Card>
  );
};

export default DriverCard;

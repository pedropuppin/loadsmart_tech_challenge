import React from "react";
import { Link } from "react-router-dom";
import { TruckType } from "@/types";
import { Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface TruckCardProps {
  truck: TruckType;
}

const TruckCard: React.FC<TruckCardProps> = ({ truck }) => {
  return (
    <Card className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10">
      <CardHeader className="flex justify-between flex-row space-y-0 items-center">
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-muted-foreground" />
          <span>Truck Plate: {truck.plate}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          Minimum License: 
          <Badge variant="secondary">
            {truck.minimum_license_required}
          </Badge>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
            Assignments: <strong>{truck.assignments_count || 0}</strong>
        </span>
        <Link to={`/trucks/${truck.id}`}>
          <Button variant="outline">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TruckCard;
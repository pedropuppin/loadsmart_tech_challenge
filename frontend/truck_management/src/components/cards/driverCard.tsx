// DriverCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter
 } from "@/components/ui/card";
import { Driver } from "@/types";


interface DriverCardProps {
  driver: Driver;
}

const DriverCard: React.FC<DriverCardProps> = ({ driver }) => {
  return (
    <Card className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10">
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          {driver.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          License: <Badge variant="secondary">{driver.license_type}</Badge>
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="text-sm text-muted-foreground">
          Assignments: <strong>{driver.assignments_count || 0}</strong>
        </span>
        <Link to={`/drivers/${driver.id}`}>
          <Button variant="outline">
            Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DriverCard;

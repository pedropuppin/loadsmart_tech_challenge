import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck } from "lucide-react"

interface Truck {
  id: number;
  plate: string;
  minimum_license_required: string;
}

const TruckList: React.FC = () => {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  
  useEffect(() => {
    api.get('trucks/')
      .then(response => setTrucks(response.data))
      .catch(error => console.error("Error fetching drivers:", error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Trucks</h2>
      
      <Button variant="outline">
        <Link to="/trucks/new">Add Truck</Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {trucks.map(truck => (
          <Card
            key={truck.id}
            className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span>Truck Plate: {truck.plate}</span>
              </CardTitle>
              <CardDescription>
                {/* You can add other details here, like date added or truck status */}
              </CardDescription>
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
        ))}
      </div>
    </div>
  );
};

export default TruckList;

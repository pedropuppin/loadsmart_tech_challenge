import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User } from "lucide-react"

interface Driver {
  id: number;
  name: string;
  license_type: string;
}

const DriverList: React.FC = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    api.get('drivers/')
      .then(response => {
        //console.log("Fetched drivers:", response.data);
        setDrivers(response.data)
      })
      .catch(error => console.error("Error fetching drivers:", error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Drivers</h2>
      
      <Button variant="outline">
        <Link to="/drivers/new">Add Driver</Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {drivers.map(driver => (
          <Card
            key={driver.id}
            className="
              shadow-sm 
              transition-all 
              hover:shadow-md 
              hover:bg-secondary/10
            "
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{driver.name}</span>
              </CardTitle>
              <CardDescription>
                {/* You can add optional info here, e.g. date or status */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                License: 
                <Badge variant="secondary">
                  {driver.license_type}
                </Badge>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DriverList;

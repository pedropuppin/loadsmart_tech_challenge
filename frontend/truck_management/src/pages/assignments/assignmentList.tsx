import React, { useEffect, useState } from 'react';
import api from '../../services/api'; 
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, User, Calendar } from "lucide-react"

interface Assignment {
  id: number;
  driver: {
    id: number;
    name: string;
    license_type: string;
  };
  truck: {
    id: number;
    plate: string;
    minimum_license_required: string;
  };
  date: string;
}

const AssignmentList: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  
  useEffect(() => {
    api.get('assignments/')
      .then(response => {
        //console.log("Fetched assignment:", response.data);
        setAssignments(response.data)
      })
      .catch(error => console.error("Error fetching drivers:", error));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Assignments</h2>
      
      <Button variant="outline">
        <Link to="/assignments/new">Add Assignment</Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {assignments.map(assignment => (
          <Card
            key={assignment.id}
            className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="font-semibold">{assignment.driver.name}</span>
                <Badge variant="secondary">
                  {assignment.driver.license_type}
                </Badge>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span>{assignment.truck.plate}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <Badge variant="outline" className="font-light">
                {assignment.date}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssignmentList;

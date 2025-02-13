import React from "react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const Dashboard: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-center">
      {/* Project Title */}
      <h1 className="text-4xl font-bold mb-4">Welcome to Fleet Management</h1>
      
      {/* Description */}
      <p className="text-lg text-muted-foreground mb-6">
        A simple application that lets you manage drivers, trucks, and assignments.
        It provides a REST API built with Django and Django REST Framework, and a 
        React-based front end. Quickly view, create, and modify the resources 
        you need for your fleet operations.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/drivers">
          <Button variant="outline">View Drivers</Button>
        </Link>
        <Link to="/trucks">
          <Button variant="outline">View Trucks</Button>
        </Link>
        <Link to="/assignments">
          <Button variant="outline">View Assignments</Button>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard

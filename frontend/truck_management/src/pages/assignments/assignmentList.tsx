import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Assignment, PaginatedResponse } from "@/types"
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Truck, User, Calendar, Trash } from "lucide-react"
import { getPagesToShow } from "@/utils/pagination"

const PAGE_SIZE = 15

const AssignmentList: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  useEffect(() => {
    // Build the URL with the current page
    const url = `assignments/?page=${page}`
    api
      .get<PaginatedResponse<Assignment>>(url)
      .then((response) => {
        setAssignments(response.data.results)
        setTotalCount(response.data.count)
      })
      .catch((error) => console.error("Error fetching assignments:", error))
  }, [page])

  // Helper to set the page, ensuring it's within valid bounds
  const goToPage = (targetPage: number) => {
    if (targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage)
    }
  }

  // Compute which pages to display (with ellipses)
  const pagesToShow = getPagesToShow(page, totalPages)
  
  const handleDelete = async (assignmentId: number) => {
    try {
      await api.delete(`assignments/${assignmentId}/`);
      toast.success("Assignment deleted successfully!");
      setAssignments(assignments.filter((assignment) => assignment.id !== assignmentId));
      setTotalCount(totalCount - 1);
    } catch (error) {
      console.error("Error deleting assignment:", error);
      toast.error("Failed to delete assignment. Try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title and total count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
        Assignments{" "}
          <span className="text-base text-muted-foreground">({totalCount})</span>
        </h2>
        <Button variant="outline">
          <Link to="/assignments/new">Add Assignment</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {assignments.map(assignment => (
          <Card
            key={assignment.id}
            className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10"
          >
            <CardHeader className="flex justify-between flex-row space-y-0 items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="font-semibold">{assignment.driver_detail.name}</span>
                  <Badge variant="secondary">
                    {assignment.driver_detail.license_type}
                  </Badge>
                </CardTitle>
                <CardDescription className="flex items-center gap-2 mt-2">
                  <Truck className="w-4 h-4 text-muted-foreground" />
                  <span>{assignment.truck_detail.plate}</span>
                </CardDescription>
              </div>
              <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" className="text-red-500 p-2">
                      <Trash className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete 
                        this assignment ({assignment.driver_detail.name} - {assignment.date}).
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(assignment.id)}
                      >
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
        ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  goToPage(page - 1)
                }}
                disabled={page <= 1}
              />
            </PaginationItem>

            {/* Pages */}
            {pagesToShow.map((pg, index) => {
              if (pg === -1) {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              return (
                <PaginationItem key={pg}>
                  <PaginationLink
                    href="#"
                    isActive={pg === page}
                    onClick={(e) => {
                      e.preventDefault()
                      goToPage(pg)
                    }}
                  >
                    {pg}
                  </PaginationLink>
                </PaginationItem>
              )
            })}

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  goToPage(page + 1)
                }}
                disabled={page >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default AssignmentList;

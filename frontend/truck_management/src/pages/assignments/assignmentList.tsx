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
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Badge } from "@/components/ui/badge"
import { Truck, User, Calendar } from "lucide-react"
import { getPagesToShow } from "@/utils/pagination"


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

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

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

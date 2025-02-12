import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { TruckType, PaginatedResponse } from "@/types"
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Truck, Trash } from "lucide-react"
import { getPagesToShow } from "@/utils/pagination"

const PAGE_SIZE = 15

const TruckList: React.FC = () => {
  const [trucks, setTrucks] = useState<TruckType[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [page, setPage] = useState<number>(1) // current page number
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  // Fetch data whenever "page" changes
  useEffect(() => {
    const url = `trucks/?page=${page}`
    api
      .get<PaginatedResponse<TruckType>>(url)
      .then((response) => {
        setTrucks(response.data.results)
        setTotalCount(response.data.count)
      })
      .catch((error) => console.error("Error fetching trucks:", error))
  }, [page])

  // Utility to set the page safely
  const goToPage = (targetPage: number) => {
    if (targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage)
    }
  }

  // Determine which pages to show (with ellipses)
  const pagesToShow = getPagesToShow(page, totalPages)
  
  const handleDelete = async (truckId: number) => {
    try {
      await api.delete(`trucks/${truckId}/`);
      toast.success("Truck deleted successfully!");
      setTrucks(trucks.filter((truck) => truck.id !== truckId));
      setTotalCount(totalCount - 1);
    } catch (error) {
      console.error("Error deleting truck:", error);
      toast.error("Failed to delete truck. Try again.");
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title and total count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Trucks{" "}
          <span className="text-base text-muted-foreground">({totalCount})</span>
        </h2>
        <Button variant="outline">
          <Link to="/trucks/new">Add Truck</Link>
        </Button>
      </div>
      
      {/* Trucks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {trucks.map(truck => (
          <Card
            key={truck.id}
            className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10"
          >
            <CardHeader className="flex justify-between flex-row space-y-0 items-center">
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-muted-foreground" />
                <span>Truck Plate: {truck.plate}</span>
              </CardTitle>
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
                      This action cannot be undone. This will permanently delete this truck ({truck.plate}).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(truck.id)}
                    >
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

export default TruckList;

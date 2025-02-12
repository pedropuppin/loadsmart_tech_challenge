import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Driver, PaginatedResponse } from "@/types"
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { User } from "lucide-react"
import { getPagesToShow } from "@/utils/pagination"

const PAGE_SIZE = 15

const DriverList: React.FC = () => {
  // Data and pagination state
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [totalCount, setTotalCount] = useState(0)

  const [page, setPage] = useState(1) // current page number
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  useEffect(() => {
    // Build the URL from the current page
    const url = `drivers/?page=${page}`
    api.get<PaginatedResponse<Driver>>(url)
      .then((response) => {
        setDrivers(response.data.results)
        setTotalCount(response.data.count)
      })
      .catch((error) => console.error("Error fetching drivers:", error))
  }, [page])

  const goToPage = (targetPage: number) => {
    if (targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage)
    }
  }

  const pagesToShow = getPagesToShow(page, totalPages)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title & Count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Drivers{" "}
          <span className="text-base text-muted-foreground">
            ({totalCount})
          </span>
        </h2>
        <Button variant="outline">
          <Link to="/drivers/new">Add Driver</Link>
        </Button>
      </div>

      {/* Driver Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {drivers.map((driver) => (
          <Card
            key={driver.id}
            className="shadow-sm transition-all hover:shadow-md hover:bg-secondary/10"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                {driver.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                License: 
                <Badge variant="secondary">{driver.license_type}</Badge>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
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

            {pagesToShow.map((pg, index) => {
              // If pg is -1, we render an ellipsis
              if (pg === -1) {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              // Otherwise, render a page link
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

export default DriverList;
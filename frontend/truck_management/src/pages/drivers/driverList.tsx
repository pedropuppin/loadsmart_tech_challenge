import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Driver, PaginatedResponse } from "@/types"
import { Link } from 'react-router-dom';
import DriverCard from "@/components/cards/driverCard";
import PaginationWrapper from "@/components/paginationWrapper";
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

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
  
  const handleDelete = async (driverId: number) => {
    try {
      await api.delete(`drivers/${driverId}/`);
      toast.success("Driver deleted successfully!");
      setDrivers(drivers.filter((driver) => driver.id !== driverId));
      setTotalCount(totalCount - 1);
    } catch (error) {
      console.error("Error deleting driver:", error);
      toast.error("Failed to delete driver. Try again.");
    }
  };

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
          <DriverCard key={driver.id} driver={driver} onDelete={handleDelete} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <PaginationWrapper
          currentPage={page}
          totalPages={totalPages}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

export default DriverList;
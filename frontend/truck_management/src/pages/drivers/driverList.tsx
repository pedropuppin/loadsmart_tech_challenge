import React, { useState } from 'react';
import { Driver } from "@/types"
import { Link } from 'react-router-dom';
import DriverCard from "@/components/cards/driverCard";
import usePaginatedData from '@/hooks/usePaginatedData';
import PaginationWrapper from "@/components/layout/paginationWrapper";
import CardGrid from '@/components/layout/cardGrid';
import { Button } from "@/components/ui/button"

const PAGE_SIZE = 12

const DriverList: React.FC = () => {
  // Data and pagination state
  const [page, setPage] = useState(1) // current page number
  const { data: drivers, totalCount } = usePaginatedData<Driver>("drivers/", page);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  const goToPage = (targetPage: number) => {
    if (targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage)
    }
  }

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
          <Link to="/drivers/new">
            <Button variant="outline">Add Driver</Button>
          </Link>
      </div>
      
      {/* Driver Grid */}
      {drivers.length > 0 ? (
        <>
          <CardGrid>
            {drivers.map((driver) => (
              <DriverCard key={driver.id} driver={driver} />
            ))}
          </CardGrid>
          
          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <PaginationWrapper
              currentPage={page}
              totalPages={totalPages}
              onPageChange={goToPage}
            />
          </div>
        </>
      ) : (
        <p className="mt-5 text-center text-muted-foreground">No drivers found.</p>
      )}
    </div>
  );
};

export default DriverList;
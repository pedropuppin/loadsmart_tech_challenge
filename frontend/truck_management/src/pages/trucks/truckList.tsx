import React, { useState } from 'react';
import { TruckType} from "@/types"
import { Link } from 'react-router-dom';
import TruckCard from '@/components/cards/truckCard';
import usePaginatedData from '@/hooks/usePaginatedData';
import PaginationWrapper from "@/components/layout/paginationWrapper";
import { Button } from '../../components/ui/button';

const PAGE_SIZE = 12

const TruckList: React.FC = () => {
  const [page, setPage] = useState<number>(1) // current page number
  const { data: trucks, totalCount } = usePaginatedData<TruckType>("trucks/", page);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  // Utility to set the page safely
  const goToPage = (targetPage: number) => {
    if (targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage)
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title and total count */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Trucks{" "}
          <span className="text-base text-muted-foreground">({totalCount})</span>
        </h2>
          <Link to="/trucks/new">
            <Button variant="outline">Add Truck</Button>
          </Link>
      </div>
      
      {/* Trucks Grid */}
      {trucks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
          {trucks.map(truck => (
            <TruckCard key={truck.id} truck={truck}/>
          ))}
        </div>
      ) : (
        <p className="mt-5text-center text-muted-foreground">No trucks found.</p>
      )}
      
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

export default TruckList;

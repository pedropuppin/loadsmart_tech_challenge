import React, { useState } from 'react';
import api from '../../services/api';
import { Assignment } from "@/types"
import { Link } from 'react-router-dom';
import AssignmentCard from '@/components/cards/assignmentCard';
import usePaginatedData from '@/hooks/usePaginatedData';
import PaginationWrapper from "@/components/layout/paginationWrapper";
import CardGrid from '@/components/layout/cardGrid';
import { Button } from '../../components/ui/button';
import { toast } from "sonner"

const PAGE_SIZE = 12

const AssignmentList: React.FC = () => {
  const [page, setPage] = useState(1)
  const { data: assignments, totalCount, refetch } = usePaginatedData<Assignment>("assignments/", page);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalCount / PAGE_SIZE)

  // Helper to set the page, ensuring it's within valid bounds
  const goToPage = (targetPage: number) => {
    if (targetPage > 0 && targetPage <= totalPages) {
      setPage(targetPage)
    }
  }
  
  const handleDelete = async (assignmentId: number) => {
    try {
      await api.delete(`assignments/${assignmentId}/`);
      toast.success("Assignment deleted successfully!");
      refetch();
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
        <Link to="/assignments/new">
          <Button variant="outline">Add Assignment</Button>
        </Link>
      </div>
      
      {assignments.length > 0 ? (
        <>
          <CardGrid>
            {assignments.map((assignment) => (
              <AssignmentCard key={assignment.id} assignment={assignment} onDelete={handleDelete} />
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
        <p className="mt-5 text-center text-muted-foreground">No assignments found.</p>
      )}
    </div>
  );
};

export default AssignmentList;

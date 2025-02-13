import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { Assignment, PaginatedResponse } from "@/types"
import { Link } from 'react-router-dom';
import AssignmentCard from '@/components/cards/assignmentCard';
import PaginationWrapper from "@/components/paginationWrapper";
import { Button } from '../../components/ui/button';
import { toast } from "sonner"

const PAGE_SIZE = 12

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} onDelete={handleDelete} />
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

export default AssignmentList;

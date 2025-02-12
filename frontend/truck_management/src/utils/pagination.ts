/**
 * getPagesToShow returns an array of page numbers (and -1 for ellipses).
 * e.g. [1, -1, 3, 4, 5, -1, 10]
 */
export function getPagesToShow(currentPage: number, totalPages: number): number[] {
  const pages: number[] = []
  
  // If there aren't many pages, show them all
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  // Always show the first page
  pages.push(1)

  // If the current page is far from the start, show an ellipsis
  if (currentPage > 3) {
    pages.push(-1)
  }

  // One page before current, if valid
  if (currentPage - 1 > 1) {
    pages.push(currentPage - 1)
  }

  // Current page (if not first/last)
  if (currentPage !== 1 && currentPage !== totalPages) {
    pages.push(currentPage)
  }

  // One page after current, if valid
  if (currentPage + 1 < totalPages) {
    pages.push(currentPage + 1)
  }

  // Ellipsis if we’re far from the end
  if (currentPage < totalPages - 2) {
    pages.push(-1)
  }

  // Always show the last page
  pages.push(totalPages)

  return pages
}

"use client";

import { useEffect, useState } from "react";
import RoadmapItem from "@/components/roadmap/RoadmapItem";
import Button from "@/components/ui/Button";
import {
  getRoadmaps,
  GetRoadmapsOptions,
  PaginationInfo,
} from "../roadmaps/actions/getRoadmaps";
import { SavedRoadmapWithUser } from "@/lib/types";
import LoadingIcon from "@/components/ui/Loader";

export default function Explore() {
  const [roadmaps, setRoadmaps] = useState<SavedRoadmapWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);

  const fetchRoadmaps = async (page: number = currentPage) => {
    setLoading(true);
    setError(null);

    try {
      const options: GetRoadmapsOptions = {
        page,
        limit,
      };

      const result = await getRoadmaps(options);

      if (result.ok && result.roadmaps) {
        setRoadmaps(result.roadmaps);
        setPagination(result.pagination || null);
        setCurrentPage(page);
      } else {
        setError(result.error || "Failed to fetch roadmaps");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);

      try {
        const options: GetRoadmapsOptions = {
          page: 1,
          limit,
        };

        const result = await getRoadmaps(options);

        if (result.ok && result.roadmaps) {
          setRoadmaps(result.roadmaps);
          setPagination(result.pagination || null);
          setCurrentPage(1);
        } else {
          setError(result.error || "Failed to fetch roadmaps");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [limit]);

  const handlePageChange = (newPage: number) => {
    if (pagination && newPage >= 1 && newPage <= pagination.totalPages) {
      fetchRoadmaps(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingIcon text="Loading roadmaps..." />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-amber-900 dark:text-amber-100">
          Explore Trunk Tracks
        </h1>
        <p className="text-amber-800/70 dark:text-amber-200/70">
          Discover learning roadmaps created by the community
        </p>
      </div>

      {error && (
        <div className="py-16 text-center">
          <p className="mb-4 text-red-600 dark:text-red-400">Error: {error}</p>
          <Button variant="outline" onClick={() => fetchRoadmaps(currentPage)}>
            Try Again
          </Button>
        </div>
      )}

      {!loading && !error && (
        <>
          {roadmaps.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-amber-700 dark:text-amber-300">
                No roadmaps found. Be the first to create one!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {roadmaps.map((roadmap) => (
                  <RoadmapItem
                    key={roadmap.id}
                    roadmap={roadmap}
                    user={roadmap.user || undefined}
                  />
                ))}
              </div>

              {pagination && pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={!pagination.hasPrev}
                  >
                    Previous
                  </Button>

                  <div className="flex items-center space-x-2">
                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        let pageNum: number;

                        if (pagination.totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= pagination.totalPages - 2) {
                          pageNum = pagination.totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }

                        return (
                          <Button
                            key={pageNum}
                            variant={
                              currentPage === pageNum ? "primary" : "outline"
                            }
                            size="sm"
                            onClick={() => handlePageChange(pageNum)}
                            className="h-10 w-10 justify-center"
                          >
                            {pageNum}
                          </Button>
                        );
                      },
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={!pagination.hasNext}
                  >
                    Next
                  </Button>
                </div>
              )}

              {pagination && (
                <div className="mt-6 text-center text-sm text-amber-700 dark:text-amber-300">
                  Showing {roadmaps.length} of {pagination.total} roadmaps
                  {pagination.totalPages > 1 &&
                    ` (Page ${currentPage} of ${pagination.totalPages})`}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

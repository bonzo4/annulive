"use client";

import { useEffect, useState } from "react";
import RoadmapItem from "@/components/roadmap/RoadmapItem";
import Button from "@/components/ui/Button";
import Pagination, {
  PaginationInfo as PaginationInfoComponent,
} from "@/components/ui/Pagination";
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
          Explore Roadmaps
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

              {pagination && (
                <>
                  <Pagination
                    pagination={pagination}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    className="mt-12"
                  />

                  <PaginationInfoComponent
                    currentItems={roadmaps.length}
                    total={pagination.total}
                    currentPage={currentPage}
                    totalPages={pagination.totalPages}
                    className="mt-6"
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

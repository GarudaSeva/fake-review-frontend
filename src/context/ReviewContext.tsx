import React, { createContext, useContext, useState, ReactNode } from "react";
import { Review } from "@/data/mockData";
import { reviews as initialReviews } from "@/data/mockData";

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Review) => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const addReview = (review: Review) => setReviews(prev => [review, ...prev]);

  return (
    <ReviewContext.Provider value={{ reviews, addReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) throw new Error("useReviews must be used within ReviewProvider");
  return context;
}

import { ApiError } from "@/types/api";

// Custom hook for handling API errors in the Pokémon application
export const useErrorHandling = (
  listError: ApiError | null,
  detailsError: ApiError | null,
  searchQuery: string,
) => {
  // Function to generate appropriate error messages based on API responses
  const getErrorMessage = () => {
    if (listError || detailsError) {
      const error = listError || detailsError;

      // Provide a specific message for 404 errors (Pokémon not found)
      // Otherwise, display a generic error message
      return error?.status === 404
        ? `Pokémon "${searchQuery}" not found. Please try a different name or ID.`
        : "An error occurred while fetching data. Please try again later.";
    }

    return null;
  };

  return { getErrorMessage };
};

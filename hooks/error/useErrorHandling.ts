import { ApiError } from "@/types/api";

export const useErrorHandling = (
  listError: ApiError | null,
  detailsError: ApiError | null,
  searchQuery: string,
) => {
  const getErrorMessage = () => {
    if (listError || detailsError) {
      const error = listError || detailsError;

      return error?.status === 404
        ? `Pokémon "${searchQuery}" not found. Please try a different name or ID.`
        : "An error occurred while fetching data. Please try again later.";
    }

    return null;
  };

  return { getErrorMessage };
};

import { useQuery } from "@tanstack/react-query";
import { fetchPetAPI } from "../api/apiPets";

export function usePet() {
  const {
    isLoading,
    data: pet,
    error,
  } = useQuery({
    queryKey: ["pet"],
    queryFn: () => fetchPetAPI(),
  });
  // console.log(pet);
  return { isLoading, pet, error };
}

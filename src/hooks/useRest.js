import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restAPI } from "../api/apiPets";

export function useRest() {
  const queryClient = useQueryClient();
  const { isLoading: isResting, mutate: rest } = useMutation({
    mutationFn: restAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pet"],
      });
    },
  });
  return { isResting, rest };
}

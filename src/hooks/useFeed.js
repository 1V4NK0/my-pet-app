import { useMutation, useQueryClient } from "@tanstack/react-query";
import { feedAPI } from "../api/apiPets";

export function useFeed() {
  const queryClient = useQueryClient();
  const { isLoading: isFeeding, mutate: feed } = useMutation({
    mutationFn: feedAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pet"],
      });
    },
  });
  return { isFeeding, feed };
}

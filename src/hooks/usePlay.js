import { useMutation, useQueryClient } from "@tanstack/react-query";
import { playAPI } from "../api/apiPets";

export function usePlay() {
  const queryClient = useQueryClient();
  const { isLoading: isPlaying, mutate: playWithPet } = useMutation({
    mutationFn: playAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pet"],
      });
    },
  });
  return { isPlaying, playWithPet };
}

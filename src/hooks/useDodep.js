import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dodep as dodepService } from "../api/apiPets";

export function useDodep() {
  const queryClient = useQueryClient();

  const { mutate: dodep } = useMutation({
    mutationFn: (amount) => dodepService(amount),
    onSuccess: () => {
      queryClient.invalidateQueries(["pet"]);
    },
    onError: (err) => console.error("fail: " + err),
  });

  return { dodep };
}

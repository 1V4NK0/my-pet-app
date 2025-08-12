import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeNameAPI } from "../api/apiPets";

export function useChangeName() {
  const queryClient = useQueryClient();
  const { isLoading: isChangingName, mutate: changeName } = useMutation({
    mutationFn: (newName) => changeNameAPI(newName),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["pet"],
      });
    },
  });
  return { isChangingName, changeName };
}

import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../utility/axios";

const deleteFn = (data) => {
  return axiosInstance.delete(`/manage/users/${data._id}`);
};

export const useDeleteUser = () => {
  let queryClient = useQueryClient();

  return useMutation(deleteFn, {
    onMutate: async (newTodo) => {
      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["user-data"]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    // onSuccess: (data) => {
    //   // console.log(data);
    //   queryClient.invalidateQueries("user-data");
    // },
    // onSettled: (newData, error, { id }) => {

    //   queryClient.invalidateQueries("user-data");
    // },
  });
};

import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosInstance } from "../../utility/axios";

const updateFn = (data) => {
  // console.log(data);
  // console.log(`/manage/users/${data._id}`);
  return axiosInstance.patch(`/manage/users/${data._id}`, data);
};

export const useUpdateUser = () => {
  let queryClient = useQueryClient();
  return useMutation(updateFn, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("user-data");
      //   queryClient.setQueryData("user-data", (oldUserData) => {
      //     let updatedResData = data.data.data.updatedUserRole;
      //     console.log(data.data.data.updatedUserRole);
      //     console.log(oldUserData);
      //     // return {
      //     //   ...oldUserData,
      //     //   data: [...oldUserData, ...data],
      //     // };
      //     return { ...updatedResData };
      //   });
    },
  });
};

// const deleteFn = (data) => {
//   //   console.log(data);
//   //   console.log(`/manage/users/${data._id}`);
//   return axios.delete(`/manage/users/${data._id}`);
// };

// export const useDeleteUser = useMutation(deleteFn, {
//   onSuccess: (data) => {
//     queryClient.invalidateQueries("user-data");
//   },
// });

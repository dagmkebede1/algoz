import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useEffect } from "react";
import { axiosInstance } from "../../utility/axios";
import { useMutation, useQueryClient } from "react-query";

const { Meta } = Card;

const CardTest = ({ course: { title, desc, price, _id } }) => {
  //   const courseDeleteFn = (id) => {
  //     return axiosInstance
  //       .delete("/courses/" + id)
  //       .then((resp) => {
  //         console.log(resp);
  //       })
  //       .catch((err) => {});
  //   };

  const DeleteUser = () => {
    let queryClient = useQueryClient();

    return useMutation(
      (id) => {
        return axiosInstance
          .delete("/courses/" + id)
          .then((resp) => {
            console.log(resp);
          })
          .catch((err) => {});
      },
      {
        onMutate: async (newTodo) => {
          // Snapshot the previous value

          const previousTodos = queryClient.getQueryData(["course"]);
          // Return a context object with the snapshotted value
          return { previousTodos };
        },
        onSuccess: (data) => {
          queryClient.invalidateQueries("course");
        },
      }
    );
  };
  //   const deleteFn = useDeleteUser();

  const handleDelete = (id) => {
    DeleteUser(id);
  };

  //   const mutuateCourse = useMutation((id) => {
  //     return axiosInstance
  //       .delete("/courses/" + id)
  //       .then((resp) => {
  //         console.log(resp);
  //       })
  //       .catch((err) => {});
  //   });

  // return axios.post("/todos", newTodo);
  //   });

  //   const deleteHundler = (id) => {
  //     mutuateCourse(id);
  //     //   useMutation(() => {
  //     //     return axiosInstance
  //     //       .delete("/courses/" + id)
  //     //       .then((resp) => {
  //     //         console.log(resp);
  //     //       })
  //     //       .catch((err) => {});
  //     //   });
  //   };
  return (
    <Card
      hoverable
      style={{
        width: 300,
      }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <a href="">
          <SettingOutlined key="setting" />
        </a>,
        <a href="">
          <EditOutlined key="edit" />
        </a>,
        <button onClick={() => handleDelete(_id)}>
          <EllipsisOutlined key="ellipsis" />,
        </button>,
      ]}
    >
      <Meta
        // avatar={
        //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        // }
        title={title}
        description={desc}
      />
      <p style={{ margin: "10px auto 0 auto" }}>{price} ETB</p>
    </Card>
  );
};
// const CourseCard = ({ title, desc, price, instructor }) => (

//  return <Card
//     hoverable
//     title={title}
//     style={{
//       width: 300,
//     }}
//     cover={
//       <img
//         alt="example"
//         src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
//       />
//     }
//     actions={[
//       <a href="">
//         <SettingOutlined key="setting" />
//       </a>,
//       <a href="">
//         <EditOutlined key="edit" />
//       </a>,
//       <EllipsisOutlined key="ellipsis" />,
//     ]}
//   >
//     <Meta
//       avatar={
//         <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
//       }
//       title={title}
//       description={desc}
//     />
//   </Card>
// );
export default CardTest;

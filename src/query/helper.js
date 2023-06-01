// import io from "socket.io-client";
// import { useQueryClient } from "@tanstack/react-query";

// const socket = io("http://localhost:5000");

// socket.on("connect", () => {
//   console.log("connected to socket.io server test");
// });

// socket.on("message", (data) => {
//   const queryClient = useQueryClient();
//   console.log("ReceivedData", data);
//   queryClient.setQueryData(["totalData"], { data });
// });

// export const socketIoRequestHandler = () => {
//   socket.emit("requestData");
// };

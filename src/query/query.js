import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";

const totalData = (Endpoint) => axios.get(Endpoint);
const post = (EndPoint, data) => axios.post(EndPoint, data);
const edit = (EndPoint, data) => axios.put(EndPoint, data);
const deleteData = (EndPoint, data) => axios.delete(EndPoint, data);

export const useTotalGet = (Endpoint) => {
  //   const states = useQuery(["totalData"], () => axios.get(Endpoint));
  const states = useQuery(["totalData"], () => totalData(Endpoint), {
    // staleTime: 60000,
    // staleTime: Infinity,
    // cacheTime: Infinity,
    // refetchInterval: true,
    // refetchIntervalInBackground: true,
  });
  return states;
};

export const usePost = (Endpoint) => {
  const states = useMutation((data) => post(Endpoint, data));
  return states;
};

export const useEdit = (Endpoint) => {
  const states = useMutation((data) => edit(`${Endpoint}/${data._id}`, data));
  return states;
  // return useMutation((data) => edit(`${Endpoint}/${data._id}`, data));
};

export const useDelete = (EndPoint) => {
  const states = useMutation((id) => deleteData(`${EndPoint}/${id}`));
  return states;
};

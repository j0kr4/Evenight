import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchParty = async () => {
  const res = await axios.get("api/party");
  return res.data;
};
const GetParty = async () => {
  const { isLoading, data } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchParty,
  });
  return { isLoading, data };
};
export default GetParty;

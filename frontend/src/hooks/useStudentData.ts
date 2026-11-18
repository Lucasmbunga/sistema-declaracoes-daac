import { useQuery } from "@tanstack/react-query"
import { studentService } from "../services/studentService"
import { useToken } from "./useToken";
import { decodeJwt } from "../utils/jwt";

export const useStudentData=()=>{
    const token=useToken();
  const userId=decodeJwt(token as string)?.id;
    const query=useQuery({
        queryKey:['student',userId],
        queryFn:async ()=>studentService.getStudentByUserId(userId as number),
        enabled:!!userId
    })

    return{...query}
}
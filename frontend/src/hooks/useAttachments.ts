import { useQuery } from "@tanstack/react-query"
import attachmentsService from "../services/attachmentsService"

const useAttachmentsByRequest=()=>{
    return useQuery({
        queryKey:['attachments-request'],
        queryFn:async ()=>{
            return  (id:number)=>attachmentsService.getAttachmentsByRequest(id)
        }
    })
}

const useAttachments=()=>{
return{useAttachmentsByRequest}
}

export default useAttachments;
import { useMutation } from "@tanstack/react-query"

export const UserMutationHooks =(fnCallback)=>{
    const mutation = useMutation({
        mutationFn: fnCallback
    })
    return mutation
}
import { useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAtom, useAtomValue } from "jotai"
import { getCartItems, postChangeCart } from "../api/cartApi"
import { cartState } from "../atoms/cartState"
import signinState from "../atoms/signinState"

const useCustomCart = () => {
    const [cartItems, setCartItems] = useAtom(cartState)
    const loginState = useAtomValue(signinState)
    const queryClient = useQueryClient()

    const changeMutation = useMutation({
        mutationFn: (param) => postChangeCart(param),
        onSuccess: (result) => {
            setCartItems(result)

            queryClient.setQueryData(['cart', loginState.email], result)
        }
    })

    const query = useQuery({
        queryKey: ['cart', loginState.email],
        queryFn: getCartItems,
        staleTime: 1000 * 60 * 60,
        enabled: !!loginState.email
    })

    useEffect(() => {
        if (query.isSuccess) {
            setCartItems(query.data)
        }
    }, [query.isSuccess, query.data, setCartItems])

    const changeCart = (param) => {
        changeMutation.mutate(param)
    }

    return {cartItems, changeCart}
}

export default useCustomCart
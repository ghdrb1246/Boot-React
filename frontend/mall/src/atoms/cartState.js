import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

export const cartState = atomWithReset([])

export const cartTotalState = atom((get) => {
    const arr = get(cartState)
    const initialValue = 0
    const total = arr.reduce((total, current) => total + current.price * current.qty, initialValue)

    return total
})
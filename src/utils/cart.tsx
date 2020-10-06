import { CartItem } from "types"

export function makeCartJsonBeforeSend(items: {
    [key: string]: CartItem;
}) {
    let extras = [] as {
        ID: number
        QUANTITY: number
        PRODUCTID: number
        PRICE: number
    }[]
    let cart = Object.keys(items).map(x => {
        let item = items[x]
        Object.keys(item.EXTRAS).forEach(e => {
            let ex = item.EXTRAS[e]
            if (ex.QUANTITY > 0) {
                extras.push({
                    ID: ex.ID,
                    PRICE: ex.PRICE,
                    PRODUCTID: item.ID,
                    QUANTITY: ex.QUANTITY
                })
            }
        })
        return {
            PRODUCTID: x,
            QUANTITY: item.quantity.toString()
        }
    })
    return { cart, extras };
}
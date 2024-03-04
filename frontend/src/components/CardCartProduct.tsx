import { BsCartDashFill } from "react-icons/bs";
import formatCurrency from "../utils/formatCurrency";
import { Product } from "../types";

export interface CartItemProps {
    product: Product;
    amount: number;
    onHandleRemoveCartItem: (product: Product) => void;
}

export function CardCartProduct({ product, amount, onHandleRemoveCartItem }: CartItemProps) {

    const totalPrice = product.price * amount;

    return (
        <div className="flex items-start border-b-[1px] pl-5 pr-5 pb-5 mb-5 relative last:border-b-0 top-16">
            <img src={product.imageUrl} className=" w-36 h-24" alt="image product" />
            <div className=" pt-0 pr-[35px] pb-0 pl-10px ml-8">
                <h3 className="text-xs font-bold opacity-50 mb-2">{product.name}</h3>
                <h3 className="text-2xl font-bold">{formatCurrency(totalPrice)}</h3>
                <div className="flex flex-row flex-nowrap items-center gap-4">
                    <span className="text-black text-sm opacity-80 font-semibold text-center">{amount}x {formatCurrency(product.price)}</span>
                </div>
                <BsCartDashFill
                    className="absolute top-0 right-10 text-red-600 opacity-80 hover:opacity-100 text-2xl hover:cursor-pointer transition duration-200"
                    onClick={() => onHandleRemoveCartItem(product)}
                />
            </div>
        </div>
    )
}
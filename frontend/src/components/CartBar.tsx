import { CartItem } from "../types";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import formatCurrency from "../utils/formatCurrency";


interface CartBarProps {
    cartItems: CartItem[];
    onHandleOpenCartModal: () => void;
}

export function CartBar({ cartItems, onHandleOpenCartModal }: CartBarProps) {

    const totalValue = cartItems.reduce((acc, item) => {
        return item.product.price * item.amount + acc;
    }, 0);

    return (
        <div
            onClick={() => onHandleOpenCartModal()}
            className="bg-red-700 hover:cursor-pointer hover:bg-red-600 h-[70px] flex flex-row flex-wrap justify-around items-center fixed bottom-0 w-full">
            <div>
                <MdOutlineShoppingCartCheckout className="text-4xl text-white" />
            </div>
            <div>
                <span className="text-white text-sm">Fechar Pedido</span>
            </div>
            <div className="text-white text-2xl">
                {formatCurrency(totalValue)}
            </div>
        </div>
    )
}
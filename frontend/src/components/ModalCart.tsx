import { IoClose } from "react-icons/io5";
import { CartItem, Product } from "../types";
import formatCurrency from "../utils/formatCurrency";
import { CardCartProduct } from "./CardCartProduct";

interface CartProps {
    cartItems: CartItem[];
    amount: number;
    onHandleRemoveCartItem: (product: Product) => void;
    onHandleCloseModalCart: () => void;
    onHandleOpenModalClient: () => void;
}

export function ModalCart({ cartItems, onHandleCloseModalCart, onHandleOpenModalClient, onHandleRemoveCartItem }: CartProps) {

    const totalValue = cartItems.reduce((acc, item) => {
        return item.product.price * item.amount + acc;
    }, 0);

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[28rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[600px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Itens no Carrinho</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalCart}
                        />
                    </div>
                    <div className="flex-grow overflow-auto h-[457px] absolute right-0 left-0 top-16">
                        {cartItems.map((cartItem, index) => (
                            <CardCartProduct
                                key={index}
                                product={cartItem.product}
                                amount={cartItem.amount}
                                onHandleRemoveCartItem={onHandleRemoveCartItem}
                            />
                        ))}
                    </div>
                    <div className="h-16 bg-red-900 flex flex-row justify-around items-center absolute w-full bottom-0">
                        <div className="flex flex-row flex-nowrap items-center gap-4">
                            <span className="text-xs text-white">TOTAL :<span className="font-bold text-xl"> {formatCurrency(totalValue)}</span></span>
                        </div>
                        <button
                            onClick={onHandleOpenModalClient}
                            className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 rounded-md text-white font-medium text-sm tracking-wider transition"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
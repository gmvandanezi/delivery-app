import { FormEvent } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import formatCurrency from "../utils/formatCurrency";
import { Product } from "../types";

interface ModalAddProductOnCartProps {
    product: Product;
    amount: number;
    onAddAmount: (e: FormEvent) => void
    onRemoveAmount: (e: FormEvent) => void
    onHandleAddToCart: (product: Product) => void;
    onHandleCloseModalAddProductOnCart: () => void;
}

export function ModalAddProductOnCart({ product, amount, onAddAmount, onRemoveAmount, onHandleAddToCart, onHandleCloseModalAddProductOnCart }: ModalAddProductOnCartProps) {

    const totalPrice = product.price * amount;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[28rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[600px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Adicionar Produto no Carrinho</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalAddProductOnCart}
                        />
                    </div>
                    <div className="flex flex-col gap-2 justify-between p-2 sm:p-12">
                        <div className="p-1 flex flex-col h-[9rem] relative top-16">
                            <h2 className="font-semibold text-1xl text-orange-500 overflow-ellipsis absolute top-0 overflow-hidden whitespace-nowrap">{product.name}</h2>
                            <span className="text-sm font-normal absolute top-7 overflow-scroll h-20">{product.description}</span>
                        </div>
                        <div className="p-2 flex flex-col flex-wrap items-center justify-between gap-4">
                            <span className="font-bold text-3xl text-orange-500 flex-1">{formatCurrency(product.price)}</span>
                            <img src={product.imageUrl} className="max-w-full h-[230px]" />
                        </div>
                    </div>
                    <div className="h-16 bg-red-900 flex flex-row justify-around items-center absolute w-full bottom-0">
                        <div className="flex flex-row flex-nowrap items-center gap-4">
                            <button onClick={onRemoveAmount}>
                                {amount === 1 ? (
                                    <GrSubtractCircle className="hover:cursor-not-allowed size-7 text-whiteopacity-20 text-white opacity-20" />
                                ) : (
                                    <GrSubtractCircle className="hover:cursor-pointer size-7 text-white hover:text-yellow-500 transition duration-300" />
                                )}

                            </button>
                            <span className="text-white text-2xl w-7 text-center">{amount}</span>
                            <button onClick={onAddAmount}>
                                <GrAddCircle className="hover:cursor-pointer size-7 text-white  hover:text-yellow-500 transition duration-300" />
                            </button>
                        </div>
                        <button
                            onClick={() => onHandleAddToCart(product)}
                            className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 rounded-md text-white 
                            font-medium tracking-wider transition duration-300 
                            flex flex-row flex-nowrap items-center gap-2 w-[170px]"
                        >
                            <FaCartPlus className="size-6" />
                            <span className="text-[12px] box-content flex-1">{formatCurrency(totalPrice)}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
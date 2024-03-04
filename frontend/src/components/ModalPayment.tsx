import { IoClose } from "react-icons/io5";
import { FaMoneyBillWave, FaRegCreditCard } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";

interface ModalSelectAddressProps {
    payment: string;
    setPayment: (payment: string) => void;
    onHandleCloseModalPayment: () => void;
    onHandleOpenModalResume: () => void;
}

export function ModalPayment({
    payment,
    setPayment,
    onHandleCloseModalPayment,
    onHandleOpenModalResume
}: ModalSelectAddressProps) {

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[32rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[500px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Selecione a Forma de Pagamento</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalPayment}
                        />
                    </div>
                    <div className="overflow-scroll">
                        <ul className="flex flex-col flex-nowrap w-full h-[350px] gap-6 absolute top-20 items-center justify-center">
                            <li className="flex flex-col flex-wrap justify-around h-20 w-full text-center hover:bg-slate-300 hover:cursor-pointer"
                                onClick={() => setPayment("dinheiro")}>
                                <div className="flex flex-col flex-wrap items-center justify-center">
                                    <FaMoneyBillWave className="text-2xl align-middle" />
                                    <span>Dinheiro</span>
                                </div>
                            </li>
                            <li className="flex flex-col flex-wrap justify-around h-20 w-full text-center hover:bg-slate-300 hover:cursor-pointer"
                                onClick={() => setPayment("pix")}>
                                <div className="flex flex-col flex-wrap items-center justify-center">
                                    <FaPix className="text-2xl align-middle" />
                                    <span>Pix</span>
                                </div>
                            </li>
                            <li className="flex flex-col flex-wrap justify-around h-20 w-full text-center hover:bg-slate-300 hover:cursor-pointer"
                                onClick={() => setPayment("cartao")}>
                                <div className="flex flex-col flex-wrap items-center justify-center">
                                    <FaRegCreditCard className="text-2xl align-middle" />
                                    <span>Cartão</span>
                                </div>
                            </li>
                        </ul>
                        <span className="absolute bottom-2 left-2">Forma de pagamento selecionada: {payment}</span>
                        <div>
                            <button
                                onClick={onHandleOpenModalResume}
                                className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 rounded-md text-white font-medium absolute bottom-8 right-4 tracking-wider transition"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
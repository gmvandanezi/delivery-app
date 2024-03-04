import { IoClose } from "react-icons/io5";
import { Address, CartItem, Client } from "../types";
import formatCurrency from "../utils/formatCurrency";
import { api } from "../lib/axios";

interface ModalResumeProps {
    client: Client;
    setClient: (client: Client | undefined) => void;
    selectedAddress: Address;
    setSelectedAddress: (address: Address | undefined) => void;
    payment: string;
    setPayment: (payment: string) => void;
    cartItems: CartItem[];
    setCartItems: (cartItems: CartItem[]) => void;
    onHandleCloseModalResume: () => void;
}

export function ModalResume({
    client,
    setClient,
    selectedAddress,
    setSelectedAddress,
    payment,
    setPayment,
    cartItems,
    setCartItems,
    onHandleCloseModalResume
}: ModalResumeProps) {

    const totalValue = cartItems.reduce((acc, item) => {
        return item.product.price * item.amount + acc;
    }, 0);

    const productsArray = cartItems.map(item => ({
        productId: item.product.id,
        amount: item.amount
    }));

    async function handleCreateOrder() {
        await api.post("/order", {
            clientId: client.id,
            addressId: selectedAddress.id,
            products: productsArray,
            payment,
            totalValue
        })
        setClient(undefined);
        setCartItems([]);
        setSelectedAddress(undefined);
        setPayment("dinheiro");
        onHandleCloseModalResume();
    }

    const stringItems = cartItems.map((item) => (`*${item.amount}x - ${item.product.name}* *(R$ ${item.product.price})*%0A`));

    const concatenatedString = stringItems.join("\n");

    const mensagemWhatsapp = `*Pizza Delivery*%0A*${client.name} - ${client.phoneNumber}*%0A*${concatenatedString}*%0A*________________________________*%0A*Total: R$ ${totalValue.toFixed()}*%0A*Pagamento em: ${payment} *%0A*Endereço da Entrega*%0A*${selectedAddress.street}* *Número: ${selectedAddress.number}*%0A*Complemento: ${selectedAddress.complement}*%0A*Bairro: ${selectedAddress.neighborhood}*%0A*CEP: ${selectedAddress.cep}*%0A*Cidade: ${selectedAddress.city}*%0A*________________________________*`

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[28rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[600px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Resumo do Pedido</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalResume}
                        />
                    </div>
                    <div>
                        <div className="flex-grow h-[457px] absolute flex flex-col right-10 left-10 top-16 overflow-scroll gap-4">
                            <span className="text-2xl text-orange-600">{client.name}</span>
                            <span className="text-base text-orange-600">{client.phoneNumber}</span>
                            <div className="flex flex-col flex-wrap">
                                <span className="text-sm">{`${selectedAddress.street}, ${selectedAddress.number}`}</span>
                                <span className="text-sm">{selectedAddress.complement}</span>
                                <span className="text-sm">{selectedAddress.neighborhood}</span>
                                <span className="text-sm">{`${selectedAddress.cep} - ${selectedAddress.city} / ${selectedAddress.state}`}</span>
                            </div>
                            <span className="font-bold">Forma de pagamento: {payment}</span>
                            {cartItems.map((item) => (
                                <div key={item.product.id} className="flex flex-col flex-wrap">
                                    <span className="text-sm">{item.product.name}</span>
                                    <span className="font-bold text-xs">{`${item.amount}x ${item.product.price}`}</span>
                                </div>
                            ))}
                        </div>
                        <div className="h-16 bg-red-900 flex flex-row justify-around items-center absolute w-full bottom-0">
                            <div className="flex flex-row flex-nowrap items-center gap-4">
                                <span className="text-xs text-white">TOTAL :<span className="font-bold text-xl"> {formatCurrency(totalValue)}</span></span>
                            </div>
                            <a
                                href={`https://api.whatsapp.com/send?phone=+55${client.phoneNumber}&text=${mensagemWhatsapp}`}
                                target="blank"
                                className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 rounded-md text-white font-medium text-sm tracking-wider transition"
                                onClick={handleCreateOrder}
                            >
                                Finalizar
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
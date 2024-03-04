import { IoClose } from "react-icons/io5";
import { Address, Client } from "../types";
import { ChangeEvent } from "react";
import { api } from "../lib/axios";

interface ModalSelectAddressProps {
    client: Client;
    setSelectedAddress: (address: Address) => void;
    onHandleOpenModalPayment: () => void;
    onHandleOpenModalCreateAddress: () => void;
    onHandleCloseModalSelectAddress: () => void;
}

export function ModalSelectAddress({
    client,
    onHandleOpenModalPayment,
    onHandleCloseModalSelectAddress,
    onHandleOpenModalCreateAddress,
    setSelectedAddress
}: ModalSelectAddressProps) {

    async function handleSelectAddress(id: string) {
        try {
            const result = await api.get(`/address/${id}`)
            setSelectedAddress(result.data.address);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[32rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[500px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Selecione o Endereço</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalSelectAddress}
                        />
                    </div>
                    <select
                        className="w-72px text-sm p-2 absolute top-40 left-10 right-10 shadow-lg border"
                        defaultValue="Retirada no Local"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            handleSelectAddress(e.target.value);
                        }}
                    >
                        <option key={1} value={"Retirada no Local"} className="text-sm p-2">Retirada no Local</option>
                        {client.addresses && client.addresses.map((address) => (
                            <option key={address.id} value={address.id} className="text-sm p-2">
                                {`${address.street}, ${address.number}, ${address.complement}, ${address.neighborhood}, ${address.cep}`}
                            </option>
                        ))}
                    </select>
                    <div>
                        <button
                            onClick={onHandleOpenModalPayment}
                            className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 rounded-md text-white font-medium absolute bottom-4 right-4 tracking-wider transition"
                        >
                            Continuar
                        </button>
                    </div>
                    <span className="text-sm hover:cursor-pointer hover:opacity-75 font-medium absolute bottom-6 left-4" onClick={onHandleOpenModalCreateAddress}>Adicionar um endereço</span>
                </div>
            </div>
        </div>
    );
}
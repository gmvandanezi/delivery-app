import { FormEvent } from "react";
import { IoClose } from "react-icons/io5";
import { Client } from "../types";
import { GrValidate } from "react-icons/gr";
import { GrNext } from "react-icons/gr";

interface ModalClientProps {
    client: Client | undefined;
    clientPhoneNumber: string;
    clientName: string;
    setClientName: (clientName: string) => void;
    setClientPhoneNumber: (clientName: string) => void;
    onHandleUpdateOrCreateClient: (e: FormEvent) => void;
    onHandleFindClientByPhoneNumber: (clientPhoneNumber: string) => void;
    onHandleCloseModalClient: () => void;
    onHandleOpenModalSelectAddress: () => void;
}

export function ModalClient({ client, clientName, setClientName, setClientPhoneNumber, clientPhoneNumber, 
    onHandleOpenModalSelectAddress, onHandleFindClientByPhoneNumber, onHandleCloseModalClient, onHandleUpdateOrCreateClient }: ModalClientProps) {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[32rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[500px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Identifique-se</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalClient}
                        />
                    </div>
                    <form onSubmit={onHandleUpdateOrCreateClient}
                        className="flex flex-col flex-wrap w-full h-[350px] items-center justify-center gap-6 absolute top-20">
                        <input
                            type="text"
                            className="border-b p-2 rounded-md focus:outline-none focus:border-orange-600 focus:border-b-2 transition-colors w-96 shadow-md"
                            minLength={11}
                            maxLength={11}
                            placeholder="Whatsapp *"
                            onChange={(event) => { setClientPhoneNumber(event.target.value.replace(/\D/g, '')) }}
                            onBlur={() => onHandleFindClientByPhoneNumber(clientPhoneNumber)}
                            required
                            value={clientPhoneNumber}
                        />

                        <input
                            type="text"
                            className="border-b p-2 rounded-md focus:outline-none focus:border-orange-600 focus:border-b-2 transition-colors w-96 shadow-md"
                            placeholder="Nome *"
                            value={clientName}
                            required
                            onChange={(event) => setClientName(event.target.value.replace(/^[^a-zA-Z]+|[^a-zA-Z\s]+$/g, ''))}
                            disabled={clientPhoneNumber.length !== 11}
                        />
                        <button
                            type="submit"
                            className={clientPhoneNumber.length === 11 ? "bg-green-600 opacity-80 p-2 rounded-full hover:opacity-100 hover:scale-105 transition duration-300" : "bg-green-600 opacity-50 p-2 rounded-full hover:opacity-80 transition hover:cursor-not-allowed"}
                            disabled={clientPhoneNumber.length !== 11}
                        >
                            <GrValidate className="text-3xl text-white" />
                        </button>
                    </form>
                    {client !== undefined && (
                        <button
                            className={clientPhoneNumber.length === 11 ? "bg-green-600 opacity-80 p-2 rounded-full hover:opacity-100 hover:scale-105 transition duration-300" : "bg-green-600 opacity-50 p-2 rounded-full hover:opacity-80 transition hover:cursor-not-allowed"}
                            disabled={clientPhoneNumber.length !== 11}
                            onClick={onHandleOpenModalSelectAddress}
                        >
                            <GrNext className="text-3xl text-white" />
                        </button>
                    )}
                </div>
            </div>
        </div >
    )
}
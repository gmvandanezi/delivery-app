import { IoClose } from "react-icons/io5";
import { Client } from "../types";
import { api } from "../lib/axios";

interface ModalCreateAddressProps {
    cep: string;
    setCep: (cep: string) => void;
    street: string;
    setStreet: (street: string) => void;
    number: string;
    setNumber: (number: string) => void;
    complement: string;
    setComplement: (complement: string) => void;
    neighborhood: string;
    setNeighborhood: (neighborhood: string) => void;
    city: string;
    setCity: (city: string) => void;
    state: string;
    setState: (state: string) => void;
    onHandleCreateAddress: () => void;
    onHandleCloseModalCreateAddress: () => void;
}

export function ModalCreateAddress({
    cep,
    setCep,
    street,
    setStreet,
    number,
    setNumber,
    complement,
    setComplement,
    neighborhood,
    setNeighborhood,
    city,
    setCity,
    state,
    setState,
    onHandleCreateAddress,
    onHandleCloseModalCreateAddress
}: ModalCreateAddressProps) {
    const handleCheckCep = async (cep: string) => {
        if (isCepFilled) {
            const buscaCep = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
            setStreet(buscaCep.data.logradouro);
            setNeighborhood(buscaCep.data.bairro);
            setCity(buscaCep.data.localidade);
            setState(buscaCep.data.uf);
        }
    };

    const resetAddress = () => {
        setStreet("");
        setNumber("");
        setComplement("");
        setNeighborhood("");
        setCity("");
        setState("");
    };

    const isCepFilled = cep.toString().length === 8;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[32rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[500px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Endereço</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalCreateAddress}
                        />
                    </div>
                    <form onSubmit={onHandleCreateAddress}
                        className="flex flex-row flex-wrap w-full h-[350px] items-center justify-start pl-4 gap-6 absolute top-20 overflow-scroll">
                        <input
                            type="tel"
                            className="border-b p-2 rounded-md focus:outline-none focus:border-orange-600 focus:border-b-2 transition-colors w-32 shadow-md"
                            minLength={8}
                            maxLength={8}
                            placeholder="CEP *"
                            onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}
                            onClick={resetAddress}
                            onBlur={() => handleCheckCep(cep.toString())}
                            value={cep}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-96 shadow-md ${!isCepFilled && 'opacity-70'}`}
                            placeholder="Rua"
                            disabled
                            value={street}
                            required
                        />
                        <input
                            type="tel"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-32 shadow-md ${!isCepFilled && 'opacity-70'}`}
                            placeholder="Número"
                            onChange={(e) => setNumber(e.target.value.replace(/\D/g, ''))}
                            disabled={!isCepFilled}
                            value={number}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-60 shadow-md ${!isCepFilled && 'opacity-70'}`}
                            placeholder="Complemento"
                            onChange={(event) => { setComplement(event.target.value) }}
                            disabled={!isCepFilled}
                            value={complement}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-60 shadow-md ${!isCepFilled && 'opacity-70'}`}
                            placeholder="Bairro"
                            disabled
                            value={neighborhood}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-64 shadow-md ${!isCepFilled && 'opacity-70'}`}
                            placeholder="Cidade"
                            disabled
                            value={city}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-28 shadow-md ${!isCepFilled && 'opacity-70'}`}
                            placeholder="Estado"
                            disabled
                            value={state}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 
                            rounded-md text-white font-medium fixed right-500px bottom-56 tracking-wider transition"
                        >
                            Adicionar
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}
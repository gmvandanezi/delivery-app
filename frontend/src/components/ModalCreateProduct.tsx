import { IoClose } from "react-icons/io5";
import { api } from "../lib/axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Category } from "../types";

interface ModalCreateProductProps {
    onHandleCloseModalModalCreateProduct: () => void;
}

export function ModalCreateProduct({ onHandleCloseModalModalCreateProduct }: ModalCreateProductProps) {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState("");

    async function handleCreateProduct() {
        try {
            await api.post("/product", {
                name,
                description,
                price: parseFloat(price),
                imageUrl,
                categoryId: category
            })
            console.log("Produto criado com sucesso!");
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCategories() {
        try {
            const response = await api.get("/categories");
            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="w-full h-full fixed top-0 left-0 backdrop-filter backdrop-blur-md pointer-events-none"></div>
            <div className="w-full max-w-[32rem] relative">
                <div className="bg-yellow-100 min-w-72 min-h-[500px] relative top-0 bottom-0">
                    <div className="absolute right-0 left-0 top-0 bg-black z-50">
                        <h1 className="absolute left-9 top-6 font-bold text-base text-red-600">Novo Produto</h1>
                        <IoClose
                            className="absolute top-4 right-4 text-3xl font-bold text-red-600/85 hover:text-red-600/100 hover:cursor-pointer transition duration-75 z-50"
                            onClick={onHandleCloseModalModalCreateProduct}
                        />
                    </div>
                    <form onSubmit={handleCreateProduct}
                        className="flex flex-row flex-wrap w-full h-[350px] items-center justify-start pl-4 gap-1 absolute top-20 overflow-scroll">
                        <input
                            type="text"
                            className="border-b p-2 rounded-md focus:outline-none focus:border-orange-600 focus:border-b-2 transition-colors w-96 shadow-md"
                            placeholder="Nome"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-96 shadow-md`}
                            placeholder="Descrição"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-32 shadow-md`}
                            placeholder="Preço"
                            onChange={(e) => setPrice(e.target.value.replace(/[^0-9.]/g, ''))}
                            value={price}
                            required
                        />
                        <input
                            type="text"
                            className={`border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-60 shadow-md`}
                            placeholder="URL da Imagem"
                            onChange={(event) => { setImageUrl(event.target.value) }}
                            value={imageUrl}
                            required
                        />
                        <select
                            className="border-b p-2 rounded-md focus:outline-none focus:border-orange-600 
                            focus:border-b-2 transition-colors w-60 shadow-md"
                            defaultValue={undefined}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                setCategory(e.target.value);
                            }}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id} className="text-sm p-2">
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 rounded-md text-white font-medium absolute bottom-4 right-4 tracking-wider transition"
                        >
                            Adicionar Produto
                        </button>
                    </form>
                </div>
            </div>
        </div >
    )
}
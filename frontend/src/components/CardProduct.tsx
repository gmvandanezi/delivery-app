import { Product } from "../types";
import formatCurrency from "../utils/formatCurrency";

interface ProductCardProps {
  product: Product;
  onHandleOpenModalAddProductOnCart: (product: Product) => void;
}

export function CardProduct({ product, onHandleOpenModalAddProductOnCart }: ProductCardProps) {
  return (
    <div key={product.id} className="bg-white w-[18rem] h-[20rem] shadow-lg rounded-md overflow-hidden">
      <img src={product.imageUrl} className="w-full h-[150px] object-cover" alt="image product" />
      <div className="p-2 right-1 flex flex-col h-[7rem] gap-2 relative">
        <h2 className="font-semibold text-1xl text-orange-500 overflow-ellipsis overflow-hidden whitespace-nowrap absolute">{product.name}</h2>
        <span className="text-xs font-normal overflow-scroll absolute top-8 h-[86px]">{product.description}</span>
      </div>
      <div className="p-5 pt-0 flex justify-between items-center">
        <span className="text-clip font-bold ">{formatCurrency(product.price)}</span>
        <button
          className="bg-yellow-500/80 hover:bg-orange-500/90 px-6 py-2 rounded-md text-white font-medium tracking-wider transition"
          onClick={() => onHandleOpenModalAddProductOnCart(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

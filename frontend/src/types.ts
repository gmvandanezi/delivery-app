export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    categoryId: string
};

export interface Category {
    id: string;
    name: string;
};

export interface Client {
    id: string;
    name: string;
    phoneNumber: string;
    addresses: Address[]
}

export interface Address {
    id: string;
    cep: number;
    street: string;
    number: number;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    clientId: string;
}

export interface OrderProduct {
    productId: string,
    amount: number
};

export interface CartItem {
    product: Product;
    amount: number;
};

export interface Order {
    id: string;
    clientId: string;
    addressId: string;
    products: OrderProduct[];
    payment: string;
    totalValue: number;
}
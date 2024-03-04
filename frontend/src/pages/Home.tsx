import { FormEvent, useCallback, useEffect, useState } from "react";
import { api } from "../lib/axios";
import { CardProduct } from "../components/CardProduct";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { IoIosArrowForward } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { ModalAddProductOnCart } from "../components/ModalProductAddOnCart";
import { Address, CartItem, Category, Client, Product } from "../types";
import { Loading } from "../components/Loading";
import { ModalCart } from "../components/ModalCart";
import { CartBar } from "../components/CartBar";
import { ModalClient } from "../components/ModalClient";
import { ModalSelectAddress } from "../components/ModalSelectAddress";
import { ModalCreateAddress } from "../components/ModalCreateAddress";
import { ModalPayment } from "../components/ModalPayment";
import { ModalResume } from "../components/ModalResume";
import { ModalCreateProduct } from "../components/ModalCreateProduct";

export function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [openProductCreateModal, setOpenProductCreateModal] = useState(false);
  const [amount, setAmount] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  const [payment, setPayment] = useState("dinheiro");
  const [openModalResume, setOpenModalResume] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);


  const [client, setClient] = useState<Client | undefined>(undefined);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhoneNumber, setClientPhoneNumber] = useState("");

  const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);
  const [openCreateAddresModal, setOpenCreateAddressModal] = useState(false);
  const [openSelectAddresModal, setOpenSelectAddressModal] = useState(false);
  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");


  const [loading, setLoading] = useState(true);



  /*----------------------------------------------------------- Client -----------------------------------------------------------*/


  async function handleFindClientByPhoneNumber(clientPhoneNumber: string) {
    try {
      const response = await api.get(`/client/${clientPhoneNumber}`);
      const clientData = response.data;
      if (clientData.client) {
        setClient(clientData.client);
        setClientName(clientData.client.name);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleUpdateOrCreateClient(e: FormEvent) {
    e.preventDefault();
    try {
      const existingClient = client;

      if (existingClient) {
        if (existingClient.name !== clientName.trim()) {
          const updatedClientResponse = await api.put(`/client/${existingClient.id}`, {
            name: clientName,
            phoneNumber: clientPhoneNumber,
          });
          const updatedClient = updatedClientResponse.data.client;
          setClient(updatedClient);
        }
      } else {
        const newClientResponse = await api.post("/client", {
          name: clientName,
          phoneNumber: clientPhoneNumber,
        });
        const newClient = newClientResponse.data.client;
        setClient(newClient);
      }
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function handleOpenModalClient() {
    setClientName("");
    setClientPhoneNumber("");
    setClient(undefined);
    setOpenClientModal(true);
    setOpenCartModal(false);
  };

  function handleCloseModalClient() {
    setClient(undefined);
    setOpenClientModal(false);
  };


  /*----------------------------------------------------------- End Client -----------------------------------------------------------*/


  /*----------------------------------------------------------- Address -----------------------------------------------------------*/


  async function handleCreateAddress() {
    try {
      if (client) {
        await api.post("/address", {
          clientId: client.id,
          street,
          number: parseInt(number),
          complement,
          neighborhood,
          cep: parseInt(cep),
          city,
          state
        })
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function handleOpenModalSelectAddress() {
    setOpenSelectAddressModal(true);
    setOpenClientModal(false);
  };

  function handleCloseModalSelectAddress() {
    setOpenSelectAddressModal(false);
  };

  function handleOpenModalCreateAddress() {
    setStreet("");
    setNumber("");
    setComplement("");
    setNeighborhood("");
    setCity("");
    setState("");
    setCep("");
    setOpenCreateAddressModal(true);
    setOpenSelectAddressModal(false);
  };

  function handleCloseModalCreateAddress() {
    setStreet("");
    setNumber("");
    setComplement("");
    setNeighborhood("");
    setCity("");
    setState("");
    setCep("");
    setOpenCreateAddressModal(false);
  };


  /*----------------------------------------------------------- Amount -----------------------------------------------------------*/

  const addAmount = (event: FormEvent) => {
    event.preventDefault();
    setAmount(amount + 1);
  };

  const removeAmount = (event: FormEvent) => {
    event.preventDefault();
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  /*----------------------------------------------------------- End Amount -----------------------------------------------------------*/



  /*----------------------------------------------------------- Products -----------------------------------------------------------*/

  const fetchProductsAndCategories = useCallback(async () => {
    try {
      const productsResponse = await api.get("/products");
      setProducts(productsResponse.data.products);

      const categoriesResponse = await api.get("/categories");
      setCategories(categoriesResponse.data.categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const sortedCategories = categories
    .filter((category) => products.some((product) => product.categoryId === category.id && product.name.toLowerCase().includes(search)))
    .sort((a, b) => {
      const productsCountA = products.filter((product) => product.categoryId === a.id && product.name.toLowerCase().includes(search)).length;
      const productsCountB = products.filter((product) => product.categoryId === b.id && product.name.toLowerCase().includes(search)).length;
      return productsCountB - productsCountA;
    });

  useEffect(() => {
    fetchProductsAndCategories();
  }, [fetchProductsAndCategories]);

  function handleOpenModalAddProductOnCart(product: Product) {
    setOpenProductModal(true);
    setAmount(1);
    setProduct(product);
  };

  function handleCloseModalAddProductOnCart() {
    setAmount(1);
    setOpenProductModal(false);
  };

  function handleOpenModalCreateProduct() {
    setOpenProductCreateModal(true);
  };

  function handleCloseModalCreateProduct() {
    setOpenProductCreateModal(false);
  };

  /*----------------------------------------------------------- End Products -----------------------------------------------------------*/



  /*----------------------------------------------------------- Cart -----------------------------------------------------------*/


  const handleAddToCart = async (product: Product) => {
    if (product) {
      const existingProductIndex = cartItems.findIndex((item) => item.product.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = cartItems.map((item, index) => {
          if (index === existingProductIndex) {
            return {
              ...item,
              amount: item.amount + amount,
            };
          }
          return item;
        });
        setCartItems(updatedCart);
      } else {
        setCartItems([...cartItems, { product, amount }]);
      }
      handleCloseModalAddProductOnCart();
    }
  };

  const handleRemoveCartItem = async (product: Product) => {
    if (product !== undefined) {
      const updatedProducts = cartItems.filter((item) => item.product.id != product.id);
      setCartItems(updatedProducts);
    }
  }

  function handleOpenModalCart() {
    setOpenCartModal(true);
  };

  function handleCloseModalCart() {
    setOpenCartModal(false);
  };


  /*----------------------------------------------------------- End Cart -----------------------------------------------------------*/



  function handleOpenModalPayment() {
    setOpenPaymentModal(true);
    setOpenSelectAddressModal(false);
  };

  function handleCloseModalPayment() {
    setOpenPaymentModal(false);
  };

  function handleOpenModalResume() {
    setOpenModalResume(true);
    setOpenPaymentModal(false);
  }

  function handleCloseModalResume() {
    setClient(undefined);
    setCartItems([]);
    setSelectedAddress(undefined);
    setPayment("dinheiro");
    setOpenModalResume(false);
  }

  return (
    <div className={openCartModal || openProductModal || openClientModal ||
      openSelectAddresModal || openModalResume || openPaymentModal || openCreateAddresModal ? "fixed right-0 left-0" : ""}>

      <Header setSearch={setSearch} search={search} />
      {loading ? <Loading /> :

        <>

          {products
            .filter((product) => product.name.toLowerCase().includes(search))
            .length === 0 ? (
            <main className="min-h-screen flex pt-8 mb-16 gap-10 justify-center flex-wrap">
              <div className="flex flex-col flex-wrap items-center">
                <h1 className="text-3xl">Nenhum produto encontrado.</h1>
                <span className="text-sm hover:cursor-pointer hover:opacity-75" onClick={() => setSearch("")}>Clique para ver a lista completa de produtos.</span>
              </div>
            </main>
          ) : (
            <main className="min-h-screen flex pt-8 mb-16 gap-10 flex-wrap">
              {sortedCategories
                .filter((category) => products.some((product) => product.categoryId === category.id && product.name.toLowerCase().includes(search)))
                .map((category) => (
                  <div key={category.id} className="flex flex-col w-full items-center">
                    <div className="flex flex-col flex-wrap flex-start gap-2">
                      <div className="inline-flex flex-nowrap items-center justify-center gap-1">
                        <IoIosArrowForward color="red" fontSize="28px" />
                        <h2 className="font-semibold text-black capitalize">{category.name}</h2>
                      </div>
                      <div className="flex pt-4 items-center gap-6 flex-wrap justify-center">
                        {products
                          .filter((product) => product.categoryId === category.id && product.name.toLowerCase().includes(search))
                          .map((product) => (
                            <CardProduct
                              key={product.id}
                              product={product}
                              onHandleOpenModalAddProductOnCart={handleOpenModalAddProductOnCart}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </main>
          )}

        </>
      }

      <Footer />
      <button
        className="fixed bottom-6 right-10 bg-green-600 opacity-80 p-1 rounded-full hover:opacity-100 hover:scale-105 transition duration-300"
        onClick={handleOpenModalCreateProduct}
      >
        <MdAddCircleOutline className="text-4xl text-white" />
      </button>

      {openProductModal && product && (
        <ModalAddProductOnCart
          product={product}
          amount={amount}
          onAddAmount={addAmount}
          onRemoveAmount={removeAmount}
          onHandleAddToCart={handleAddToCart}
          onHandleCloseModalAddProductOnCart={handleCloseModalAddProductOnCart}
        />
      )}

      {cartItems.length !== 0 && (
        <CartBar cartItems={cartItems} onHandleOpenCartModal={handleOpenModalCart} />
      )}

      {openCartModal && (
        <ModalCart
          cartItems={cartItems}
          amount={amount}
          onHandleRemoveCartItem={handleRemoveCartItem}
          onHandleCloseModalCart={handleCloseModalCart}
          onHandleOpenModalClient={handleOpenModalClient}
        />
      )}

      {openClientModal && (
        <ModalClient
          client={client}
          clientName={clientName}
          clientPhoneNumber={clientPhoneNumber}
          setClientName={setClientName}
          onHandleUpdateOrCreateClient={handleUpdateOrCreateClient}
          setClientPhoneNumber={setClientPhoneNumber}
          onHandleFindClientByPhoneNumber={handleFindClientByPhoneNumber}
          onHandleOpenModalSelectAddress={handleOpenModalSelectAddress}
          onHandleCloseModalClient={handleCloseModalClient}
        />
      )}

      {openSelectAddresModal && client && (
        <ModalSelectAddress
          client={client}
          setSelectedAddress={setSelectedAddress}
          onHandleOpenModalPayment={handleOpenModalPayment}
          onHandleOpenModalCreateAddress={handleOpenModalCreateAddress}
          onHandleCloseModalSelectAddress={handleCloseModalSelectAddress}
        />
      )}

      {openCreateAddresModal && client && (
        <ModalCreateAddress
          cep={cep}
          setCep={setCep}
          street={street}
          setStreet={setStreet}
          number={number}
          setNumber={setNumber}
          complement={complement}
          setComplement={setComplement}
          neighborhood={neighborhood}
          setNeighborhood={setNeighborhood}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          onHandleCreateAddress={handleCreateAddress}
          onHandleCloseModalCreateAddress={handleCloseModalCreateAddress}
        />
      )}

      {openPaymentModal && client && (
        <ModalPayment
          payment={payment}
          setPayment={setPayment}
          onHandleCloseModalPayment={handleCloseModalPayment}
          onHandleOpenModalResume={handleOpenModalResume}
        />
      )}

      {openModalResume && client && selectedAddress && payment && cartItems && (
        <ModalResume
          client={client}
          setClient={setClient}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          payment={payment}
          setPayment={setPayment}
          cartItems={cartItems}
          setCartItems={setCartItems}
          onHandleCloseModalResume={handleCloseModalResume}
        />
      )}

      {openProductCreateModal && (
        <ModalCreateProduct
          onHandleCloseModalModalCreateProduct={handleCloseModalCreateProduct}
        />
      )}

    </div>
  );
}

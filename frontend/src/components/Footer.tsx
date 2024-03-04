import logo from "/logo-with-name.png";

export function Footer() {
    return (
        <footer className="flex flex-col items-center w-full relative bottom-0 bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left">
            <div className="container p-4 text-neutral-800 dark:text-neutral-200">
                <div className="grid gap-4 lg:grid-cols-3">
                    <div className="mb-4 md:mb-0">
                        <h5 className="mb-2 font-medium uppercase">PIZZA DELIVERY</h5>
                        <p className="mb-4">Endereço: Av. Barão do Rio Verde 1333 - Centro</p>
                        <p className="mb-4">Juiz de Fora - MG</p>
                        <p className="mb-4">Cep: 36061-008</p>
                    </div>
                    <div className="mb-6 md:mb-0">
                        <img src={logo} alt="" className="w-96" />
                    </div>
                    <div className="mb-4 md:mb-0">
                        <h5 className="mb-2 font-medium uppercase">HORÁRIO DE FUNCIONAMENTO</h5>
                        <p className="mb-4">Funcionamos de Segunda a Sexta das 08:00h até 21:00h</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

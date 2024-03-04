import logo from "/logo-with-name.png";

interface HeaderProps {
    setSearch: (search: string) => void
    search: string
}

export function Header({ setSearch, search }: HeaderProps) {
    return (
        <header className="bg-bg_header min-h-72 w-full bg-cover bg-center p-24">
            <div className="flex flex-col w-full items-center gap-2">
                <div className="flex w-64 gap-2">
                    <img src={logo} alt="logo" className="w-64" />
                </div>
                <div className="text-gray-800 min-w-64 sm:w-[600px] transition flex items-center gap-2 bg-white p-3 rounded-sm">
                    <input
                        className="bg-transparent w-full outline-none"
                        type="text"
                        placeholder="Pesquisar..."
                        onChange={(event) => setSearch(event.target.value)}
                        value={search}
                    />
                </div>
            </div>
        </header>
    )
}
const formatCurrency = (value: number) => {
    return Number(value).toLocaleString("pt-br", {style: 'currency', currency: 'BRL'});
}

export default formatCurrency;

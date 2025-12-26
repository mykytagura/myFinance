export const formatCurrency = (
    amount: number,
    locale: string = 'uk-UA',
    currency: string = 'UAH'
): string =>
    new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);

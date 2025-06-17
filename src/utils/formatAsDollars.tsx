export const FormatAsDollars = (price: string | number ): string => {
    const dollarAsAmount = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD',
    }).format(Number(price) / 100);
    return dollarAsAmount;
}
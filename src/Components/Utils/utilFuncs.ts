export function formatMoney(amount: any) {
    const formattedAmount = new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
    return formattedAmount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }
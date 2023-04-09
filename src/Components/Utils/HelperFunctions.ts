export function extractDate(dateString: string): string {
  const regex = /^\d{4}-\d{2}-\d{2}/;
  const match = dateString.match(regex);
  if (match) {
    return match[0];
  }
  throw new Error("Invalid ISO 8601 date string");
}

export function getRandomProducts(productArray : any) {
  const numProducts = productArray.length;
  const numProductsToSelect = 10;
  const selectedProducts = [];

  // Select 10 random products from the array
  for (let i = 0; i < numProductsToSelect; i++) {
    const randomIndex = Math.floor(Math.random() * numProducts);
    selectedProducts.push(productArray[randomIndex]);
  }

  return selectedProducts;
}
export function getProductStock(product) {
  return product?.variants?.reduce((sum, v) => sum + v.stock, 0) || 0;
}

export function getProductLabels(product) {
  const labels = [];
  const stock = getProductStock(product);
  if (stock === 0) labels.push({ key: 'out', text: 'OUT OF STOCK', className: 'bg-gray-500 text-white' });
  if (product?.featured) labels.push({ key: 'best', text: 'BEST SELLER', className: 'bg-brand-rose text-white' });
  // Handle both schemas: some products have 'price' field, others use 'salePrice' as retail price
  const retailPrice = product?.price || product?.salePrice || 0;
  if (product?.salePrice > 0 && product.salePrice < retailPrice) {
    labels.push({ key: 'sale', text: 'SALE', className: 'bg-red-500 text-white' });
  } else if (product?.tags?.includes('sale')) {
    labels.push({ key: 'sale', text: 'SALE', className: 'bg-red-500 text-white' });
  }
  const created = product?.createdAt ? new Date(product.createdAt) : null;
  if (created && (Date.now() - created.getTime()) < 30 * 24 * 60 * 60 * 1000) {
    labels.push({ key: 'new', text: 'NEW', className: 'bg-emerald-500 text-white' });
  }
  return labels.slice(0, 2);
}

export function getDisplayPrice(product) {
  // Handle both schemas: some products have 'price' field, others use 'salePrice' as retail price
  const retailPrice = product?.price || product?.salePrice || 0;
  const salePrice = product?.salePrice && product?.salePrice < retailPrice ? product.salePrice : null;
  
  if (salePrice && salePrice < retailPrice) {
    return { price: salePrice, original: retailPrice, onSale: true };
  }
  return { price: retailPrice, original: null, onSale: false };
}

export function getDiscountPercent(price, salePrice) {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

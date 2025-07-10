export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2
  }).format(amount);
};

export const getHouseSizeLabel = (size: string | null): string => {
  if (!size) return 'Not specified';
  const sizeMap: { [key: string]: string } = {
    'small': 'Small (0-1,800 sqft)',
    'medium': 'Medium (1,800-2,800 sqft)',
    'large': 'Large (2,800-3,500 sqft)',
    'xlarge': 'X-Large (3,500+ sqft)'
  };
  return sizeMap[size] || size;
};
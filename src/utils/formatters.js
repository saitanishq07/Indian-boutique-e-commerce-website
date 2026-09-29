// Format currency into Indian Rupee format (e.g., ₹8,990)
export function formatPrice(price) {
  if (price === undefined || price === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
}

// Calculate discount percentage
export function calculateDiscount(price, mrp) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

// Format date to human readable form
export function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Generate sequential or random realistic order number
export function generateOrderId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `AAV-2026-${randomNum}`;
}

// Mock Indian PIN code delivery checker
export function checkDeliveryPin(pin) {
  const cleanPin = String(pin).trim();
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      available: false,
      message: 'Please enter a valid 6-digit Indian PIN code.'
    };
  }

  // Demo response based on PIN code regions
  const isMetro = ['500001', '500033', '500081', '400001', '110001', '560001', '600001', '700001'].some(p => cleanPin.startsWith(p.substring(0, 3)));
  
  return {
    available: true,
    estimatedDays: isMetro ? '2–3 business days' : '3–5 business days',
    codAvailable: true,
    expressAvailable: isMetro,
    message: `Express Delivery Available to ${cleanPin}`
  };
}

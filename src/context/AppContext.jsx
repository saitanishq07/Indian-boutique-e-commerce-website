import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_CATEGORIES, 
  INITIAL_COUPONS, 
  INITIAL_ORDERS, 
  INITIAL_CUSTOMERS, 
  INITIAL_REVIEWS, 
  INITIAL_BANNERS 
} from '../data/mockData';
import { generateOrderId } from '../utils/formatters';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Persistence state loaders
  const loadState = (key, fallback) => {
    try {
      const saved = localStorage.getItem(`aavani_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [products, setProducts] = useState(() => loadState('products', INITIAL_PRODUCTS));
  const [categories, setCategories] = useState(() => loadState('categories', INITIAL_CATEGORIES));
  const [coupons, setCoupons] = useState(() => loadState('coupons', INITIAL_COUPONS));
  const [orders, setOrders] = useState(() => loadState('orders', INITIAL_ORDERS));
  const [customers, setCustomers] = useState(() => loadState('customers', INITIAL_CUSTOMERS));
  const [reviews, setReviews] = useState(() => loadState('reviews', INITIAL_REVIEWS));
  const [banners, setBanners] = useState(() => loadState('banners', INITIAL_BANNERS));
  
  const [cart, setCart] = useState(() => loadState('cart', []));
  const [appliedCoupon, setAppliedCoupon] = useState(() => loadState('applied_coupon', null));
  const [wishlist, setWishlist] = useState(() => loadState('wishlist', ['prod-1', 'prod-8']));
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('aavani_admin_auth') === 'true';
  });

  const [toast, setToast] = useState(null);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('aavani_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('aavani_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('aavani_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('aavani_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('aavani_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('aavani_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('aavani_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('aavani_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('aavani_applied_coupon', JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);

  // Toast System
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Cart Operations
  const addToCart = (product, color = '', size = 'One Size', qty = 1) => {
    setCart(prev => {
      const selectedColor = color || product.color || 'Default';
      const existingIndex = prev.findIndex(item => item.id === product.id && item.color === selectedColor && item.size === size);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        image: product.images ? product.images[0] : '',
        category: product.category,
        color: selectedColor,
        size,
        quantity: qty
      }];
    });
    showToast(`Added "${product.name}" to Bag`);
  };

  const removeFromCart = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from Bag', 'info');
  };

  const updateCartQty = (index, newQty) => {
    if (newQty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(c => c.code === cleanCode && c.status === 'Active');
    if (!coupon) {
      return { success: false, message: 'Invalid or expired coupon code.' };
    }
    
    const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    if (cartSubtotal < coupon.minOrder) {
      return { success: false, message: `Minimum order value of ₹${coupon.minOrder.toLocaleString('en-IN')} required.` };
    }

    setAppliedCoupon(coupon);
    showToast(`Coupon "${cleanCode}" applied successfully!`);
    return { success: true, message: `Coupon ${cleanCode} Applied!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Wishlist Operations
  const toggleWishlist = (productId) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'info');
        return prev.filter(id => id !== productId);
      }
      showToast('Added to Wishlist');
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Customer Place Demo Order (Updates Products stock, Orders, Customers, clears Cart)
  const placeOrder = (customerDetails, shippingOption, paymentMethod) => {
    const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
        if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
          discount = appliedCoupon.maxDiscount;
        }
      } else {
        discount = appliedCoupon.discountValue;
      }
    }

    const shipping = cartSubtotal >= 2999 ? 0 : 149;
    const tax = Math.round((cartSubtotal - discount) * 0.05); // 5% GST
    const total = Math.max(0, cartSubtotal - discount + shipping + tax);

    const newOrderId = generateOrderId();
    const newOrder = {
      id: newOrderId,
      customer: customerDetails,
      items: [...cart],
      subtotal: cartSubtotal,
      discount,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      shipping,
      tax,
      total,
      shippingOption,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      timeline: [
        { title: 'Order Placed', time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }), done: true },
        { title: 'Order Confirmed', time: 'Just now', done: true },
        { title: 'Packed at Jubilee Hills Boutique', time: 'Pending', done: false },
        { title: 'Shipped via Express Courier', time: 'Pending', done: false },
        { title: 'Delivered', time: 'Pending', done: false }
      ]
    };

    // 1. Add order to system
    setOrders(prev => [newOrder, ...prev]);

    // 2. Reduce stock for ordered items
    setProducts(prev => prev.map(p => {
      const orderedItem = cart.find(c => c.id === p.id);
      if (orderedItem) {
        const newStock = Math.max(0, p.stock - orderedItem.quantity);
        return {
          ...p,
          stock: newStock,
          status: newStock === 0 ? 'Out of Stock' : p.status
        };
      }
      return p;
    }));

    // 3. Register or update customer profile
    setCustomers(prev => {
      const existing = prev.find(c => c.email.toLowerCase() === customerDetails.email.toLowerCase());
      if (existing) {
        return prev.map(c => c.email.toLowerCase() === customerDetails.email.toLowerCase() ? {
          ...c,
          ordersCount: c.ordersCount + 1,
          totalSpent: c.totalSpent + total,
          lastOrderDate: new Date().toISOString().split('T')[0]
        } : c);
      }
      return [{
        id: `cust-${Date.now()}`,
        name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
        location: `${customerDetails.city}, ${customerDetails.state}`,
        ordersCount: 1,
        totalSpent: total,
        lastOrderDate: new Date().toISOString().split('T')[0],
        status: 'Active'
      }, ...prev];
    });

    // 4. Clear cart & coupon
    clearCart();

    return newOrder;
  };

  // Admin Actions
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedTimeline = order.timeline.map((step, idx) => {
          if (newStatus === 'Confirmed' && idx <= 1) return { ...step, done: true, time: 'Confirmed' };
          if (newStatus === 'Packed' && idx <= 2) return { ...step, done: true, time: 'Packed' };
          if (newStatus === 'Shipped' && idx <= 3) return { ...step, done: true, time: 'Shipped' };
          if (newStatus === 'Delivered' && idx <= 4) return { ...step, done: true, time: 'Delivered' };
          return step;
        });
        return { ...order, status: newStatus, timeline: updatedTimeline };
      }
      return order;
    }));
    showToast(`Order ${orderId} status updated to ${newStatus}`);
  };

  const addProduct = (productData) => {
    const newProd = {
      ...productData,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
      status: productData.stock > 0 ? (productData.status || 'Active') : 'Out of Stock'
    };
    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${productData.name}" created`);
    return newProd;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedData } : p));
    showToast(`Product updated successfully`);
  };

  const deleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('Product deleted from catalog', 'info');
  };

  const duplicateProduct = (productId) => {
    const target = products.find(p => p.id === productId);
    if (target) {
      const dup = {
        ...target,
        id: `prod-${Date.now()}`,
        name: `${target.name} (Copy)`,
        sku: `${target.sku}-COPY`
      };
      setProducts(prev => [dup, ...prev]);
      showToast(`Duplicated "${target.name}"`);
    }
  };

  const adjustStock = (productId, variantSku, changeAmount, reason) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const newStock = Math.max(0, p.stock + changeAmount);
        return {
          ...p,
          stock: newStock,
          status: newStock === 0 ? 'Out of Stock' : (p.status === 'Out of Stock' ? 'Active' : p.status)
        };
      }
      return p;
    }));
    showToast(`Stock adjusted (${changeAmount > 0 ? '+' : ''}${changeAmount}) - ${reason}`);
  };

  // Coupon Admin
  const addCoupon = (data) => {
    const newCoup = { ...data, id: `coup-${Date.now()}`, usageCount: 0 };
    setCoupons(prev => [newCoup, ...prev]);
    showToast(`Coupon "${data.code}" created`);
  };

  const updateCoupon = (id, data) => {
    setCoupons(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    showToast('Coupon updated');
  };

  const deleteCoupon = (id) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    showToast('Coupon deleted', 'info');
  };

  // Review Admin
  const moderateReview = (reviewId, newStatus) => {
    setReviews(prev => prev.map(r => r.id === reviewId ? { ...r, status: newStatus } : r));
    showToast(`Review status changed to ${newStatus}`);
  };

  // Admin Auth
  const adminLogin = (email, password) => {
    if (email.trim().toLowerCase() === 'admin@aavani.example' && password === 'Admin@123') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('aavani_admin_auth', 'true');
      showToast('Logged into AAVANI Admin');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('aavani_admin_auth');
    showToast('Logged out of Admin', 'info');
  };

  return (
    <AppContext.Provider value={{
      products,
      categories,
      coupons,
      orders,
      customers,
      reviews,
      banners,
      cart,
      appliedCoupon,
      wishlist,
      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery,
      toast,
      showToast,
      addToCart,
      removeFromCart,
      updateCartQty,
      clearCart,
      applyCoupon,
      removeCoupon,
      toggleWishlist,
      isInWishlist,
      placeOrder,
      updateOrderStatus,
      addProduct,
      updateProduct,
      deleteProduct,
      duplicateProduct,
      adjustStock,
      addCoupon,
      updateCoupon,
      deleteCoupon,
      moderateReview,
      isAdminLoggedIn,
      adminLogin,
      adminLogout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

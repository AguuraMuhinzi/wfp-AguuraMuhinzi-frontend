import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, Heart, Package, ArrowRight } from 'lucide-react';

// Enhanced Cart Modal Component
const EnhancedCartModal = ({ 
  cart, 
  showCart, 
  setShowCart, 
  onUpdateQuantity, 
  onRemoveItem,
  onCheckout,
  BASE_URL 
}) => {
  const [isUpdating, setIsUpdating] = useState({});
  const [animatingItems, setAnimatingItems] = useState(new Set());

  const handleQuantityChange = async (itemId, newQuantity, currentQuantity) => {
    if (newQuantity === currentQuantity || newQuantity < 1) return;
    
    setIsUpdating(prev => ({ ...prev, [itemId]: true }));
    setAnimatingItems(prev => new Set(prev).add(itemId));
    
    try {
      await onUpdateQuantity(itemId, newQuantity);
      
      // Remove animation after a delay
      setTimeout(() => {
        setAnimatingItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 300);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId) => {
    setIsUpdating(prev => ({ ...prev, [itemId]: true }));
    try {
      await onRemoveItem(itemId);
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      setIsUpdating(prev => ({ ...prev, [itemId]: false }));
    }
  };

  if (!showCart) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white relative">
          <button
            onClick={() => setShowCart(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Your Cart</h2>
              <p className="text-green-100 text-sm">
                {cart.total_items} {cart.total_items === 1 ? 'item' : 'items'} • Ready to order
              </p>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full max-h-[calc(90vh-80px)]">
          {cart.items.length === 0 ? (
            /* Empty Cart State */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Discover fresh products from local farms</p>
              <button
                onClick={() => setShowCart(false)}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-all duration-200 font-medium"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className={`bg-gray-50 rounded-2xl p-4 transition-all duration-300 ${
                      animatingItems.has(item.id) ? 'scale-[1.02] shadow-lg' : ''
                    } ${isUpdating[item.id] ? 'opacity-70' : ''}`}
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative flex-shrink-0">
                        <img
                          src={`${BASE_URL}${item.product.image}`}
                          alt={item.product.product_name}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                          {item.quantity}
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900 text-lg truncate">
                              {item.product.product_name}
                            </h4>
                            <p className="text-gray-500 text-sm">{item.product.category}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            disabled={isUpdating[item.id]}
                            className="text-red-400 hover:text-red-600 transition-colors p-1 disabled:opacity-50"
                            title="Remove from cart"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price and Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <p className="text-green-600 font-bold text-lg">
                              {item.total_price} RWF
                            </p>
                            <p className="text-gray-400 text-sm">
                              {item.product.price} RWF each
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1, item.quantity)}
                              disabled={isUpdating[item.id] || item.quantity <= 1}
                              className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            
                            <span className="w-12 text-center font-semibold text-lg">
                              {isUpdating[item.id] ? (
                                <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1, item.quantity)}
                              disabled={isUpdating[item.id]}
                              className="w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                            >
                              <Plus className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 p-6 bg-white">
                {/* Order Summary */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal ({cart.total_items} items)</span>
                    <span>{cart.total_price} RWF</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="h-px bg-gray-200"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-green-600">
                      {cart.total_price} RWF
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={onCheckout}
                     
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => setShowCart(false)}
                    className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>

                {/* Trust Indicators */}
                <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Heart className="w-3 h-3 text-red-400" />
                    <span>Supporting local farms</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="text-xs text-gray-500">
                    🚚 Free delivery
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="text-xs text-gray-500">
                    🌱 Fresh guarantee
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Enhanced Cart Icon Component
const CartIcon = ({ cart, onClick }) => {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (cart.total_items > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cart.total_items]);

  return (
    <button
      onClick={onClick}
      className={`relative p-2 hover:bg-green-100 rounded-full transition-all duration-200 ${
        bounce ? 'animate-bounce' : ''
      }`}
    >
      <ShoppingCart className="w-6 h-6 text-green-600" />
      {cart.total_items > 0 && (
        <>
          {/* Badge with animation */}
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center shadow-lg animate-pulse">
            {cart.total_items > 99 ? '99+' : cart.total_items}
          </span>
          {/* Pulse ring effect */}
          <span className="absolute -top-1 -right-1 bg-red-400 rounded-full w-5 h-5 animate-ping opacity-30"></span>
        </>
      )}
    </button>
  );
};

// Export both components for use in your main application  
export { EnhancedCartModal, CartIcon };
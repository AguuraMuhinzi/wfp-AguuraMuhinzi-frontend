// // src/components/modals/OrderModal.jsx
// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   X, Plus, Minus, ShoppingCart, User, MapPin,
//   Phone, Mail, Calendar, Package, AlertCircle,
//   CheckCircle, CreditCard, Truck, Clock
// } from 'lucide-react';
// import { createOrder } from '../../Redux/Slices/order/orderSlice';

// const OrderModal = ({ product, cooperative, onClose, currentUser }) => {
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [customerInfo, setCustomerInfo] = useState({
//     phone: '',
//     address: '',
//     notes: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);
//   const [errors, setErrors] = useState({});

//   const orderLoading = useSelector((state) => state.orders?.loading || false);
//   const orderError = useSelector((state) => state.orders?.error || null);

//   useEffect(() => {
//     setTotalPrice(product.price * quantity);
//   }, [quantity, product.price]);

//   const handleQuantityChange = (change) => {
//     const newQuantity = Math.max(1, quantity + change);
//     setQuantity(newQuantity);
//   };

//   const handleInputChange = (field, value) => {
//     setCustomerInfo(prev => ({
//       ...prev,
//       [field]: value
//     }));
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!customerInfo.phone.trim()) {
//       newErrors.phone = 'Phone number is required';
//     } else if (!/^[0-9+\-\s()]+$/.test(customerInfo.phone)) {
//       newErrors.phone = 'Please enter a valid phone number';
//     }
//     if (!customerInfo.address.trim()) {
//       newErrors.address = 'Delivery address is required';
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmitOrder = async () => {
//     if (!validateForm()) return;
//     setIsSubmitting(true);
//     const orderData = {
//       user: currentUser?.id,
//       cooperative: cooperative?.id,
//       products: [{ product_id: product.id, quantity }],
//       customer_info: customerInfo
//     };
//     try {
//       await dispatch(createOrder(orderData)).unwrap();
//       setOrderSuccess(true);
//       setTimeout(() => {
//         onClose();
//       }, 3000);
//     } catch (error) {
//       console.error('Order creation failed:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!product || !cooperative) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden">
//         {orderSuccess ? (
//           <div className="p-8 text-center">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <CheckCircle className="w-12 h-12 text-green-600" />
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully! 🎉</h2>
//             <p className="text-gray-600 mb-6">
//               Your order has been sent to <span className="font-semibold text-green-600">{cooperative.name}</span>. 
//               They will contact you shortly to confirm delivery details.
//             </p>
//             <div className="bg-green-50 rounded-xl p-4 mb-6">
//               <h3 className="font-semibold text-green-800 mb-2">Order Summary</h3>
//               <div className="text-sm text-green-700 space-y-1">
//                 <p>{quantity}x {product.product_name}</p>
//                 <p className="font-semibold">Total: {totalPrice} RWF</p>
//               </div>
//             </div>
//             <p className="text-sm text-gray-500">You can track your order status in your orders page.</p>
//           </div>
//         ) : (
//           <div>
//             <div className="flex items-center justify-between p-6 border-b border-gray-200">
//               <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
//               <button 
//                 onClick={onClose}
//                 className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>
//             <div className="overflow-y-auto max-h-[calc(95vh-140px)] p-6">
//   {/* Product Summary */}
//   <div className="flex items-center gap-4 mb-4">
//     <img 
//       src={`${process.env.REACT_APP_API_BASE_URL}${product.image}`} 
//       alt={product.product_name}
//       className="w-20 h-20 rounded-xl object-cover"
//     />
//     <div className="flex-1">
//       <h3 className="font-bold text-xl text-gray-900">{product.product_name}</h3>
//       <p className="text-green-600 font-semibold text-lg">{product.price} RWF per unit</p>
//       <p className="text-sm text-gray-600">From {cooperative.name}</p>
//     </div>
//   </div>

//   {/* Quantity Selector */}
//   <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-4">
//     <span className="font-medium text-gray-700">Quantity</span>
//     <div className="flex items-center gap-3">
//       <button
//         onClick={() => handleQuantityChange(-1)}
//         className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
//         disabled={quantity <= 1}
//       >
//         <Minus className="w-4 h-4" />
//       </button>
//       <span className="text-xl font-bold w-12 text-center">{quantity}</span>
//       <button
//         onClick={() => handleQuantityChange(1)}
//         className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
//       >
//         <Plus className="w-4 h-4" />
//       </button>
//     </div>
//   </div>

//   {/* Phone Input */}
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//     <input
//       type="tel"
//       value={customerInfo.phone}
//       onChange={(e) => handleInputChange('phone', e.target.value)}
//       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
//       placeholder="Enter your phone number"
//     />
//     {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
//   </div>

//   {/* Address Input */}
//   <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
//     <textarea
//       value={customerInfo.address}
//       onChange={(e) => handleInputChange('address', e.target.value)}
//       className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
//       placeholder="Enter delivery address"
//     />
//     {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
//   </div>

  

//   {/* Total and Submit */}
//   <div className="flex justify-between items-center mt-6">
//     <p className="text-lg font-semibold">Total: <span className="text-green-600">{totalPrice} RWF</span></p>
//     <button
//       onClick={handleSubmitOrder}
//       disabled={isSubmitting}
//       className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
//     >
//       {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
//     </button>
//   </div>
// </div>

//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrderModal;


// src/components/modals/OrderModal.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X, Plus, Minus, CheckCircle } from 'lucide-react';
import { createOrder } from '../../Redux/Slices/order/orderSlice';

// Helpers to resolve IDs
const resolveUserId = (currentUser) => {
  const fromProp = currentUser?.id;
  if (fromProp) return Number(fromProp);
  const ls = typeof window !== 'undefined' ? (localStorage.getItem('user_id') || localStorage.getItem('userId')) : null;
  return ls ? Number(ls) : null;
};

const resolveCooperativeId = (cooperative, product) => {
  // Prefer product.user (the cooperative's user id on the product)
  const candidates = [
    product?.user,
    cooperative?.user?.id,
    cooperative?.id,
    product?.cooperative,
    product?.cooperative_id,
    product?.cooperative?.id,
  ].filter(Boolean);
  const first = candidates[0];
  return first ? Number(first) : null;
};

const OrderModal = ({ product, cooperative, onClose, currentUser }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerInfo, setCustomerInfo] = useState({ phone: '', address: '', notes: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const orderLoading = useSelector((state) => state.orders?.loading || false);

  useEffect(() => {
    setTotalPrice(product.price * quantity);
  }, [quantity, product.price]);

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]+$/.test(customerInfo.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!customerInfo.address.trim()) {
      newErrors.address = 'Delivery address is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async () => {
    if (!validateForm()) return;

    const userId = resolveUserId(currentUser);
    const cooperativeId = resolveCooperativeId(cooperative, product);

    if (!userId) {
      setErrors((e) => ({ ...e, user: 'User not found. Please log in.' }));
      return;
    }
    if (!cooperativeId) {
      setErrors((e) => ({ ...e, cooperative: 'Could not determine cooperative. Please try again.' }));
      return;
    }

    setIsSubmitting(true);
    const orderData = {
      user: userId,
      cooperative: cooperativeId, // IMPORTANT: cooperative user id
      products: [{ product_id: product.id, quantity }],
      customer_info: customerInfo,
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      setOrderSuccess(true);
      setTimeout(() => onClose(), 3000);
    } catch (error) {
      console.error('Order creation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product || !cooperative) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden">
        {orderSuccess ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Placed Successfully! 🎉</h2>
            <p className="text-gray-600 mb-6">
              Your order has been sent to <span className="font-semibold text-green-600">{cooperative.name}</span>.
              They will contact you shortly to confirm delivery details.
            </p>
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Order Summary</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>{quantity}x {product.product_name}</p>
                <p className="font-semibold">Total: {totalPrice} RWF</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">You can track your order status in your orders page.</p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Place Your Order</h2>
              <button onClick={onClose} className="w-10 h-10 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(95vh-140px)] p-6">
              {/* Product Summary */}
              <div className="flex items-center gap-4 mb-4">
                <img src={`${process.env.REACT_APP_API_BASE_URL}${product.image}`} alt={product.product_name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-xl text-gray-900">{product.product_name}</h3>
                  <p className="text-green-600 font-semibold text-lg">{product.price} RWF per unit</p>
                  <p className="text-sm text-gray-600">From {cooperative.name}</p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4 mb-4">
                <span className="font-medium text-gray-700">Quantity</span>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleQuantityChange(-1)} className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors" disabled={quantity <= 1}>
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)} className="w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Phone Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Address Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                <textarea
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter delivery address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>

              {/* Hidden validation errors */}
              {(errors.user || errors.cooperative) && (
                <div className="mb-4 text-sm text-red-600">
                  {errors.user && <div>{errors.user}</div>}
                  {errors.cooperative && <div>{errors.cooperative}</div>}
                </div>
              )}

              {/* Total and Submit */}
              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-semibold">Total: <span className="text-green-600">{totalPrice} RWF</span></p>
                <button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting || orderLoading}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
                >
                  {isSubmitting || orderLoading ? 'Placing Order...' : 'Confirm Order'}
                </button>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
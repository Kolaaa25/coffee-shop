import { orderDB } from '../database/db.js';

export const createOrder = (orderData) => {
  const result = orderDB.create(
    orderData.userId,
    orderData.userName,
    orderData.userEmail,
    orderData.items,
    orderData.total,
    orderData.paymentIntentId,
    orderData.shippingAddress ? JSON.stringify(orderData.shippingAddress) : null
  );
  
  return {
    id: result.lastInsertRowid,
    ...orderData,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
};

export const getOrdersByUserId = (userId) => {
  return orderDB.findByUserId(userId);
};

export const getOrderById = (orderId) => {
  return orderDB.findById(orderId);
};

export const getAllOrders = () => {
  return orderDB.getAll();
};

export const updateOrderStatus = (orderId, status) => {
  orderDB.updateStatus(orderId, status);
  return orderDB.findById(orderId);
};

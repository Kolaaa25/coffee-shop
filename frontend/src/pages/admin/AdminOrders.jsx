import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { ordersAPI } from '../../services/admin';
import { Eye } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'day', 'week', 'month'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'pending', 'paid', 'processing', 'completed', 'cancelled'

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await ordersAPI.getAll();
      console.log('📦 Fetched orders:', data);
      setOrders(data);
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
      alert('Failed to fetch orders!');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, newStatus);
      alert('Status updated successfully!');
      await fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleViewDetails = async (orderId) => {
    try {
      const order = await ordersAPI.getById(orderId);
      setSelectedOrder(order);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Failed to fetch order details');
    }
  };

  // Filter orders by time period
  const filterOrdersByTime = (orders) => {
    if (timeFilter === 'all') return orders;

    const now = new Date();
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      
      if (timeFilter === 'day') {
        // Last 24 hours
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return orderDate >= oneDayAgo;
      } else if (timeFilter === 'week') {
        // Last 7 days
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return orderDate >= oneWeekAgo;
      } else if (timeFilter === 'month') {
        // Last 30 days
        const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return orderDate >= oneMonthAgo;
      }
      
      return true;
    });

    return filtered;
  };

  const filteredOrders = filterOrdersByTime(orders);

  // Filter by status
  const finalFilteredOrders = statusFilter === 'all' 
    ? filteredOrders 
    : filteredOrders.filter(order => order.status === statusFilter);

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-blue-100 text-blue-700 border-blue-300',
      'paid': 'bg-green-100 text-green-700 border-green-300',
      'processing': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      'completed': 'bg-purple-100 text-purple-700 border-purple-300',
      'cancelled': 'bg-red-100 text-red-700 border-red-300'
    };
    return colors[status] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders Management</h1>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 md:p-3">
            <p className="text-sm text-blue-800 font-medium">Total Orders: {finalFilteredOrders.length}</p>
          </div>
        </div>

        {/* Time Filter Buttons */}
        <div className="bg-white rounded-xl shadow-md p-3 md:p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Time Period</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setTimeFilter('all')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === 'all'
                  ? 'bg-brown text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeFilter('day')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === 'day'
                  ? 'bg-brown text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeFilter('week')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === 'week'
                  ? 'bg-brown text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              This Week
            </button>
            <button
              onClick={() => setTimeFilter('month')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                timeFilter === 'month'
                  ? 'bg-brown text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="bg-white rounded-xl shadow-md p-3 md:p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Filter by Status</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === 'all'
                  ? 'bg-brown text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Status
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === 'pending'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('paid')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === 'paid'
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Paid
            </button>
            <button
              onClick={() => setStatusFilter('processing')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === 'processing'
                  ? 'bg-yellow-600 text-white shadow-md'
                  : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
              }`}
            >
              Processing
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === 'completed'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setStatusFilter('cancelled')}
              className={`px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === 'cancelled'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Status Guide - Hidden on mobile */}
        <div className="hidden md:block bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">📋 Order Status Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="border-l-4 border-blue-500 pl-3">
              <p className="font-semibold text-blue-700">Pending</p>
              <p className="text-xs text-gray-600">Order placed, awaiting payment</p>
            </div>
            <div className="border-l-4 border-green-500 pl-3">
              <p className="font-semibold text-green-700">Paid</p>
              <p className="text-xs text-gray-600">Payment received, ready to process</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3">
              <p className="font-semibold text-yellow-700">Processing</p>
              <p className="text-xs text-gray-600">Order is being prepared</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <p className="font-semibold text-purple-700">Completed</p>
              <p className="text-xs text-gray-600">Order delivered/picked up</p>
            </div>
            <div className="border-l-4 border-red-500 pl-3">
              <p className="font-semibold text-red-700">Cancelled</p>
              <p className="text-xs text-gray-600">Order was cancelled</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">All Orders</h2>
          
          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-3">
            {finalFilteredOrders.length > 0 ? (
              finalFilteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">#{order.id}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.customer_name || order.user_name || `User #${order.user_id}`}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</span>
                    <span className="text-gray-500">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 pt-2 border-t">
                    <button 
                      onClick={() => handleViewDetails(order.id)}
                      className="flex-1 flex items-center justify-center gap-1 p-2 text-brown bg-brown/10 rounded transition text-sm"
                    >
                      <Eye size={16} /> View
                    </button>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="flex-1 text-sm border border-gray-300 rounded px-2 py-2 focus:ring-2 focus:ring-brown focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
                {orders.length === 0 
                  ? 'No orders yet' 
                  : 'No orders found with selected filters'}
              </div>
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Total</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {finalFilteredOrders.length > 0 ? (
                  finalFilteredOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">#{order.id}</td>
                      <td className="py-4">{order.customer_name || order.user_name || `User #${order.user_id}`}</td>
                      <td className="py-4">${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="py-4">
                        <div className="flex gap-2 items-center">
                          <button 
                            onClick={() => handleViewDetails(order.id)}
                            className="p-2 text-brown hover:bg-brown hover:bg-opacity-10 rounded transition"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-3 py-1.5 focus:ring-2 focus:ring-brown focus:border-transparent cursor-pointer"
                            title="Change order status"
                          >
                            <option value="pending">🔵 Pending</option>
                            <option value="paid">💰 Paid</option>
                            <option value="processing">⚙️ Processing</option>
                            <option value="completed">✅ Completed</option>
                            <option value="cancelled">❌ Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-8 text-center text-gray-500">
                      {orders.length === 0 
                        ? 'No orders yet' 
                        : 'No orders found with selected filters'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {showModal && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-4 md:p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-900">Order Details #{selectedOrder.id}</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{selectedOrder.user_name || `User #${selectedOrder.user_id}`}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium text-green-600">${typeof selectedOrder.total === 'number' ? selectedOrder.total.toFixed(2) : '0.00'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{new Date(selectedOrder.created_at).toLocaleString()}</p>
                  </div>
                </div>

                {selectedOrder.items && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {(typeof selectedOrder.items === 'string' ? JSON.parse(selectedOrder.items) : selectedOrder.items).map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedOrder.shipping_address && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="text-gray-700 text-sm">
                      {typeof selectedOrder.shipping_address === 'string' 
                        ? (() => {
                            try {
                              const addr = JSON.parse(selectedOrder.shipping_address);
                              return (
                                <div className="space-y-1">
                                  <p><strong>Name:</strong> {addr.fullName}</p>
                                  <p><strong>Email:</strong> {addr.email}</p>
                                  <p><strong>Phone:</strong> {addr.phone}</p>
                                  <p><strong>Address:</strong> {addr.address}, {addr.city}, {addr.zipCode}</p>
                                  {addr.notes && <p><strong>Notes:</strong> {addr.notes}</p>}
                                </div>
                              );
                            } catch (e) {
                              return selectedOrder.shipping_address;
                            }
                          })()
                        : selectedOrder.shipping_address
                      }
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-6 border-t mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;

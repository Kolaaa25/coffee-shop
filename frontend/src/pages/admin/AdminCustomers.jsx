import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { usersAPI, ordersAPI } from '../../services/admin';
import { Eye, X } from 'lucide-react';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerOrders, setCustomerOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await usersAPI.getAll();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewCustomer = async (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
    setLoadingOrders(true);
    
    try {
      // Fetch all orders and filter by customer email
      const allOrders = await ordersAPI.getAll();
      const userOrders = allOrders.filter(order => 
        order.user_email === customer.email || order.user_id === customer.id
      );
      setCustomerOrders(userOrders);
    } catch (error) {
      console.error('Error fetching customer orders:', error);
      setCustomerOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
    setCustomerOrders([]);
  };

  const getOrdersTotal = () => {
    return customerOrders.reduce((sum, order) => sum + (order.total || 0), 0);
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
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-semibold">ID</th>
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Email</th>
                  <th className="pb-3 font-semibold">Registered</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.id} className="border-b last:border-0">
                      <td className="py-4 font-medium">#{customer.id}</td>
                      <td className="py-4">{customer.name}</td>
                      <td className="py-4">{customer.email}</td>
                      <td className="py-4">{new Date(customer.created_at).toLocaleDateString()}</td>
                      <td className="py-4">
                        <button 
                          onClick={() => handleViewCustomer(customer)}
                          className="flex items-center gap-2 px-3 py-1.5 text-brown hover:bg-brown hover:bg-opacity-10 rounded transition"
                        >
                          <Eye size={16} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-gray-500">
                      No customers yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
                <p className="text-gray-500 mt-1">ID: #{selectedCustomer.id}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-semibold text-gray-900">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registered Date</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(selectedCustomer.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Customer Since</p>
                  <p className="font-semibold text-gray-900">
                    {Math.floor((Date.now() - new Date(selectedCustomer.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                  </p>
                </div>
              </div>
            </div>

            {/* Order Statistics */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-brown">{customerOrders.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-brown">
                    ${loadingOrders ? '...' : getOrdersTotal().toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Average Order</p>
                  <p className="text-2xl font-bold text-brown">
                    ${loadingOrders || customerOrders.length === 0 ? '0.00' : (getOrdersTotal() / customerOrders.length).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order History</h3>
              {loadingOrders ? (
                <div className="text-center py-8 text-gray-500">Loading orders...</div>
              ) : customerOrders.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {customerOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-brown">${order.total.toFixed(2)}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'completed' ? 'bg-green-100 text-green-700' :
                            order.status === 'pending' ? 'bg-blue-100 text-blue-700' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                            order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      {order.items && typeof order.items === 'string' && (
                        <div className="mt-2 text-sm text-gray-600">
                          <p className="font-medium">Items:</p>
                          <ul className="ml-4 list-disc">
                            {JSON.parse(order.items).map((item, idx) => (
                              <li key={idx}>
                                {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">No orders yet</div>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-brown text-white rounded-lg hover:bg-opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminCustomers;

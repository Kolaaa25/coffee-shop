import { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { menuAPI } from '../../services/admin';

const AdminMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'coffee',
    image: ''
  });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const data = await menuAPI.getAll();
      console.log('📋 Fetched menu items:', data);
      setItems(data);
    } catch (error) {
      console.error('❌ Error fetching menu:', error);
      alert('Failed to fetch menu items!');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'coffee',
      image: ''
    });
    setShowModal(true);
    console.log('🟢 Add modal opened');
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image || ''
    });
    setShowModal(true);
    console.log('🟡 Edit modal opened for:', item);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      setLoading(true);
      await menuAPI.delete(id);
      await fetchMenu();
      alert('Item deleted successfully!');
      console.log('🔴 Item deleted:', id);
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.price || Number(formData.price) <= 0) return 'Price must be greater than 0';
    if (!formData.category) return 'Category is required';
    if (!formData.description.trim()) return 'Description is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errorMsg = validateForm();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }
    
    setSubmitLoading(true);
    try {
      if (editingItem) {
        await menuAPI.update(editingItem.id, formData);
        alert('Item updated successfully!');
        console.log('🟡 Item updated:', editingItem.id);
      } else {
        await menuAPI.create(formData);
        alert('Item created successfully!');
        console.log('🟢 Item created:', formData.name);
      }
      
      setShowModal(false);
      await fetchMenu();
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save item');
    } finally {
      setSubmitLoading(false);
    }
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <button 
            onClick={handleAdd}
            className="bg-brown hover:bg-brown-dark text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add Item
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left">
                  <th className="pb-3 font-semibold">Image</th>
                  <th className="pb-3 font-semibold">Name</th>
                  <th className="pb-3 font-semibold">Price</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.length > 0 ? (
                  items.map((item) => (
                    <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50 transition">
                      <td className="py-4">
                        <img 
                          src={item.image || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23ddd" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E'} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg shadow-sm"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23f3f4f6" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="10"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </td>
                      <td className="py-4 font-medium">{item.name}</td>
                      <td className="py-4 font-semibold text-green-600">${item.price}</td>
                      <td className="py-4">
                        <span className="px-3 py-1 bg-brown bg-opacity-10 text-brown rounded-full text-sm capitalize">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-gray-600 max-w-xs truncate">{item.description}</td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEdit(item)}
                            className="p-2 text-brown hover:bg-brown hover:bg-opacity-10 rounded transition"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-lg font-medium">No menu items yet</p>
                        <p className="text-sm mt-1">Click "Add Item" to create your first menu item</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Add/Edit */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Preview */}
                {formData.image && (
                  <div className="flex justify-center">
                    <div className="relative">
                      <img 
                        src={formData.image} 
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="128" height="128"%3E%3Crect fill="%23f3f4f6" width="128" height="128"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999" font-family="Arial" font-size="12"%3EInvalid URL%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                      placeholder="e.g., Espresso"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                      placeholder="e.g., 4.50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                    required
                  >
                    <option value="coffee">☕ Coffee</option>
                    <option value="dessert">🍰 Dessert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                    rows="3"
                    placeholder="Describe your menu item..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                    <span className="text-gray-500 text-xs ml-2">(Unsplash, direct link, etc.)</span>
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brown focus:border-transparent"
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Tip: Visit <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-brown hover:underline">Unsplash.com</a>, 
                    right-click on an image → "Copy image address"
                  </p>
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <button
                    type="submit"
                    className="flex-1 bg-brown text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitLoading}
                  >
                    {submitLoading ? 'Saving...' : (editingItem ? '✓ Update Item' : '+ Create Item')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitLoading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMenu;

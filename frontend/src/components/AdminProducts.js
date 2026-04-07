import React, { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api';
import { getEmoji, hasImage } from '../utils/productImage';

const emptyForm = { name: '', price: '', category: '', stock: '', description: '', image: '' };

function AdminProducts({ refreshProducts, showToast }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchProducts = async () => {
    try { const data = await getProducts(); setProducts(data); }
    catch (error) { console.error('Failed to load products:', error.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.category || !form.stock) {
      showToast('Please fill all required fields', 'error'); return;
    }
    setSaving(true);
    try {
      const productData = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
      if (editingId) { await updateProduct(editingId, productData); showToast('Product updated successfully'); }
      else { await createProduct(productData); showToast('Product created successfully'); }
      setForm(emptyForm); setShowForm(false); setEditingId(null); fetchProducts(); refreshProducts();
    } catch (err) { showToast(err.message, 'error'); }
    finally { setSaving(false); }
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name, price: product.price.toString(), category: product.category,
      stock: product.stock.toString(), description: product.description || '', image: product.image || ''
    });
    setEditingId(product._id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    try { await deleteProduct(id); showToast('Product deleted successfully'); fetchProducts(); refreshProducts(); setDeleteConfirm(null); }
    catch (err) { showToast(err.message, 'error'); }
  };

  const handleCancel = () => { setShowForm(false); setEditingId(null); setForm(emptyForm); };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="container"><div className="loading-spinner"><div className="spinner"></div><p>Loading products...</p></div></div>;

  return (
    <div className="container">
      <div className="admin-header">
        <h1 className="page-title">📦 Manage Products</h1>
        <button className="btn-primary" onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}>+ Add Product</button>
      </div>

      {/* Product Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
              <button className="modal-close" onClick={handleCancel}>✕</button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group"><label>Product Name *</label><input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Fresh Apples" /></div>
                <div className="form-group"><label>Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    <option value="">Select category</option>
                    <option value="Fruits">Fruits</option><option value="Vegetables">Vegetables</option><option value="Dairy">Dairy</option>
                    <option value="Bakery">Bakery</option><option value="Meat">Meat</option><option value="Beverages">Beverages</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group"><label>Price ($) *</label><input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} placeholder="0.00" /></div>
                <div className="form-group"><label>Stock *</label><input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="0" /></div>
              </div>
              <div className="form-group"><label>Description</label><textarea name="description" value={form.description} onChange={handleChange} placeholder="Product description..." rows={3} /></div>

              {/* Image URL Field */}
              <div className="form-group">
                <label>Image URL</label>
                <input name="image" value={form.image} onChange={handleChange} placeholder="https://i.ibb.co/xxxxx/product.jpg" />
                <small className="form-hint">
                  Upload your image to <a href="https://imgbb.com/" target="_blank" rel="noreferrer">ImgBB</a>, <a href="https://postimages.org/" target="_blank" rel="noreferrer">Postimages</a>, or <a href="https://imgur.com/" target="_blank" rel="noreferrer">Imgur</a> and paste the direct link here.
                </small>
              </div>

              {/* Image Preview */}
              {form.image && form.image.trim() !== '' && (
                <div className="image-preview">
                  <p className="image-preview-label">Preview:</p>
                  <div className="image-preview-box">
                    <img
                      src={form.image}
                      alt="Preview"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                    />
                    <p className="image-preview-error" style={{ display: 'none' }}>⚠️ Could not load image. Check the URL.</p>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn-outline" onClick={handleCancel}>Cancel</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
                {saving ? 'Saving...' : (editingId ? 'Update Product' : 'Create Product')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-body" style={{ textAlign: 'center', padding: '30px' }}>
              <span style={{ fontSize: '48px' }}>⚠️</span>
              <h3 style={{ margin: '15px 0' }}>Delete Product?</h3>
              <p>This action cannot be undone.</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button className="btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="search-bar" style={{ marginBottom: '20px' }}>
        <span className="search-icon">🔍</span>
        <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr><th>Image</th><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map(product => (
              <tr key={product._id}>
                <td>
                  <div className="table-thumb">
                    {hasImage(product) ? (
                      <img src={product.image} alt={product.name} className="table-thumb-img" />
                    ) : (
                      <span className="table-thumb-emoji">{getEmoji(product.category)}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="product-cell">
                    <strong>{product.name}</strong>
                    {product.description && <small>{product.description.substring(0, 50)}...</small>}
                  </div>
                </td>
                <td><span className="category-tag">{product.category}</span></td>
                <td className="price-cell">${product.price.toFixed(2)}</td>
                <td><span className={`stock-badge ${product.stock < 10 ? 'low' : 'ok'}`}>{product.stock}</span></td>
                <td><div className="action-btns"><button className="btn-sm btn-edit" onClick={() => handleEdit(product)}>Edit</button><button className="btn-sm btn-delete" onClick={() => setDeleteConfirm(product._id)}>Delete</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="no-results" style={{ padding: '40px' }}><h3>No products found</h3></div>}
      </div>
    </div>
  );
}

export default AdminProducts;

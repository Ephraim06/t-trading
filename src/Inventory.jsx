// ==================== pages/Inventory.jsx ====================
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '././components/dashboard/DashboardLayout';
import InventoryHeader from '././components/inventory/InventoryHeader';
import InventoryStats from '././components/inventory/InventoryStats';
import InventoryFilters from '././components/inventory/InventoryFilters';
import InventoryTable from '././components/inventory/InventoryTable';
import InventoryCharts from '././components/inventory/InventoryCharts';
import LowStockAlert from '././components/inventory/LowStockAlert';
import AddProductModal from '././components/inventory/AddProductModal';
import EditProductModal from '././components/inventory/EditProductModal';
import DeleteConfirmModal from '././components/inventory/DeleteConfirmModal';
import BulkOrderModal from '././components/inventory/BulkOrderModal';

const Inventory = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockStatusFilter, setStockStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isBulkOrderModalOpen, setIsBulkOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    categories: 0,
  });

  // Mock product data - Replace with API call
  const mockProducts = [
    {
      id: 1,
      name: 'Oxygen Tanks',
      category: 'Industrial',
      grade: 'Industrial Grade - 200 Bar',
      sku: 'OXY-IND-200',
      quantity: 2847,
      unit: 'tanks',
      price: 450,
      location: 'Warehouse A - Bay 1',
      reorderLevel: 500,
      maxCapacity: 3500,
      status: 'In Stock',
      lastRestocked: '2024-01-15',
      supplier: 'Air Products SA',
      expiryDate: '2026-12-31',
      batchNumber: 'OXY-2024-001',
    },
    {
      id: 2,
      name: 'Argon Gas',
      category: 'Industrial',
      grade: 'Welding Grade - 150 Bar',
      sku: 'ARG-WLD-150',
      quantity: 1562,
      unit: 'cylinders',
      price: 320,
      location: 'Warehouse A - Bay 2',
      reorderLevel: 400,
      maxCapacity: 2500,
      status: 'In Stock',
      lastRestocked: '2024-01-10',
      supplier: 'African Gases',
      expiryDate: '2026-10-15',
      batchNumber: 'ARG-2024-002',
    },
    {
      id: 3,
      name: 'Nitrogen',
      category: 'Specialty',
      grade: 'Laboratory Grade - 200 Bar',
      sku: 'NIT-LAB-200',
      quantity: 943,
      unit: 'cylinders',
      price: 280,
      location: 'Warehouse B - Bay 1',
      reorderLevel: 300,
      maxCapacity: 1500,
      status: 'Low Stock',
      lastRestocked: '2023-12-20',
      supplier: 'Air Liquide',
      expiryDate: '2026-08-20',
      batchNumber: 'NIT-2023-045',
    },
    {
      id: 4,
      name: 'Acetylene',
      category: 'Industrial',
      grade: 'Welding Grade - 150 Bar',
      sku: 'ACE-WLD-150',
      quantity: 628,
      unit: 'cylinders',
      price: 390,
      location: 'Warehouse B - Bay 2',
      reorderLevel: 200,
      maxCapacity: 1000,
      status: 'Low Stock',
      lastRestocked: '2023-12-28',
      supplier: 'Afrox',
      expiryDate: '2025-12-31',
      batchNumber: 'ACE-2023-089',
    },
    {
      id: 5,
      name: 'Helium',
      category: 'Specialty',
      grade: 'Research Grade - 200 Bar',
      sku: 'HEL-RES-200',
      quantity: 15,
      unit: 'cylinders',
      price: 520,
      location: 'Warehouse C - Bay 1',
      reorderLevel: 50,
      maxCapacity: 200,
      status: 'Critical',
      lastRestocked: '2024-01-05',
      supplier: 'Helium SA',
      expiryDate: '2026-06-30',
      batchNumber: 'HEL-2024-012',
    },
    {
      id: 6,
      name: 'Carbon Dioxide',
      category: 'Specialty',
      grade: 'Food Grade - 150 Bar',
      sku: 'CO2-FOOD-150',
      quantity: 1873,
      unit: 'cylinders',
      price: 210,
      location: 'Warehouse A - Bay 3',
      reorderLevel: 500,
      maxCapacity: 2500,
      status: 'In Stock',
      lastRestocked: '2024-01-12',
      supplier: 'BOC Gases',
      expiryDate: '2026-09-15',
      batchNumber: 'CO2-2024-023',
    },
    {
      id: 7,
      name: 'Hydrogen',
      category: 'Specialty',
      grade: 'Fuel Cell Grade - 300 Bar',
      sku: 'HYD-FUEL-300',
      quantity: 22,
      unit: 'cylinders',
      price: 680,
      location: 'Warehouse C - Bay 2',
      reorderLevel: 40,
      maxCapacity: 100,
      status: 'Critical',
      lastRestocked: '2024-01-08',
      supplier: 'Hydrogen SA',
      expiryDate: '2026-11-30',
      batchNumber: 'HYD-2024-005',
    },
    {
      id: 8,
      name: 'Propane',
      category: 'Industrial',
      grade: 'Industrial Grade - 100 Bar',
      sku: 'PRO-IND-100',
      quantity: 2092,
      unit: 'cylinders',
      price: 180,
      location: 'Warehouse D - Bay 1',
      reorderLevel: 600,
      maxCapacity: 3000,
      status: 'In Stock',
      lastRestocked: '2024-01-14',
      supplier: 'TotalEnergies',
      expiryDate: '2026-12-31',
      batchNumber: 'PRO-2024-034',
    },
    {
      id: 9,
      name: 'Medical Air',
      category: 'Medical',
      grade: 'USP Grade - 150 Bar',
      sku: 'MED-AIR-150',
      quantity: 1878,
      unit: 'cylinders',
      price: 195,
      location: 'Warehouse B - Bay 3',
      reorderLevel: 400,
      maxCapacity: 2200,
      status: 'In Stock',
      lastRestocked: '2024-01-11',
      supplier: 'Medical Gases SA',
      expiryDate: '2026-10-31',
      batchNumber: 'MED-2024-018',
    },
    {
      id: 10,
      name: 'Nitrous Oxide',
      category: 'Medical',
      grade: 'Medical Grade - 150 Bar',
      sku: 'N2O-MED-150',
      quantity: 64,
      unit: 'cylinders',
      price: 430,
      location: 'Warehouse B - Bay 4',
      reorderLevel: 100,
      maxCapacity: 300,
      status: 'Low Stock',
      lastRestocked: '2023-12-18',
      supplier: 'Medical Gases SA',
      expiryDate: '2025-12-31',
      batchNumber: 'N2O-2023-067',
    },
  ];

  // Fetch products on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (!token || !userData) {
      navigate('/login', { state: { from: '/inventory' } });
      return;
    }

    setUser(JSON.parse(userData));
    loadProducts();
  }, [navigate]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      // const response = await fetch('/api/inventory');
      // const data = await response.json();

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setProducts(mockProducts);
      calculateStats(mockProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (productsList) => {
    const totalValue = productsList.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0,
    );
    const lowStockCount = productsList.filter(
      (p) => p.status === 'Low Stock',
    ).length;
    const outOfStockCount = productsList.filter(
      (p) => p.status === 'Critical',
    ).length;
    const categories = [...new Set(productsList.map((p) => p.category))].length;

    setStats({
      totalProducts: productsList.length,
      totalValue,
      lowStockCount,
      outOfStockCount,
      categories,
    });
  };

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    // Stock status filter
    if (stockStatusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === stockStatusFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'quantity') return b.quantity - a.quantity;
      if (sortBy === 'price') return b.price - a.price;
      if (sortBy === 'status') return a.status.localeCompare(b.status);
      return 0;
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, categoryFilter, stockStatusFilter, sortBy]);

  // Product CRUD operations
  const handleAddProduct = async (productData) => {
    try {
      // Replace with API call
      const newProduct = {
        id: products.length + 1,
        ...productData,
        quantity: 0,
        status: 'Critical',
        lastRestocked: new Date().toISOString().split('T')[0],
      };
      setProducts([...products, newProduct]);
      calculateStats([...products, newProduct]);
      return true;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const updatedProducts = products.map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p,
      );
      setProducts(updatedProducts);
      calculateStats(updatedProducts);
      return true;
    } catch (error) {
      console.error('Error editing product:', error);
      return false;
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);
      calculateStats(updatedProducts);
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  const handleBulkOrder = async (orderData) => {
    try {
      // Replace with API call to create purchase order
      console.log('Bulk order created:', orderData);
      return true;
    } catch (error) {
      console.error('Error creating bulk order:', error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('remember_me');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center h-screen bg-gray-50'>
        <div className='text-center'>
          <div className='w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <div className='flex-1 overflow-y-auto'>
        <InventoryHeader
          title='Inventory Management'
          subtitle='Track and manage your gas products inventory'
          onAddProduct={() => setIsAddModalOpen(true)}
          onBulkOrder={() => setIsBulkOrderModalOpen(true)}
        />

        <main className='p-4 sm:p-6 lg:p-8'>
          <InventoryStats stats={stats} />

          <InventoryFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
            stockStatusFilter={stockStatusFilter}
            onStockStatusChange={setStockStatusFilter}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <LowStockAlert
            products={products.filter(
              (p) => p.status === 'Low Stock' || p.status === 'Critical',
            )}
          />

          <InventoryTable
            products={filteredProducts}
            onEdit={(product) => {
              setSelectedProduct(product);
              setIsEditModalOpen(true);
            }}
            onDelete={(product) => {
              setSelectedProduct(product);
              setIsDeleteModalOpen(true);
            }}
          />

          <InventoryCharts products={products} />
        </main>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddProduct}
      />

      <EditProductModal
        isOpen={isEditModalOpen}
        product={selectedProduct}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleEditProduct}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        product={selectedProduct}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
      />

      <BulkOrderModal
        isOpen={isBulkOrderModalOpen}
        onClose={() => setIsBulkOrderModalOpen(false)}
        onSubmit={handleBulkOrder}
        products={products.filter(
          (p) => p.status === 'Low Stock' || p.status === 'Critical',
        )}
      />
    </DashboardLayout>
  );
};

export default Inventory;

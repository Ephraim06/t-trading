import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '././components/dashboard/DashboardLayout';
import DashboardHeader from '././components/dashboard/DashboardHeader';
import WelcomeBanner from '././components/dashboard/WelcomeBanner';
import KPICards from '././components/dashboard/KPICards';
import ChartsSection from '././components/dashboard/ChartsSection';
import OrdersAndActivities from '././components/dashboard/OrdersAndActivities';
import QuickActionsAndProducts from '././components/dashboard/QuickActionsAndProducts';
import RecentCustomers from '././components/dashboard/RecentCustomers';
import FooterStats from '././components/dashboard/FooterStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API calls
  const [kpiData, setKpiData] = useState({
    totalProducts: 2847,
    productsGrowth: 12.5,
    activeOrders: 156,
    ordersInTransit: 24,
    monthlyRevenue: 48293,
    revenueTarget: 65000,
    pendingAlerts: 3,
  });

  const [revenueData, setRevenueData] = useState([
    { day: 'Mon', current: 45, previous: 32 },
    { day: 'Tue', current: 58, previous: 38 },
    { day: 'Wed', current: 68, previous: 45 },
    { day: 'Thu', current: 76, previous: 52 },
    { day: 'Fri', current: 65, previous: 48 },
    { day: 'Sat', current: 52, previous: 38 },
    { day: 'Sun', current: 35, previous: 25 },
  ]);

  const [inventoryData, setInventoryData] = useState([
    { name: 'Oxygen Tanks', percentage: 85, color: '#3b82f6' },
    { name: 'Argon Gas', percentage: 62, color: '#6366f1' },
    { name: 'Nitrogen', percentage: 43, color: '#a855f7' },
    { name: 'Acetylene', percentage: 28, color: '#f59e0b' },
    { name: 'Helium', percentage: 71, color: '#10b981' },
  ]);

  const [recentOrders, setRecentOrders] = useState([
    {
      id: 'ORD-001',
      customer: 'Acme Corp',
      initials: 'AC',
      product: 'Oxygen Tanks',
      status: 'Delivered',
      statusColor: 'green',
      amount: 2450,
    },
    {
      id: 'ORD-002',
      customer: 'Mining Inc',
      initials: 'MI',
      product: 'Argon Gas',
      status: 'In Transit',
      statusColor: 'blue',
      amount: 3800,
    },
    {
      id: 'ORD-003',
      customer: 'St. Health',
      initials: 'SH',
      product: 'Medical O2',
      status: 'Processing',
      statusColor: 'amber',
      amount: 1250,
    },
    {
      id: 'ORD-004',
      customer: 'Energy Corp',
      initials: 'EC',
      product: 'Nitrogen',
      status: 'In Transit',
      statusColor: 'blue',
      amount: 5600,
    },
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'success',
      message: 'Order #ORD-001 delivered',
      time: '2 hours ago',
      user: 'Edward B.',
    },
    {
      id: 2,
      type: 'info',
      message: 'Invoice #INV-045 generated',
      time: '5 hours ago',
      user: 'Sarah',
    },
    {
      id: 3,
      type: 'warning',
      message: 'New shipment dispatched',
      time: 'Yesterday',
      user: 'Truck #T-789',
    },
    {
      id: 4,
      type: 'info',
      message: 'New customer registered',
      time: 'Yesterday',
      user: 'SteelTech Industries',
    },
    {
      id: 5,
      type: 'error',
      message: 'Low stock alert: Argon',
      time: '2 days ago',
      user: 'Reorder pending',
    },
    {
      id: 6,
      type: 'info',
      message: 'Maintenance completed',
      time: '2 days ago',
      user: 'Tank #T-456',
    },
  ]);

  const [topProducts, setTopProducts] = useState([
    {
      name: 'Oxygen Tanks',
      grade: 'Industrial Grade',
      price: 450,
      sold: 124,
      gradient: 'from-blue-500 to-blue-600',
      icon: 'FireIcon',
    },
    {
      name: 'Argon Gas',
      grade: 'Welding Grade',
      price: 320,
      sold: 89,
      gradient: 'from-indigo-500 to-indigo-600',
      icon: 'BeakerIcon',
    },
    {
      name: 'Nitrogen',
      grade: 'Laboratory Grade',
      price: 280,
      sold: 67,
      gradient: 'from-purple-500 to-purple-600',
      icon: 'CloudIcon',
    },
    {
      name: 'Acetylene',
      grade: 'Welding Grade',
      price: 390,
      sold: 42,
      gradient: 'from-amber-500 to-amber-600',
      icon: 'BoltIcon',
    },
  ]);

  const [recentCustomers, setRecentCustomers] = useState([
    {
      name: 'Acme Corporation',
      initials: 'AC',
      lastOrder: '2 days ago',
      color: 'blue',
    },
    {
      name: 'Mining Industries',
      initials: 'MI',
      lastOrder: '3 days ago',
      color: 'purple',
    },
    {
      name: 'St. Health Medical',
      initials: 'SH',
      lastOrder: '5 days ago',
      color: 'green',
    },
    {
      name: 'Energy Corp',
      initials: 'EC',
      lastOrder: '1 day ago',
      color: 'amber',
    },
  ]);

  const [footerStats, setFooterStats] = useState([
    {
      label: 'On-Time Delivery',
      value: '98.5%',
      change: '+2.3%',
      positive: true,
      icon: 'TruckIcon',
    },
    {
      label: 'Customer Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      positive: true,
      icon: 'CheckCircleIcon',
    },
    {
      label: 'Avg. Response Time',
      value: '2.4h',
      change: '-0.5h',
      positive: true,
      icon: 'Cog6ToothIcon',
    },
    {
      label: 'Inventory Turnover',
      value: '6.2x',
      change: '+1.1x',
      positive: true,
      icon: 'ChartBarIcon',
    },
  ]);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (!token || !userData) {
      navigate('/login', { state: { from: '/dashboard' } });
      return;
    }

    setUser(JSON.parse(userData));
    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Replace with actual API calls
      // const response = await fetch('/api/dashboard');
      // const data = await response.json();
      // setKpiData(data.kpi);
      // setRevenueData(data.revenue);
      // etc.

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
          <p className='text-gray-600'>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout user={user} onLogout={handleLogout}>
      <DashboardHeader />
      <main className='flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50'>
        <WelcomeBanner userName={user?.name} />
        <KPICards data={kpiData} />
        <ChartsSection
          revenueData={revenueData}
          inventoryData={inventoryData}
        />
        <OrdersAndActivities orders={recentOrders} activities={activities} />
        <QuickActionsAndProducts products={topProducts} />
        <RecentCustomers customers={recentCustomers} />
        <FooterStats stats={footerStats} />
      </main>
    </DashboardLayout>
  );
};

export default Dashboard;

import React from 'react';
import { 
  Users, 
  Package, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Activity
} from 'lucide-react';

interface DashboardProps {
  patients: any[];
  products: any[];
  sales: any[];
  expenses: any[];
  invoices: any[];
}

export default function Dashboard({ patients, products, sales, expenses, invoices }: DashboardProps) {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const lowStockProducts = products.filter(product => product.stock <= product.minStock);
  const overdueInvoices = invoices.filter(invoice => invoice.status === 'overdue');

  const stats = [
    {
      title: 'Total Patients',
      value: patients.length,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%'
    },
    {
      title: 'Products in Stock',
      value: products.length,
      icon: Package,
      color: 'bg-emerald-500',
      change: '-3%'
    },
    {
      title: 'Monthly Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'bg-green-500',
      change: '+18%'
    },
    {
      title: 'Total Expenses',
      value: `₹${totalExpenses.toLocaleString()}`,
      icon: FileText,
      color: 'bg-orange-500',
      change: '+5%'
    }
  ];

  const alerts = [
    ...(lowStockProducts.length > 0 ? [{
      type: 'warning' as const,
      title: 'Low Stock Alert',
      message: `${lowStockProducts.length} products are running low`,
      icon: Package
    }] : []),
    ...(overdueInvoices.length > 0 ? [{
      type: 'error' as const,
      title: 'Overdue Invoices',
      message: `${overdueInvoices.length} invoices are overdue`,
      icon: AlertTriangle
    }] : [])
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">RITHISH Medical Management System</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm font-medium text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className={`${stat.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            System Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => {
              const Icon = alert.icon;
              return (
                <div 
                  key={index}
                  className={`flex items-center p-4 rounded-lg ${
                    alert.type === 'warning' 
                      ? 'bg-amber-50 border border-amber-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${
                    alert.type === 'warning' ? 'text-amber-500' : 'text-red-500'
                  }`} />
                  <div>
                    <h3 className={`font-medium ${
                      alert.type === 'warning' ? 'text-amber-800' : 'text-red-800'
                    }`}>
                      {alert.title}
                    </h3>
                    <p className={`text-sm ${
                      alert.type === 'warning' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {alert.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Sales</h2>
          <div className="space-y-3">
            {sales.slice(0, 5).map((sale, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{sale.productName}</p>
                  <p className="text-sm text-gray-500">Qty: {sale.quantity}</p>
                </div>
                <span className="font-semibold text-green-600">₹{sale.totalAmount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Products</h2>
          <div className="space-y-3">
            {lowStockProducts.slice(0, 5).map((product, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold bg-red-100 text-red-800 rounded-full">
                  {product.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
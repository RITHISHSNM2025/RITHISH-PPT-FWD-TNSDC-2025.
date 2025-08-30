import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import PatientManager from './components/PatientManager';
import ProductManager from './components/ProductManager';
import ExpenseTracker from './components/ExpenseTracker';
import BillingSystem from './components/BillingSystem';
import type { Patient, Product, Sale, Expense, Invoice } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  // Initialize with sample data
  useEffect(() => {
    const samplePatients: Patient[] = [
      {
        id: '1',
        name: 'John Smith',
        phone: '+1-555-0123',
        email: 'john.smith@email.com',
        address: '123 Main St, Anytown, USA',
        dateOfBirth: '1980-05-15',
        bloodGroup: 'O+',
        allergies: ['Penicillin'],
        medicalHistory: 'Hypertension, controlled with medication',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        phone: '+1-555-0124',
        email: 'sarah.johnson@email.com',
        address: '456 Oak Ave, Somewhere, USA',
        dateOfBirth: '1992-08-22',
        bloodGroup: 'A-',
        allergies: ['Aspirin', 'Shellfish'],
        medicalHistory: 'No significant medical history',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Aspirin 325mg',
        category: 'Pain Relief',
        price: 1099,
        stock: 150,
        minStock: 25,
        description: 'Over-the-counter pain reliever and anti-inflammatory',
        manufacturer: 'PharmaCorp',
        expiryDate: '2025-12-31',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Blood Pressure Monitor',
        category: 'Medical Equipment',
        price: 7599,
        stock: 8,
        minStock: 10,
        description: 'Digital blood pressure monitor with LCD display',
        manufacturer: 'MedTech Solutions',
        expiryDate: '2027-06-30',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Insulin Pens',
        category: 'Diabetes Care',
        price: 3850,
        stock: 0,
        minStock: 15,
        description: 'Disposable insulin delivery pens',
        manufacturer: 'DiabetesCare Inc',
        expiryDate: '2025-03-15',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const sampleExpenses: Expense[] = [
      {
        id: '1',
        title: 'Medical Supplies Restock',
        category: 'Medical Supplies',
        amount: 207075,
        description: 'Monthly restock of basic medical supplies',
        date: '2024-01-15',
        supplier: 'MedSupply Co.',
        receiptNumber: 'MS-2024-001',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Equipment Maintenance',
        category: 'Equipment',
        amount: 71875,
        description: 'Annual maintenance for X-ray machine',
        date: '2024-01-10',
        supplier: 'TechService Ltd',
        receiptNumber: 'TS-2024-045',
        createdAt: new Date().toISOString()
      }
    ];

    const sampleSales: Sale[] = [
      {
        id: '1',
        productId: '1',
        productName: 'Aspirin 325mg',
        quantity: 5,
        unitPrice: 1099,
        totalAmount: 5495,
        customerId: '1',
        customerName: 'John Smith',
        saleDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        productId: '2',
        productName: 'Blood Pressure Monitor',
        quantity: 1,
        unitPrice: 7599,
        totalAmount: 7599,
        customerId: '2',
        customerName: 'Sarah Johnson',
        saleDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      }
    ];

    setPatients(samplePatients);
    setProducts(sampleProducts);
    setExpenses(sampleExpenses);
    setSales(sampleSales);
    setInvoices([]);
  }, []);

  const handleAddPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPatients([...patients, newPatient]);
  };

  const handleUpdatePatient = (id: string, updates: Partial<Patient>) => {
    setPatients(patients.map(patient => 
      patient.id === id 
        ? { ...patient, ...updates, updatedAt: new Date().toISOString() }
        : patient
    ));
  };

  const handleDeletePatient = (id: string) => {
    setPatients(patients.filter(patient => patient.id !== id));
  };

  const handleAddProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProducts([...products, newProduct]);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    ));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleUpdateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { ...expense, ...updates } : expense
    ));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const handleAddInvoice = (invoiceData: Omit<Invoice, 'id' | 'createdAt'>) => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setInvoices([...invoices, newInvoice]);
  };

  const handleUpdateInvoice = (id: string, updates: Partial<Invoice>) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === id ? { ...invoice, ...updates } : invoice
    ));
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard 
            patients={patients}
            products={products}
            sales={sales}
            expenses={expenses}
            invoices={invoices}
          />
        );
      case 'patients':
        return (
          <PatientManager
            patients={patients}
            onAddPatient={handleAddPatient}
            onUpdatePatient={handleUpdatePatient}
            onDeletePatient={handleDeletePatient}
          />
        );
      case 'products':
        return (
          <ProductManager
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        );
      case 'expenses':
        return (
          <ExpenseTracker
            expenses={expenses}
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            onDeleteExpense={handleDeleteExpense}
          />
        );
      case 'billing':
        return (
          <BillingSystem
            invoices={invoices}
            patients={patients}
            onAddInvoice={handleAddInvoice}
            onUpdateInvoice={handleUpdateInvoice}
          />
        );
      default:
        return <Dashboard patients={patients} products={products} sales={sales} expenses={expenses} invoices={invoices} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8 overflow-auto">
        {renderActiveTab()}
      </main>
    </div>
  );
}

export default App;
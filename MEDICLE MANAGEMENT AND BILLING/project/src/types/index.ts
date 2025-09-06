export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  dateOfBirth: string;
  bloodGroup: string;
  allergies: string[];
  medicalHistory: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  minStock: number;
  description: string;
  manufacturer: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerId?: string;
  customerName?: string;
  saleDate: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  title: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  supplier?: string;
  receiptNumber?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  visitDate: string;
  diagnosis: string;
  symptoms: string[];
  treatment: string;
  prescription: string;
  followUpDate?: string;
  notes: string;
  createdAt: string;
}
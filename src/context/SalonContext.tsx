'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  Salon,
  Role,
  Customer,
  Employee,
  Service,
  QueueEntry,
  Appointment,
  Product,
  Offer,
  WhatsAppTemplate,
  WeddingBooking,
  Task,
  RatingReview,
  SalonInsight,
  DailyClosingSummary,
  QueueStatus,
  SalonTenant,
  SaaSInvoice
} from '../types';
import {
  initialSalon,
  initialServices,
  initialEmployees,
  initialCustomers,
  initialQueueEntries,
  initialAppointments,
  initialProducts,
  initialOffers,
  initialWhatsAppTemplates,
  initialWeddingBookings,
  initialTasks,
  initialRatings,
  initialInsights,
  initialDailyClosingSummary
} from '../data/initialData';

interface AddCustomerInput {
  name: string;
  phone: string;
  gender: 'male' | 'female' | 'other';
  ageGroup: 'kids' | 'adult' | 'senior';
  serviceIds: string[];
  preferredEmployeeId?: string;
  visitType: 'walk_in' | 'appointment';
  notes?: string;
}

interface SalonContextType {
  salon: Salon;
  updateSalon: (data: Partial<Salon>) => void;
  role: Role;
  setRole: (role: Role) => void;
  isAuthenticated: boolean;
  loginWithPasskey: (targetRole: Role, passkey: string, employeeId?: string) => { success: boolean; error?: string };
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeStylistId: string;

  // Super Admin Fleet & Payment Inspection State
  salonsList: SalonTenant[];
  invoicesList: SaaSInvoice[];
  addSalonTenant: (tenant: Omit<SalonTenant, 'id' | 'createdAt' | 'planStartDate' | 'planEndDate' | 'paymentStatus' | 'ownerUsername' | 'ownerPasskey'>) => SalonTenant;
  removeSalonTenant: (salonId: string) => void;
  sendSaaSInvoice: (invoice: Omit<SaaSInvoice, 'id' | 'status'>) => void;
  updateSalonTenantPlan: (salonId: string, plan: 'Starter' | 'Professional' | 'Premium', planEndDate: string) => void;
  confirmPaymentAndDispatchCredentials: (salonId: string) => { success: boolean; credentialsAlert?: string };
  
  // Entities
  services: Service[];
  employees: Employee[];
  customers: Customer[];
  queue: QueueEntry[];
  appointments: Appointment[];
  products: Product[];
  offers: Offer[];
  templates: WhatsAppTemplate[];
  weddingBookings: WeddingBooking[];
  tasks: Task[];
  ratings: RatingReview[];
  insights: SalonInsight[];
  closingSummary: DailyClosingSummary;

  // Modals & UI States
  isAddCustomerOpen: boolean;
  setIsAddCustomerOpen: (open: boolean) => void;
  ratingModalQueueItem: QueueEntry | null;
  setRatingModalQueueItem: (item: QueueEntry | null) => void;
  selectedCustomerForDetail: Customer | null;
  setSelectedCustomerForDetail: (customer: Customer | null) => void;

  // Actions
  addCustomerAndQueue: (input: AddCustomerInput) => { customer: Customer; queueEntry: QueueEntry; isReturning: boolean };
  updateQueueStatus: (queueId: string, status: QueueStatus, employeeId?: string) => void;
  transferQueueEmployee: (queueId: string, newEmployeeId: string) => void;
  submitRating: (queueItem: QueueEntry, stars: number, tags: string[], comment?: string) => void;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  checkInAppointment: (appointmentId: string) => void;
  updateProductStock: (productId: string, quantityToAdd: number) => void;
  addProduct: (product: Omit<Product, 'id' | 'status'>) => void;
  addOffer: (offer: Omit<Offer, 'id' | 'claimedCount'>) => void;
  addWeddingBooking: (booking: Omit<WeddingBooking, 'id'>) => void;
  addTask: (task: Omit<Task, 'id' | 'status'>) => void;
  toggleTaskStatus: (taskId: string) => void;
  closeSalonDay: () => void;
  resetToDemoData: () => void;
  findCustomerByPhone: (phone: string) => Customer | undefined;
  addOrUpdateEmployee: (emp: Partial<Employee>) => void;
}

const initialSalonsList: SalonTenant[] = [
  { id: 'salon-101', name: 'Style Studio Salon', ownerName: 'Rahul Sharma', ownerEmail: 'rahul@stylestudio.in', phone: '+91 98765 43210', type: 'unisex', plan: 'Professional', monthlyFee: 599, createdAt: '2025-01-10', planStartDate: '2026-08-01', planEndDate: '2027-08-01', paymentStatus: 'paid', ownerUsername: 'owner_rahul', ownerPasskey: '1234' },
  { id: 'salon-102', name: 'Velvet Lounge & Spa', ownerName: 'Ananya Verma', ownerEmail: 'ananya@velvetlounge.in', phone: '+91 98111 55443', type: 'womens', plan: 'Premium', monthlyFee: 999, createdAt: '2025-03-15', planStartDate: '2026-08-01', planEndDate: '2027-08-01', paymentStatus: 'paid', ownerUsername: 'owner_ananya', ownerPasskey: '1234' },
  { id: 'salon-103', name: 'Crown Gentlemen Barber', ownerName: 'Vikram Singh', ownerEmail: 'vikram@crownbarber.in', phone: '+91 98222 33112', type: 'mens', plan: 'Starter', monthlyFee: 299, createdAt: '2025-06-20', planStartDate: '2026-08-01', planEndDate: '2026-09-01', paymentStatus: 'payment_pending', ownerUsername: 'owner_vikram', ownerPasskey: '1234' },
  { id: 'salon-104', name: 'Luxe Hair & Beauty Parlour', ownerName: 'Priya Mehta', ownerEmail: 'priya@luxeparlour.in', phone: '+91 98333 44221', type: 'womens', plan: 'Professional', monthlyFee: 599, createdAt: '2025-09-01', planStartDate: '2026-08-01', planEndDate: '2027-08-01', paymentStatus: 'paid', ownerUsername: 'owner_priya', ownerPasskey: '1234' }
];

const initialInvoicesList: SaaSInvoice[] = [
  { id: 'inv-901', salonId: 'salon-101', salonName: 'Style Studio Salon', amount: 599, billingPeriod: 'monthly', dueDate: '2026-09-01', status: 'paid' },
  { id: 'inv-902', salonId: 'salon-102', salonName: 'Velvet Lounge & Spa', amount: 999, billingPeriod: 'monthly', dueDate: '2026-09-01', status: 'paid' },
  { id: 'inv-903', salonId: 'salon-103', salonName: 'Crown Gentlemen Barber', amount: 3588, billingPeriod: 'yearly', dueDate: '2026-09-15', status: 'pending' }
];

const SalonContext = createContext<SalonContextType | undefined>(undefined);

export const SalonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [salon, setSalon] = useState<Salon>(initialSalon);
  const [role, setRoleState] = useState<Role>('super_admin');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('superadmin');
  const [activeStylistId, setActiveStylistId] = useState<string>('emp-1');

  // Super Admin Fleet State
  const [salonsList, setSalonsList] = useState<SalonTenant[]>(initialSalonsList);
  const [invoicesList, setInvoicesList] = useState<SaaSInvoice[]>(initialInvoicesList);

  const [services, setServices] = useState<Service[]>(initialServices);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [queue, setQueue] = useState<QueueEntry[]>(initialQueueEntries);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [templates] = useState<WhatsAppTemplate[]>(initialWhatsAppTemplates);
  const [weddingBookings, setWeddingBookings] = useState<WeddingBooking[]>(initialWeddingBookings);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [ratings, setRatings] = useState<RatingReview[]>(initialRatings);
  const [insights, setInsights] = useState<SalonInsight[]>(initialInsights);
  const [closingSummary, setClosingSummary] = useState<DailyClosingSummary>(initialDailyClosingSummary);

  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState<boolean>(false);
  const [ratingModalQueueItem, setRatingModalQueueItem] = useState<QueueEntry | null>(null);
  const [selectedCustomerForDetail, setSelectedCustomerForDetail] = useState<Customer | null>(null);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
  };

  // Passkey Login Logic
  const loginWithPasskey = (targetRole: Role, passkey: string, employeeId?: string) => {
    const validSuperKeys = ['9999', 'admin9999', 'superadmin'];
    const validOwnerKeys = ['1234', 'owner123', 'admin'];

    if (targetRole === 'super_admin' && validSuperKeys.includes(passkey.trim())) {
      setRoleState('super_admin');
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      setActiveTab('superadmin');
      return { success: true };
    }

    if (targetRole === 'owner' && validOwnerKeys.includes(passkey.trim())) {
      setRoleState('owner');
      setIsAuthenticated(true);
      setIsAuthModalOpen(false);
      setActiveTab('dashboard');
      return { success: true };
    }

    if (targetRole === 'stylist') {
      const empMatch = employees.find(e => e.id === employeeId);
      const isCustomKey = empMatch && empMatch.passkey && empMatch.passkey === passkey.trim();
      const defaultStylistKeys = ['5678', 'stylist123', 'stylist', '1001', '1002'];

      if (isCustomKey || defaultStylistKeys.includes(passkey.trim())) {
        setRoleState('stylist');
        if (employeeId) setActiveStylistId(employeeId);
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
        setActiveTab('stylist_dashboard');
        return { success: true };
      }
    }

    return {
      success: false,
      error: `Invalid Passkey PIN. (Demo PIN: SuperAdmin=9999, Owner=1234, Stylist=5678)`
    };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
  };

  // Super Admin Actions
  const addSalonTenant = (tenant: Omit<SalonTenant, 'id' | 'createdAt' | 'planStartDate' | 'planEndDate' | 'paymentStatus' | 'ownerUsername' | 'ownerPasskey'>) => {
    const nextId = `salon-${Date.now()}`;
    const cleanOwnerName = tenant.ownerName.toLowerCase().replace(/\s+/g, '_');
    const newTenant: SalonTenant = {
      ...tenant,
      id: nextId,
      createdAt: new Date().toISOString().split('T')[0],
      planStartDate: new Date().toISOString().split('T')[0],
      planEndDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      paymentStatus: 'payment_pending',
      ownerUsername: `owner_${cleanOwnerName}`,
      ownerPasskey: '1234'
    };

    setSalonsList(prev => [newTenant, ...prev]);
    return newTenant;
  };

  const removeSalonTenant = (salonId: string) => {
    setSalonsList(prev => prev.filter(s => s.id !== salonId));
  };

  const sendSaaSInvoice = (invoice: Omit<SaaSInvoice, 'id' | 'status'>) => {
    const newInv: SaaSInvoice = {
      ...invoice,
      id: `inv-${Date.now()}`,
      status: 'pending'
    };
    setInvoicesList(prev => [newInv, ...prev]);
  };

  const updateSalonTenantPlan = (salonId: string, plan: 'Starter' | 'Professional' | 'Premium', planEndDate: string) => {
    const fee = plan === 'Starter' ? 299 : plan === 'Professional' ? 599 : 999;
    setSalonsList(prev => prev.map(s => s.id === salonId ? {
      ...s,
      plan,
      monthlyFee: fee,
      planEndDate
    } : s));
  };

  const confirmPaymentAndDispatchCredentials = (salonId: string) => {
    const target = salonsList.find(s => s.id === salonId);
    if (!target) return { success: false };

    const startDate = new Date().toISOString().split('T')[0];
    const endDate = new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0];

    setSalonsList(prev => prev.map(s => s.id === salonId ? {
      ...s,
      paymentStatus: 'paid',
      planStartDate: startDate,
      planEndDate: endDate
    } : s));

    const msg = `🎉 Payment Confirmed for ${target.name}!\n\nCredentials Sent via WhatsApp & Email to ${target.ownerName} (${target.phone} / ${target.ownerEmail}):\n• Salon URL: https://salonflow.in/login\n• Username: ${target.ownerUsername}\n• Passkey PIN: ${target.ownerPasskey}`;
    return { success: true, credentialsAlert: msg };
  };

  const updateSalon = (data: Partial<Salon>) => {
    setSalon(prev => ({ ...prev, ...data }));
  };

  const addOrUpdateEmployee = (empData: Partial<Employee>) => {
    if (empData.id) {
      setEmployees(prev => prev.map(e => e.id === empData.id ? { ...e, ...empData } : e));
    } else {
      const newEmp: Employee = {
        id: `emp-${Date.now()}`,
        name: empData.name || 'New Stylist',
        photo: empData.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
        position: empData.position || 'Stylist',
        specialization: empData.specialization || 'Hair Styling',
        experienceYears: empData.experienceYears || 3,
        joiningDate: new Date().toISOString().split('T')[0],
        workingHours: '10:00 AM - 08:00 PM',
        servicesProvided: ['Haircut'],
        commissionPercentage: empData.commissionPercentage || 15,
        status: 'active',
        phone: empData.phone || '+91 98765 00000',
        username: empData.username,
        passkey: empData.passkey || '5678',
        customersServedToday: 0,
        avgServiceTimeMins: 25,
        rating: 5.0,
        ratingsCount: 1,
        revenueGeneratedToday: 0,
        repeatCustomersToday: 0,
        complaintsCount: 0,
        attendanceDays: 26,
        performanceScore: 85
      };
      setEmployees(prev => [...prev, newEmp]);
    }
  };

  const findCustomerByPhone = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (!cleaned) return undefined;
    return customers.find(c => c.phone.replace(/\D/g, '').includes(cleaned));
  };

  const addCustomerAndQueue = (input: AddCustomerInput) => {
    const existing = findCustomerByPhone(input.phone);
    let customerObj: Customer;
    let isReturning = false;

    const selectedServices = services.filter(s => input.serviceIds.includes(s.id));
    const totalAmount = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const serviceNames = selectedServices.map(s => s.name);
    const prefEmp = employees.find(e => e.id === input.preferredEmployeeId);

    if (existing) {
      isReturning = true;
      customerObj = {
        ...existing,
        totalVisits: existing.totalVisits + 1,
        totalSpent: existing.totalSpent + totalAmount,
        avgBill: Math.round((existing.totalSpent + totalAmount) / (existing.totalVisits + 1)),
        lastVisitDate: new Date().toISOString().split('T')[0],
        category: existing.totalVisits >= 10 ? 'VIP' : 'Regular'
      };
      setCustomers(prev => prev.map(c => c.id === existing.id ? customerObj : c));
    } else {
      isReturning = false;
      const newId = `cust-${Date.now()}`;
      customerObj = {
        id: newId,
        name: input.name,
        phone: input.phone,
        gender: input.gender,
        ageGroup: input.ageGroup,
        customerSince: new Date().toISOString().split('T')[0],
        category: 'New',
        totalVisits: 1,
        totalSpent: totalAmount,
        avgBill: totalAmount,
        lastVisitDate: new Date().toISOString().split('T')[0],
        avgVisitFrequencyDays: 0,
        favoriteEmployeeId: prefEmp?.id,
        favoriteEmployeeName: prefEmp?.name,
        favoriteService: serviceNames[0],
        visitHistory: []
      };
      setCustomers(prev => [customerObj, ...prev]);
    }

    const nextToken = Math.max(...queue.map(q => q.tokenNumber), 20) + 1;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newQueueEntry: QueueEntry = {
      id: `q-${Date.now()}`,
      tokenNumber: nextToken,
      customerId: customerObj.id,
      customerName: customerObj.name,
      customerPhone: customerObj.phone,
      customerGender: customerObj.gender,
      ageGroup: customerObj.ageGroup,
      isReturning,
      serviceIds: input.serviceIds,
      serviceNames,
      totalAmount,
      preferredEmployeeId: prefEmp?.id,
      preferredEmployeeName: prefEmp?.name,
      assignedEmployeeId: prefEmp?.id,
      assignedEmployeeName: prefEmp?.name,
      arrivalTime: nowTime,
      waitingTimeMins: 0,
      status: 'waiting',
      visitType: input.visitType,
      notes: input.notes
    };

    setQueue(prev => [newQueueEntry, ...prev]);

    setClosingSummary(prev => ({
      ...prev,
      totalCustomers: prev.totalCustomers + 1,
      newCustomers: isReturning ? prev.newCustomers : prev.newCustomers + 1,
      returningCustomers: isReturning ? prev.returningCustomers + 1 : prev.returningCustomers,
      totalRevenue: prev.totalRevenue + totalAmount,
      serviceRevenue: prev.serviceRevenue + totalAmount,
      walkInsCount: input.visitType === 'walk_in' ? prev.walkInsCount + 1 : prev.walkInsCount
    }));

    return { customer: customerObj, queueEntry: newQueueEntry, isReturning };
  };

  const updateQueueStatus = (queueId: string, status: QueueStatus, employeeId?: string) => {
    setQueue(prev => prev.map(q => {
      if (q.id !== queueId) return q;

      const updated = { ...q, status };
      const empToAssign = employees.find(e => e.id === (employeeId || q.assignedEmployeeId || q.preferredEmployeeId));

      if (empToAssign) {
        updated.assignedEmployeeId = empToAssign.id;
        updated.assignedEmployeeName = empToAssign.name;
      }

      if (status === 'in_service') {
        updated.startTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }

      if (status === 'completed') {
        updated.endTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (updated.assignedEmployeeId) {
          setEmployees(empList => empList.map(e => {
            if (e.id !== updated.assignedEmployeeId) return e;
            const served = e.customersServedToday + 1;
            const rev = e.revenueGeneratedToday + updated.totalAmount;
            const repeats = updated.isReturning ? e.repeatCustomersToday + 1 : e.repeatCustomersToday;
            const score = Math.min(100, Math.round((e.rating * 15) + (served * 2.5) + (repeats * 4) + (rev / 300)));
            return {
              ...e,
              customersServedToday: served,
              revenueGeneratedToday: rev,
              repeatCustomersToday: repeats,
              performanceScore: score
            };
          }));
        }
        setRatingModalQueueItem(updated);
      }

      return updated;
    }));
  };

  const transferQueueEmployee = (queueId: string, newEmployeeId: string) => {
    const newEmp = employees.find(e => e.id === newEmployeeId);
    if (!newEmp) return;
    setQueue(prev => prev.map(q => q.id === queueId ? {
      ...q,
      assignedEmployeeId: newEmp.id,
      assignedEmployeeName: newEmp.name
    } : q));
  };

  const submitRating = (queueItem: QueueEntry, stars: number, tags: string[], comment?: string) => {
    const newReview: RatingReview = {
      id: `rev-${Date.now()}`,
      customerName: queueItem.customerName,
      employeeId: queueItem.assignedEmployeeId || 'emp-1',
      employeeName: queueItem.assignedEmployeeName || 'Stylist',
      serviceName: queueItem.serviceNames.join(', '),
      stars,
      tags,
      comment,
      createdAt: 'Just now'
    };

    setRatings(prev => [newReview, ...prev]);

    if (queueItem.assignedEmployeeId) {
      setEmployees(prev => prev.map(e => {
        if (e.id !== queueItem.assignedEmployeeId) return e;
        const totalRatings = e.ratingsCount + 1;
        const newAvg = Number(((e.rating * e.ratingsCount + stars) / totalRatings).toFixed(1));
        return {
          ...e,
          rating: newAvg,
          ratingsCount: totalRatings
        };
      }));
    }

    setCustomers(prev => prev.map(c => {
      if (c.id !== queueItem.customerId) return c;
      const historyItem = {
        id: `vh-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        services: queueItem.serviceNames,
        employeeName: queueItem.assignedEmployeeName || 'Stylist',
        amount: queueItem.totalAmount,
        rating: stars,
        feedback: comment
      };
      return {
        ...c,
        lastRating: stars,
        visitHistory: [historyItem, ...c.visitHistory]
      };
    }));

    setRatingModalQueueItem(null);
  };

  const addAppointment = (apt: Omit<Appointment, 'id'>) => {
    const newApt: Appointment = {
      ...apt,
      id: `apt-${Date.now()}`
    };
    setAppointments(prev => [newApt, ...prev]);
  };

  const checkInAppointment = (appointmentId: string) => {
    const apt = appointments.find(a => a.id === appointmentId);
    if (!apt) return;
    setAppointments(prev => prev.map(a => a.id === appointmentId ? { ...a, status: 'waiting' } : a));
    addCustomerAndQueue({
      name: apt.customerName,
      phone: apt.customerPhone,
      gender: 'male',
      ageGroup: 'adult',
      serviceIds: apt.serviceIds,
      preferredEmployeeId: apt.employeeId,
      visitType: 'appointment',
      notes: `Appointment checked-in for ${apt.time}`
    });
  };

  const updateProductStock = (productId: string, quantityToAdd: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const newStock = p.currentStock + quantityToAdd;
      let status: Product['status'] = 'in_stock';
      if (newStock <= 0) status = 'out_of_stock';
      else if (newStock <= p.minStock) status = 'low_stock';

      return {
        ...p,
        currentStock: newStock,
        status,
        lastRestocked: new Date().toISOString().split('T')[0]
      };
    }));
  };

  const addProduct = (prod: Omit<Product, 'id' | 'status'>) => {
    let status: Product['status'] = 'in_stock';
    if (prod.currentStock <= 0) status = 'out_of_stock';
    else if (prod.currentStock <= prod.minStock) status = 'low_stock';

    const newProd: Product = {
      ...prod,
      id: `prod-${Date.now()}`,
      status
    };
    setProducts(prev => [newProd, ...prev]);
  };

  const addOffer = (offer: Omit<Offer, 'id' | 'claimedCount'>) => {
    const newOffer: Offer = {
      ...offer,
      id: `off-${Date.now()}`,
      claimedCount: 0
    };
    setOffers(prev => [newOffer, ...prev]);
  };

  const addWeddingBooking = (booking: Omit<WeddingBooking, 'id'>) => {
    const newBooking: WeddingBooking = {
      ...booking,
      id: `wed-${Date.now()}`
    };
    setWeddingBookings(prev => [newBooking, ...prev]);
  };

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      status: 'pending'
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const nextStatus = t.status === 'completed' ? 'pending' : 'completed';
      return { ...t, status: nextStatus };
    }));
  };

  const closeSalonDay = () => {
    setClosingSummary(prev => ({
      ...prev,
      isClosed: true
    }));
  };

  const resetToDemoData = () => {
    setSalon(initialSalon);
    setServices(initialServices);
    setEmployees(initialEmployees);
    setCustomers(initialCustomers);
    setQueue(initialQueueEntries);
    setAppointments(initialAppointments);
    setProducts(initialProducts);
    setOffers(initialOffers);
    setWeddingBookings(initialWeddingBookings);
    setTasks(initialTasks);
    setRatings(initialRatings);
    setInsights(initialInsights);
    setClosingSummary(initialDailyClosingSummary);
    setIsAuthenticated(false);
    setIsAuthModalOpen(true);
  };

  return (
    <SalonContext.Provider
      value={{
        salon,
        updateSalon,
        role,
        setRole,
        isAuthenticated,
        loginWithPasskey,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        activeTab,
        setActiveTab,
        activeStylistId,
        salonsList,
        invoicesList,
        addSalonTenant,
        removeSalonTenant,
        sendSaaSInvoice,
        updateSalonTenantPlan,
        confirmPaymentAndDispatchCredentials,
        services,
        employees,
        customers,
        queue,
        appointments,
        products,
        offers,
        templates,
        weddingBookings,
        tasks,
        ratings,
        insights,
        closingSummary,
        isAddCustomerOpen,
        setIsAddCustomerOpen,
        ratingModalQueueItem,
        setRatingModalQueueItem,
        selectedCustomerForDetail,
        setSelectedCustomerForDetail,
        addCustomerAndQueue,
        updateQueueStatus,
        transferQueueEmployee,
        submitRating,
        addAppointment,
        checkInAppointment,
        updateProductStock,
        addProduct,
        addOffer,
        addWeddingBooking,
        addTask,
        toggleTaskStatus,
        closeSalonDay,
        resetToDemoData,
        findCustomerByPhone,
        addOrUpdateEmployee
      }}
    >
      {children}
    </SalonContext.Provider>
  );
};

export const useSalon = () => {
  const context = useContext(SalonContext);
  if (!context) {
    throw new Error('useSalon must be used within a SalonProvider');
  }
  return context;
};

'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
const port = process.env.NEXT_PUBLIC_APP_API_PORT;

interface AuthContextProps {
  children: React.ReactNode;
}
interface Assistance {
  eventId: string;
  id: string;
  status: string;
  title: string;
  eventDate: Date;
}
export interface AdminDonation {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: 'pending' | 'active' | 'rejected';
}
interface Donation {
  title: string;
  amount: number;
  date: string;
}
export interface Session {
  id: string | null;
  name: string;
  email: string;
  image: string | null;
  providerAccountId: string;
  creatorId: string;
  status: string | null;
  phone: string;
  address: string;
  donations: Donation[];
  assistance: Assistance[];
}
interface PaymentInfo {
  title: string | null;
  amount: number | null;
}

export interface Event {
  id: string;
  highlight: boolean;
  createDate: Date;
  status: string;
  vacancy: boolean;
  title: string;
  description: string;
  eventDate: Date;
  eventLocation: string;
  eventAddress: string;
  price: number;
  stock: number;
  images: string[];
  assistance: Assistance[];
}

interface AuthContextType {
  token: string | null;
  userSession: Session;
  paymentInfo: PaymentInfo | null;
  adminDonations: AdminDonation[] | null;
  allEvents: Event[] | null;
  adminEvents: Event[] | null;
  setToken: (token: string | null) => void;
  setSession: (userSession: Session) => void;
  setDonation: (donation: Donation) => void;
  setAssistance: (assistance: Assistance[]) => void;
  setPaymentInfo: (paymentInfo: PaymentInfo | null) => void;
  setAdminDonation: (adminDonation: AdminDonation) => void;
  setAdminDonations: (adminDonations: AdminDonation[] | null) => void;
  setAllEvents: (allEvents: Event[] | null) => void;
  setAdminEvents: (adminEvets: Event[] | null) => void;
  setAdminEvent: (adminEvent: Event) => void;
  setEvent: (event: Event) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userSession: {
    id: null,
    name: '',
    email: '',
    image: null,
    providerAccountId: '',
    creatorId: '',
    status: null,
    phone: '',
    address: '',
    donations: [],
    assistance: []
  },
  paymentInfo: null,
  adminDonations: null,
  allEvents: null,
  adminEvents: null,
  setToken: () => { },
  setSession: () => { },
  setDonation: () => { },
  setAssistance: () => { },
  setPaymentInfo: () => { },
  setAdminDonation: () => { },
  setAdminDonations: () => { },
  setAllEvents: () => { },
  setEvent: () => { },
  setAdminEvents: () => { },
  setAdminEvent: () => { },
  logout: () => { },
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userSession, setSession] = useState<Session>({
    id: null,
    name: '',
    email: '',
    image: null,
    providerAccountId: '',
    creatorId: '',
    status: null,
    phone: '',
    address: '',
    donations: [],
    assistance: []
  });
  const [token, setToken] = useState<string | null>(null);
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);
  const [adminDonations, setAdminDonations] = useState<AdminDonation[] | null>(
    null,
  );
  const [allEvents, setAllEvents] = useState<Event[] | null>(null);
  const [adminEvents, setAdminEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    // Cargar datos del localStorage
    const storedToken = localStorage.getItem('token');
    const storedSession = JSON.parse(
      localStorage.getItem('userSession') || 'null',
    );
    const storedPaymentInfo = JSON.parse(
      localStorage.getItem('paymentInfo') || 'null',
    );

    if (storedToken && storedSession) {
      setSession(storedSession);
      setToken(storedToken);
    } else {
      setSession({
        id: null,
        name: '',
        email: '',
        image: null,
        providerAccountId: '',
        creatorId: '',
        status: null,
        phone: '',
        address: '',
        donations: [],
        assistance: []
      });
      localStorage.removeItem('userSession');
      setToken(null);
    }

    // Cargar paymentInfo desde localStorage
    if (storedPaymentInfo) {
      setPaymentInfo(storedPaymentInfo);
    }
    const getEvents = async () => {
      try {
        const res = await fetch(
          `http://localhost:${port}/events/getactiveandinactivehighlight`,
        );
        if (res.ok) {
          const data = await res.json();
          setAllEvents(data);
        } else {
          setAllEvents(null);
        }
      } catch (error) {
        console.error('Error al obtener los eventos:', error);
      }
    };
    getEvents();
  }, []);

  const handleSetDonations = (donation: Donation) => {
    if (donation) {
      setSession((prevSession) => {
        if (prevSession) {
          return {
            ...prevSession,
            donations: [...prevSession.donations, donation],
          };
        }
        return prevSession;
      });
    }
  };

  const handleSetAssistance = (updatedAssistance: Assistance[]) => {
    if (updatedAssistance.length > 0) {
      setSession((prevSession) => {
        if (prevSession) {
          const { assistance, ...rest } = prevSession;
          const updatedSession = {assistance:updatedAssistance, ...rest };
          return updatedSession;
        }
        return prevSession;
      })
    }}

    const handleSetPayment = (params: PaymentInfo | null) => {
      setPaymentInfo(params);
      if (params) {
        localStorage.setItem('paymentInfo', JSON.stringify(params)); // Guardar en localStorage
      } else {
        localStorage.removeItem('paymentInfo'); // Limpiar localStorage si es null
      }
    };

    const handleSetToken = (newToken: string | null) => {
      setToken(newToken);
      if (!newToken) {
        setSession({
          id: '',
          name: '',
          email: '',
          image: null,
          providerAccountId: '',
          creatorId: '',
          status: null,
          phone: '',
          address: '',
          donations: [],
          assistance: []
        });
        localStorage.removeItem('token');
        localStorage.removeItem('userSession');
        localStorage.removeItem('paymentInfo'); // Limpiar paymentInfo también si no hay token
      } else {
        localStorage.setItem('token', newToken);
      }
    };

    const handleUserData = (userSession: Session) => {
      setSession(userSession);
      if (!userSession) {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userSession');
        localStorage.removeItem('paymentInfo'); // Limpiar paymentInfo también si no hay sesión
      } else {
        localStorage.setItem('userSession', JSON.stringify(userSession));
      }
    };

    const handleAdminDonations = (adminDonations: AdminDonation[] | null) => {
      setAdminDonations(adminDonations);
    };

    const handleAdminDonation = (adminDonation: AdminDonation) => {
      setAdminDonations((prevAdminDonations) => {
        if (prevAdminDonations) {
          return [...prevAdminDonations, adminDonation];
        }
        return [adminDonation];
      });
    };

    const handleAllEvents = (allEvents: Event[] | null) => {
      setAllEvents(allEvents);
    };

    const handleEvent = (updatedEvent: Event) => {
      setAllEvents((prevEvents) => {
        if (!prevEvents) return null;
        return prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event,
        );
      });
    };

    const handleAdminEvents = (allEvents: Event[] | null) => {
      setAdminEvents(allEvents);
    };

    const handleAdminEvent = (adminEvent: Event) => {
      setAdminEvents((prevAdminEvents) => {
        if (prevAdminEvents) {
          return [...prevAdminEvents, adminEvent];
        }
        return [adminEvent];
      });
    };

    const logout = () => {
      setToken(null);
      setSession({
        id: null,
        name: '',
        email: '',
        image: null,
        providerAccountId: '',
        creatorId: '',
        status: null,
        phone: '',
        address: '',
        donations: [],
        assistance: []
      });
      localStorage.removeItem('token');
      localStorage.removeItem('userSession');
      localStorage.removeItem('paymentInfo'); // Limpiar paymentInfo al cerrar sesión
    };

    return (
      <AuthContext.Provider
        value={{
          token,
          setToken: handleSetToken,
          userSession,
          setSession: handleUserData,
          setDonation: handleSetDonations,
          logout,
          paymentInfo,
          setPaymentInfo: handleSetPayment,
          adminDonations,
          setAdminDonation: handleAdminDonation,
          setAdminDonations: handleAdminDonations,
          allEvents,
          setEvent: handleEvent,
          setAllEvents: handleAllEvents,
          adminEvents,
          setAdminEvents: handleAdminEvents,
          setAdminEvent: handleAdminEvent,
          setAssistance: handleSetAssistance
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

  export default AuthProvider;

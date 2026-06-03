
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// const AppContext = createContext();

// // Base backend API URL configuration
// const API_URL = 'https://creditcardbackend-1.onrender.com/api';

// export const AppProvider = ({ children }) => {
//   const [currentRole, setCurrentRole] = useState('Admin'); // Admin, Analyst, Customer
//   const [token, setToken] = useState(localStorage.getItem('token') || '');
//   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
//   const [transactions, setTransactions] = useState([]);
//   const [chartData, setChartData] = useState([]);
//   const [performanceMetrics, setPerformanceMetrics] = useState({
//     totalProcessed: 0,
//     totalBlocked: 0,
//     avgLatency: "1.24s"
//   });

//   // Set up common authorization headers for protected server endpoints
//   const getAuthHeaders = () => ({
//     headers: { Authorization: `Bearer ${token}` }
//   });

//   // 1. Login Action to obtain JWT Token
//   const loginUser = async (email, password) => {
//     try {
//       const res = await axios.post(`${API_URL}/auth/login`, { email, password });
//       setToken(res.data.token);
//       setUser(res.data.user);
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       return { success: true };
//     } catch (err) {
//       console.error("Login Failure:", err.response?.data?.message || err.message);
//       return { success: false, error: err.response?.data?.message || err.message };
//     }
//   };

//   // 2. Fetch Aggregated Metrics & Transaction Logs for Admin / Analyst Views
//   const fetchDashboardMetrics = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${API_URL}/dashboard/metrics`, getAuthHeaders());
//       setTransactions(res.data.allTxns);
//       setChartData(res.data.chartData);
//       setPerformanceMetrics(prev => ({
//         ...prev,
//         totalProcessed: res.data.totalProcessed,
//         totalBlocked: res.data.totalBlocked
//       }));
//     } catch (err) {
//       console.error("Error pulling database logs:", err.message);
//     }
//   };

//   // 3. Post a New Raw Transaction to the Hybrid Gemini/Haversine Pipeline
//   const processNewTransaction = async (transactionData) => {
//     if (!token) return;
//     try {
//       // ✅ FIX MATCHED: Changed back to match your backend singular endpoint path
//       const res = await axios.post(`${API_URL}/transaction/check`, transactionData, getAuthHeaders());
//       // Refresh current records locally from database
//       fetchDashboardMetrics();
//       return res.data;
//     } catch (err) {
//       console.error("Transaction Pipeline Processing Error:", err.message);
//     }
//   };

//   // 4. Update Status Override (Used by Analysts to approve/deny records)
//   const resolveTransactionStatus = async (txnId, uniqueStatus) => {
//     if (!token) return;
//     try {
//       // ✅ FIX MATCHED: Changed to singular /transaction/status to match your index.js route map
//       await axios.put(`${API_URL}/transaction/status/${txnId}`, { status: uniqueStatus }, getAuthHeaders());
//       fetchDashboardMetrics();
//     } catch (err) {
//       console.error("Status Update Failed:", err.message);
//     }
//   };

//   // 5. Admin Function: Toggle Local Account Freeze Rule In MongoDB
//   const toggleUserBlockStatus = async (email, blockFlag) => {
//     if (!token) return;
//     try {
//       await axios.put(`${API_URL}/admin/user-block/${email}`, { isBlocked: blockFlag }, getAuthHeaders());
//       fetchDashboardMetrics();
//     } catch (err) {
//       console.error("Admin user block update failed:", err.message);
//     }
//   };

//   // Periodically refresh tracking metrics from database to show real-time changes
//   useEffect(() => {
//     if (token) {
//       fetchDashboardMetrics();
//       const interval = setInterval(fetchDashboardMetrics, 5000);
//       return () => clearInterval(interval);
//     }
//   }, [token]);

//   return (
//     <AppContext.Provider value={{
//       currentRole,
//       setCurrentRole,
//       token,
//       user,
//       loginUser,
//       transactions,
//       chartData,
//       performanceMetrics,
//       processNewTransaction,
//       resolveTransactionStatus,
//       toggleUserBlockStatus
//     }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => useContext(AppContext);


import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AppContext = createContext();

// ✅ UPDATED: Base backend production API URL pointing to your new Render instance
const API_URL = 'https://creditcardbackend-1.onrender.com/api';

export const AppProvider = ({ children }) => {
  const [currentRole, setCurrentRole] = useState('Admin'); // Admin, Analyst, Customer
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    totalProcessed: 0,
    totalBlocked: 0,
    avgLatency: "1.24s"
  });

  // Set up common authorization headers for protected server endpoints
  const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${token}` }
  });

  // 1. Login Action to obtain JWT Token
  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return { success: true };
    } catch (err) {
      console.error("Login Failure:", err.response?.data?.message || err.message);
      return { success: false, error: err.response?.data?.message || err.message };
    }
  };

  // 2. Fetch Aggregated Metrics & Transaction Logs for Admin / Analyst Views
  const fetchDashboardMetrics = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/dashboard/metrics`, getAuthHeaders());
      setTransactions(res.data.allTxns);
      setChartData(res.data.chartData);
      setPerformanceMetrics(prev => ({
        ...prev,
        totalProcessed: res.data.totalProcessed,
        totalBlocked: res.data.totalBlocked
      }));
    } catch (err) {
      console.error("Error pulling database logs:", err.message);
    }
  };

  // 3. Post a New Raw Transaction to the Hybrid Gemini/Haversine Pipeline
  const processNewTransaction = async (transactionData) => {
    if (!token) return;
    try {
      const res = await axios.post(`${API_URL}/transaction/check`, transactionData, getAuthHeaders());
      // Refresh current records locally from database
      fetchDashboardMetrics();
      return res.data;
    } catch (err) {
      console.error("Transaction Pipeline Processing Error:", err.message);
    }
  };

  // 4. Update Status Override (Used by Analysts to approve/deny records)
  const resolveTransactionStatus = async (txnId, uniqueStatus) => {
    if (!token) return;
    try {
      await axios.put(`${API_URL}/transaction/status/${txnId}`, { status: uniqueStatus }, getAuthHeaders());
      fetchDashboardMetrics();
    } catch (err) {
      console.error("Status Update Failed:", err.message);
    }
  };

  // 5. Admin Function: Toggle Local Account Freeze Rule In MongoDB
  const toggleUserBlockStatus = async (email, blockFlag) => {
    if (!token) return;
    try {
      await axios.put(`${API_URL}/admin/user-block/${email}`, { isBlocked: blockFlag }, getAuthHeaders());
      fetchDashboardMetrics();
    } catch (err) {
      console.error("Admin user block update failed:", err.message);
    }
  };

  // Periodically refresh tracking metrics from database to show real-time changes
  useEffect(() => {
    if (token) {
      fetchDashboardMetrics();
      const interval = setInterval(fetchDashboardMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [token]);

  return (
    <AppContext.Provider value={{
      currentRole,
      setCurrentRole,
      token,
      user,
      loginUser,
      transactions,
      chartData,
      performanceMetrics,
      processNewTransaction,
      resolveTransactionStatus,
      toggleUserBlockStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
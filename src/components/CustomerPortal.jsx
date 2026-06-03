// import React, { useState, useEffect } from 'react';
// import { useApp } from './AppContext';
// import { CreditCard, Send, ShieldAlert, Check, MapPin, Navigation } from 'lucide-react';

// export default function CustomerPortal() {
//   const { processNewTransaction } = useApp();
//   const [formData, setFormData] = useState({
//     amount: '',
//     vendor: 'Amazon Web Services',
//     cardName: 'Ali',
//     cardNumber: '4242 4242 4242 4242',
//     expiry: '12/28',
//     cvv: '123',
//     device: 'Windows Desktop PC'
//   });

//   const [locationState, setLocationState] = useState({
//     name: 'Detecting Location...',
//     lat: 29.3544, // Default backup coordinates (Bahawalpur)
//     lng: 71.6911,
//     loading: true,
//     error: null
//   });

//   const [alertResult, setAlertResult] = useState(null);

//   // HTML5 Geolocation API Request on Load
//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setLocationState(prev => ({
//         ...prev,
//         name: 'Geolocation Not Supported',
//         loading: false
//       }));
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocationState({
//           name: `Live Browser Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
//           lat: latitude,
//           lng: longitude,
//           loading: false,
//           error: null
//         });
//       },
//       (error) => {
//         console.error("Location permission denied:", error.message);
//         setLocationState({
//           name: 'Permission Denied (Using Default Coordinates)',
//           lat: 24.8607, // Fallback coordinates (Karachi)
//           lng: 67.0011,
//           loading: false,
//           error: 'Permission Denied'
//         });
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   }, []);

//   const handleSubmitTransaction = async (e) => {
//     e.preventDefault();
//     if (!formData.amount || !formData.cardNumber) return;

//     const payload = {
//       cardNumber: formData.cardNumber.replace(/\s/g, ''), // Strip spaces
//       cardName: formData.cardName,
//       expiry: formData.expiry,
//       cvv: formData.cvv,
//       vendor: formData.vendor,
//       amount: parseFloat(formData.amount),
//       device: formData.device,
//       location: {
//         name: locationState.name,
//         lat: locationState.lat,
//         lng: locationState.lng
//       }
//     };

//     const result = await processNewTransaction(payload);
//     if (result) {
//       setAlertResult(result);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn">
//       <div>
//         <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Payment Gateway Simulator</h2>
//         <p className="text-sm text-slate-400">Verifying live spatial telemetry, card authenticity, and behavioural compliance parameters.</p>
//       </div>

//       <form onSubmit={handleSubmitTransaction} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
//         <div className="flex items-center justify-between border-b border-slate-800 pb-4">
//           <div className="flex items-center gap-2">
//             <CreditCard className="text-emerald-400" size={18} />
//             <h3 className="text-sm font-semibold text-white">Secure Checkout Terminal</h3>
//           </div>
          
//           {/* Live Location GPS Badge */}
//           <div className={`flex items-center gap-2 text-xs border px-3 py-1.5 rounded-xl font-mono ${
//             locationState.error ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
//           }`}>
//             <Navigation size={12} className={locationState.loading ? 'animate-spin' : ''} />
//             <span>{locationState.name}</span>
//           </div>
//         </div>

//         {/* Amount Input */}
//         <div>
//           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Transaction Amount (USD)</label>
//           <input 
//             type="number" 
//             required
//             value={formData.amount}
//             onChange={(e) => setFormData({...formData, amount: e.target.value})}
//             placeholder="0.00"
//             className="w-full bg-slate-950 text-base border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500 font-mono text-white"
//           />
//         </div>

//         {/* Realistic Card Details Block */}
//         <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800/60">
//           <div>
//             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Cardholder Full Name</label>
//             <input 
//               type="text" 
//               required
//               value={formData.cardName}
//               onChange={(e) => setFormData({...formData, cardName: e.target.value})}
//               className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
//             />
//           </div>

//           <div>
//             <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Credit Card Number</label>
//             <input 
//               type="text" 
//               required
//               maxLength="19"
//               value={formData.cardNumber}
//               onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
//               className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-mono"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Expiry Date</label>
//               <input 
//                 type="text" 
//                 required
//                 placeholder="MM/YY"
//                 maxLength="5"
//                 value={formData.expiry}
//                 onChange={(e) => setFormData({...formData, expiry: e.target.value})}
//                 className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-mono"
//               />
//             </div>
//             <div>
//               <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Security Code (CVV)</label>
//               <input 
//                 type="password" 
//                 required
//                 maxLength="4"
//                 value={formData.cvv}
//                 onChange={(e) => setFormData({...formData, cvv: e.target.value})}
//                 className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-mono"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Merchant & Device Specifics */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Target Merchant Gateway</label>
//             <input 
//               type="text" 
//               value={formData.vendor}
//               onChange={(e) => setFormData({...formData, vendor: e.target.value})}
//               className="w-full bg-slate-950 text-sm border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500 text-white"
//             />
//           </div>
//           <div>
//             <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Hardware Terminal Fingerprint</label>
//             <input 
//               type="text" 
//               value={formData.device}
//               onChange={(e) => setFormData({...formData, device: e.target.value})}
//               className="w-full bg-slate-950 text-sm border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500 text-white"
//             />
//           </div>
//         </div>

//         <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all hover:bg-emerald-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10">
//           <Send size={14} /> Transmit Authorization Request
//         </button>
//       </form>

//       {/* Result Card Feedback Panel */}
//       {alertResult && (
//         <div className={`p-5 border-2 rounded-2xl animate-scaleUp flex items-start gap-4 ${
//           alertResult.status === 'Fraudulent' ? 'bg-rose-500/5 border-rose-500/30' :
//           alertResult.status === 'Suspicious' ? 'bg-amber-500/5 border-amber-500/30' :
//           'bg-emerald-500/5 border-emerald-500/30'
//         }`}>
//           <div className={`p-2 rounded-xl ${
//             alertResult.status === 'Fraudulent' ? 'bg-rose-500/10 text-rose-400' :
//             alertResult.status === 'Suspicious' ? 'bg-amber-500/10 text-amber-400' :
//             'bg-emerald-500/10 text-emerald-400'
//           }`}>
//             {alertResult.status === 'Legitimate' ? <Check size={20} /> : <ShieldAlert size={20} />}
//           </div>
//           <div className="space-y-1 flex-1">
//             <h4 className="font-bold text-sm text-white">Pipeline Judgment: {alertResult.status}</h4>
//             <p className="text-xs text-slate-400">Risk Matrix Value: <span className="font-mono text-white font-bold">{alertResult.riskScore}%</span></p>
//             {alertResult.flags?.length > 0 && (
//               <div className="flex flex-wrap gap-1 pt-2">
//                 {alertResult.flags.map((f, i) => (
//                   <span key={i} className="bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded">
//                     {f}
//                   </span>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { useApp } from './AppContext';
import { CreditCard, Send, ShieldAlert, Check, MapPin, Navigation, AlertTriangle } from 'lucide-react';

export default function CustomerPortal() {
  const { processNewTransaction } = useApp();
  
  // New States for Cooldown Tracker & Toast Notification
  const [lastTxnTime, setLastTxnTime] = useState(0);
  const [toastMsg, setToastMsg] = useState(null);
  
  const [formData, setFormData] = useState({
    amount: '',
    vendor: 'Amazon Web Services',
    cardName: 'Ali',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvv: '123',
    device: 'Windows Desktop PC'
  });

  const [locationState, setLocationState] = useState({
    name: 'Detecting Location...',
    lat: 29.3544,
    lng: 71.6911,
    loading: true,
    error: null
  });

  const [alertResult, setAlertResult] = useState(null);

  // HTML5 Geolocation API Request on Load
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationState(prev => ({
        ...prev,
        name: 'Geolocation Not Supported',
        loading: false
      }));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationState({
          name: `Live Browser Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
          lat: latitude,
          lng: longitude,
          loading: false,
          error: null
        });
      },
      (error) => {
        console.error("Location permission denied:", error.message);
        setLocationState({
          name: 'Permission Denied (Using Default Coordinates)',
          lat: 24.8607,
          lng: 67.0011,
          loading: false,
          error: 'Permission Denied'
        });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const handleSubmitTransaction = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.cardNumber) return;

    // =========================================================================
    // 🛑 FRONTEND COOLDOWN LOCK: 60 Seconds per transaction
    // =========================================================================
    const now = Date.now();
    const timeSinceLastTxn = now - lastTxnTime;
    
    if (timeSinceLastTxn < 60000) {
      const secondsLeft = Math.ceil((60000 - timeSinceLastTxn) / 1000);
      setToastMsg(`Cooldown Active: Please wait ${secondsLeft}s before re-verifying.`);
      
      // Auto-dismiss the toast after 4 seconds
      setTimeout(() => setToastMsg(null), 4000);
      return; // Stop the function here so the backend is never called
    }
    // =========================================================================

    const payload = {
      cardNumber: formData.cardNumber.replace(/\s/g, ''),
      cardName: formData.cardName,
      expiry: formData.expiry,
      cvv: formData.cvv,
      vendor: formData.vendor,
      amount: parseFloat(formData.amount),
      device: formData.device,
      location: {
        name: locationState.name,
        lat: locationState.lat,
        lng: locationState.lng
      }
    };

    // Update the tracker to the current time right before processing
    setLastTxnTime(Date.now());

    const result = await processNewTransaction(payload);
    if (result) {
      setAlertResult(result);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn relative">
      
      {/* 🚀 FLOATING TOAST NOTIFICATION UI */}
      {toastMsg && (
        <div className="fixed top-6 right-6 bg-amber-500/10 border border-amber-500/40 text-amber-400 px-5 py-3 rounded-xl flex items-center gap-3 shadow-2xl animate-scaleUp z-50 backdrop-blur-md">
          <AlertTriangle size={18} />
          <span className="text-sm font-bold font-mono tracking-wide">{toastMsg}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Enterprise Payment Gateway Simulator</h2>
        <p className="text-sm text-slate-400">Verifying live spatial telemetry, card authenticity, and behavioural compliance parameters.</p>
      </div>

      <form onSubmit={handleSubmitTransaction} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <CreditCard className="text-emerald-400" size={18} />
            <h3 className="text-sm font-semibold text-white">Secure Checkout Terminal</h3>
          </div>
          
          {/* Live Location GPS Badge */}
          <div className={`flex items-center gap-2 text-xs border px-3 py-1.5 rounded-xl font-mono ${
            locationState.error ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' : 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400'
          }`}>
            <Navigation size={12} className={locationState.loading ? 'animate-spin' : ''} />
            <span>{locationState.name}</span>
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Transaction Amount (USD)</label>
          <input 
            type="number" 
            required
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="0.00"
            className="w-full bg-slate-950 text-base border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500 font-mono text-white"
          />
        </div>

        {/* Realistic Card Details Block */}
        <div className="space-y-4 p-4 bg-slate-950 rounded-xl border border-slate-800/60">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Cardholder Full Name</label>
            <input 
              type="text" 
              required
              value={formData.cardName}
              onChange={(e) => setFormData({...formData, cardName: e.target.value})}
              className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Credit Card Number</label>
            <input 
              type="text" 
              required
              maxLength="19"
              value={formData.cardNumber}
              onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
              className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Expiry Date</label>
              <input 
                type="text" 
                required
                placeholder="MM/YY"
                maxLength="5"
                value={formData.expiry}
                onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-mono"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">Security Code (CVV)</label>
              <input 
                type="password" 
                required
                maxLength="4"
                value={formData.cvv}
                onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                className="w-full bg-slate-900 text-sm border border-slate-800 p-2.5 rounded-lg focus:outline-none focus:border-emerald-500 text-white font-mono"
              />
            </div>
          </div>
        </div>

        {/* Merchant & Device Specifics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Target Merchant Gateway</label>
            <input 
              type="text" 
              value={formData.vendor}
              onChange={(e) => setFormData({...formData, vendor: e.target.value})}
              className="w-full bg-slate-950 text-sm border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500 text-white"
            />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Hardware Terminal Fingerprint</label>
            <input 
              type="text" 
              value={formData.device}
              onChange={(e) => setFormData({...formData, device: e.target.value})}
              className="w-full bg-slate-950 text-sm border border-slate-800 p-3 rounded-xl focus:outline-none focus:border-emerald-500 text-white"
            />
          </div>
        </div>

        <button type="submit" className="w-full bg-emerald-500 text-slate-950 font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all hover:bg-emerald-400 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10">
          <Send size={14} /> Transmit Authorization Request
        </button>
      </form>

      {/* Result Card Feedback Panel */}
      {alertResult && (
        <div className={`p-5 border-2 rounded-2xl animate-scaleUp flex items-start gap-4 ${
          alertResult.status === 'Fraudulent' ? 'bg-rose-500/5 border-rose-500/30' :
          alertResult.status === 'Suspicious' ? 'bg-amber-500/5 border-amber-500/30' :
          'bg-emerald-500/5 border-emerald-500/30'
        }`}>
          <div className={`p-2 rounded-xl ${
            alertResult.status === 'Fraudulent' ? 'bg-rose-500/10 text-rose-400' :
            alertResult.status === 'Suspicious' ? 'bg-amber-500/10 text-amber-400' :
            'bg-emerald-500/10 text-emerald-400'
          }`}>
            {alertResult.status === 'Legitimate' ? <Check size={20} /> : <ShieldAlert size={20} />}
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="font-bold text-sm text-white">Pipeline Judgment: {alertResult.status}</h4>
            <p className="text-xs text-slate-400">Risk Matrix Value: <span className="font-mono text-white font-bold">{alertResult.riskScore}%</span></p>
            {alertResult.flags?.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-2">
                {alertResult.flags.map((f, i) => (
                  <span key={i} className="bg-slate-950 border border-slate-800 text-[10px] text-slate-400 font-mono px-2 py-0.5 rounded">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
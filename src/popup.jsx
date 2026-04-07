import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { saveToStorage, getFromStorage } from "./controllers/storageController.js";
import "./index.css";

function Popup() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [status, setStatus] = useState("Monitoring");

  useEffect(() => {
    getFromStorage(["autoReloadEnabled"]).then((res) => {
      setIsEnabled(res.autoReloadEnabled !== false);
    });
  }, []);

  const toggleReload = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    await saveToStorage({ autoReloadEnabled: newState });
    setStatus(newState ? "Monitoring" : "Disabled");
  };

  return (
    <div className="w-full h-full bg-slate-900 text-white flex flex-col p-6 font-sans">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">NopeCHA Reload</h1>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Smart Automation v1.0</p>
        </div>
      </div>

      <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-200">Auto-Reload</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Captchas failed to solve?</p>
          </div>
          <button 
            onClick={toggleReload}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${isEnabled ? 'bg-blue-600' : 'bg-slate-700'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className={`absolute -inset-4 rounded-full blur-xl opacity-20 ${isEnabled ? 'bg-blue-500 animate-pulse' : 'bg-slate-500'}`} />
          <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${isEnabled ? 'border-blue-600 bg-blue-900/20' : 'border-slate-800 bg-slate-900'}`}>
            {isEnabled ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 001.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            )}
          </div>
        </div>
        <p className={`text-xs font-bold uppercase tracking-widest ${isEnabled ? 'text-blue-500' : 'text-slate-600'}`}>
          {status}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-800">
        <p className="text-[9px] text-slate-500 leading-relaxed text-center italic">
          Designed for high-performance automation.
        </p>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("react-target"));
root.render(<Popup />);
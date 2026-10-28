import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MotionProvider } from './context/MotionContext';
import { AppProvider } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { AppLayout } from './components/app/AppLayout';
import { ChatView } from './components/app/ChatView';
import { PantryView } from './components/app/PantryView';
import { HistoryView } from './components/app/HistoryView';

export const App: React.FC = () => {
  return (
    <MotionProvider>
      <AppProvider>
        <BrowserRouter>
        <div className="min-h-screen bg-paper text-ink flex flex-col font-jakarta selection:bg-saffron/30 selection:text-ink relative">
          {/* Skip to content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-tomato focus:text-paper focus:rounded-md focus:shadow-md focus:outline-none"
          >
            Saltar para o conteúdo principal
          </a>

          <Routes>
            {/* Landing Page (Preserved 100% from V1) */}
            <Route path="/" element={<LandingPage />} />

            {/* Web App (V2) */}
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="/app/fogao" replace />} />
              <Route path="fogao" element={<ChatView />} />
              <Route path="despensa" element={<PantryView />} />
              <Route path="livro" element={<HistoryView />} />
              <Route path="*" element={<Navigate to="/app/fogao" replace />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  </MotionProvider>
  );
};

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CaseDetail from "./pages/CaseDetail";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./context/UserContext";
import UserProfile from "./pages/UserProfile";
import AdminDashboard from "./pages/AdminDashboard";
import PaymentSuccess from "./pages/PaymentSuccess";
import Explore from "./pages/Explore";
import LandmarkCases from "./pages/LandmarkCases";

// Import the new routes
import KanoonSearch from "./pages/KanoonSearch";
import KanoonDocumentView from "./pages/KanoonDocumentView";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/landmark-cases" element={<LandmarkCases />} />
            <Route path="/case/:caseId" element={<CaseDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            
            {/* Indian Kanoon routes */}
            <Route path="/kanoon" element={<KanoonSearch />} />
            <Route path="/kanoon/doc/:docId" element={<KanoonDocumentView />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

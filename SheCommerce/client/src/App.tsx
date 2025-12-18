import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogDetail from '@/pages/BlogDetail';
import BecomeSeller from "@/pages/BecomeSeller";
import Login from "@/pages/Login";
import Signup from "@/pages/SignUp";
import Contact from "@/pages/Contact";
import Wishlist from "@/pages/Wishlist";
import Cart from "@/pages/Cart";
import Payment from '@/pages/Payment';
import PaymentSuccess from '@/pages/PaymentSuccess';
import OrderDetails from '@/pages/order-details';
import SkillToSell from "./pages/skill";
import { BrowserRouter } from "react-router-dom";
import Wallet from "./pages/wallet";
import Resell from "./pages/resell";
import SellerLogin from "@/pages/SellerLogin";
import SellerSignup from "@/pages/SellerSignup";
import SellerAuthPage from "@/pages/seller-auth";
import SellerDashboard from "./pages/SellerDashboard";
import SellerProfile from "./pages/seller-profile";
import SellerCreateListing from "./pages/seller-create-listing";
import SocialHome from "@/pages/SocialHome";
import LiveChat from "./pages/LiveChat";
// import SocialRoom from "@/pages/SocialRoom";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/shop" component={Shop} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogDetail} />
      <Route path="/become-seller" component={BecomeSeller} />
      {/* Removed the redundant comment, route is correct */}
      <Route path="/login" component={Login} /> 
      <Route path="/signup" component={Signup} /> 
      <Route path="/contact" component={Contact} />
      <Route path="/wishlist" component={Wishlist} />
      <Route path="/cart" component={Cart} />
      <Route path="/wallet" component={Wallet} />
        <Route path="/payment" component={Payment} />
         <Route path="/payment-success" component={PaymentSuccess} />
         <Route path="/order-details/:orderId" component={OrderDetails} />
         <Route path="/skill" component={SkillToSell} />
<Route path="/resell" component={Resell} />
<Route path="/seller-login" component={SellerLogin } />
<Route path="/seller-signup" component={SellerSignup} />
<Route path="/seller-auth-page" component={SellerAuthPage} />
<Route path="/seller-dashboard" component={SellerDashboard} />
  <Route path="/seller-profile" component={SellerProfile} />
  <Route path="/seller-create-listing" component={SellerCreateListing} />
  <Route path="/social-home" component={SocialHome} />
  <Route path="/live-chat" component={LiveChat} />
    </Switch>
  );
}
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
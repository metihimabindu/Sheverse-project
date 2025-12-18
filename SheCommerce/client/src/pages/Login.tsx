// import { useState } from 'react';
// import { Link, useLocation } from 'wouter'; // ✅ includes useLocation
// import { Header } from '@/components/Header';
// import { Footer } from '@/components/Footer';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card } from '@/components/ui/card';
// import { Separator } from '@/components/ui/separator';
// import { Checkbox } from '@/components/ui/checkbox';
// import { useToast } from '@/hooks/use-toast';
// import { Mail, Lock, Chrome } from 'lucide-react';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const { toast } = useToast();
//   const [, setLocation] = useLocation(); // ✅ navigation hook

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Login attempt:', { email, rememberMe });

//     // Simulated successful login
//     toast({
//       title: 'Login Successful',
//       description: 'Welcome back!',
//     });

//     // ✅ Redirect to home page (root)
//     setTimeout(() => {
//       setLocation('/');
//     }, 800); // delay for toast visibility
//   };

//   const handleGoogleLogin = () => {
//     console.log('Google login clicked');
//     toast({
//       title: 'Google Login',
//       description: 'Redirecting to Google...',
//     });

//     // ✅ Redirect to home page after simulated Google login
//     setTimeout(() => {
//       setLocation('/');
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen flex flex-col">
//       <Header />
//       <main className="flex-1 bg-muted/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8">
//             <h1
//               className="text-3xl font-serif font-bold text-foreground mb-2"
//               data-testid="text-login-title"
//             >
//               Welcome Back
//             </h1>
//             <p
//               className="text-muted-foreground"
//               data-testid="text-login-subtitle"
//             >
//               Sign in to access your wishlist, orders, and more
//             </p>
//           </div>

//           <Card className="p-8">
//             <form onSubmit={handleLogin} className="space-y-6">
//               {/* Email */}
//               <div className="space-y-2">
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="you@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-10"
//                     required
//                     data-testid="input-email"
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <Label htmlFor="password">Password</Label>
//                   <a
//                     href="#"
//                     className="text-sm text-primary hover:underline"
//                     data-testid="link-forgot-password"
//                   >
//                     Forgot password?
//                   </a>
//                 </div>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="pl-10"
//                     required
//                     data-testid="input-password"
//                   />
//                 </div>
//               </div>

//               {/* Remember Me */}
//               <div className="flex items-center gap-2">
//                 <Checkbox
//                   id="remember"
//                   checked={rememberMe}
//                   onCheckedChange={(checked) => setRememberMe(checked as boolean)}
//                   data-testid="checkbox-remember-me"
//                 />
//                 <Label htmlFor="remember" className="text-sm cursor-pointer">
//                   Remember me
//                 </Label>
//               </div>

//               {/* Submit Button */}
//               <Button type="submit" className="w-full" data-testid="button-login">
//                 Sign In
//               </Button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-6">
//               <Separator />
//               <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
//                 or continue with
//               </span>
//             </div>

//             {/* Social Login */}
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={handleGoogleLogin}
//               data-testid="button-google-login"
//             >
//               <Chrome className="h-5 w-5 mr-2" />
//               Sign in with Google
//             </Button>

//             {/* Sign Up Link */}
//             <p className="text-center text-sm text-muted-foreground mt-6">
//               Don't have an account?{' '}
//               <Link
//                 href="/signup"
//                 className="text-primary hover:underline font-medium"
//                 data-testid="link-signup"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </Card>

//           {/* Benefits Section */}
//           <div className="mt-8 p-6 bg-muted rounded-lg">
//             <h3
//               className="font-semibold text-foreground mb-3"
//               data-testid="text-benefits-title"
//             >
//               Benefits of joining:
//             </h3>
//             <ul className="space-y-2 text-sm text-muted-foreground">
//               <li className="flex items-start gap-2">
//                 <span className="text-primary mt-0.5">✓</span>
//                 Save products to your wishlist
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-primary mt-0.5">✓</span>
//                 Track your orders and view history
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-primary mt-0.5">✓</span>
//                 Leave reviews and support sellers
//               </li>
//               <li className="flex items-start gap-2">
//                 <span className="text-primary mt-0.5">✓</span>
//                 Sync your cart across devices
//               </li>
//             </ul>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// }



import { useState } from 'react';
import { Link, useLocation } from 'wouter'; // ✅ includes useLocation
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, Chrome } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation(); // ✅ navigation hook

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, rememberMe });

    // Simulated successful login
    toast({
      title: 'Login Successful',
      description: 'Welcome back!',
    });

    // ✅ Check if user came from Become a Seller page
    const isSellerLogin = window.location.search.includes('seller=true');

    // ✅ Redirect based on context
    setTimeout(() => {
      if (isSellerLogin) {
        setLocation('/seller-auth'); // Seller login redirect
      } else {
        setLocation('/'); // Normal user redirect
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    toast({
      title: 'Google Login',
      description: 'Redirecting to Google...',
    });

    // ✅ Check if user came from Become a Seller page
    const isSellerLogin = window.location.search.includes('seller=true');

    // ✅ Redirect based on context
    setTimeout(() => {
      if (isSellerLogin) {
        setLocation('/seller-auth');
      } else {
        setLocation('/');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1
              className="text-3xl font-serif font-bold text-foreground mb-2"
              data-testid="text-login-title"
            >
              Welcome Back
            </h1>
            <p
              className="text-muted-foreground"
              data-testid="text-login-subtitle"
            >
              Sign in to access your wishlist, orders, and more
            </p>
          </div>

          <Card className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm text-primary hover:underline"
                    data-testid="link-forgot-password"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    data-testid="input-password"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  data-testid="checkbox-remember-me"
                />
                <Label htmlFor="remember" className="text-sm cursor-pointer">
                  Remember me
                </Label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" data-testid="button-login">
                Sign In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                or continue with
              </span>
            </div>

            {/* Social Login */}
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
              data-testid="button-google-login"
            >
              <Chrome className="h-5 w-5 mr-2" />
              Sign in with Google
            </Button>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
                data-testid="link-signup"
              >
                Sign up
              </Link>
            </p>
          </Card>

          {/* Benefits Section */}
          <div className="mt-8 p-6 bg-muted rounded-lg">
            <h3
              className="font-semibold text-foreground mb-3"
              data-testid="text-benefits-title"
            >
              Benefits of joining:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Save products to your wishlist
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Track your orders and view history
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Leave reviews and support sellers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Sync your cart across devices
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

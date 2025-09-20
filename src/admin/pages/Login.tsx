import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Leaf, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    login
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from?.pathname || "/admin/naturalink/dashboard";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success('Connexion réussie !');
      navigate(redirectPath, { replace: true });
    } else {
      toast.error('Identifiants incorrects. Utilisez "admin" / "admin"');
    }
  };
  return <div className="min-h-screen flex">
      {/* Left Side - Nature Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Top Section */}
          <div className="flex items-center space-x-3">
            <Leaf className="h-8 w-8" />
            <div className="text-sm font-medium tracking-wider uppercase">
              LA TRANSPARENCE, NOTRE ENGAGEMENT
            </div>
          </div>

          {/* Center Content */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Tracez,<br />
              Valorisez,<br />
              Faites Confiance
            </h1>
            
            <p className="text-xl leading-relaxed text-white/90 max-w-md">
              Avec NaturaLink, chaque produit raconte son histoire. Transparence, traçabilité et impact durable au service des producteurs et des consommateurs.
            </p>
          </div>

          {/* Bottom decorative elements */}
          <div className="flex space-x-4 opacity-60">
            <div className="w-16 h-1 bg-white rounded"></div>
            <div className="w-8 h-1 bg-white/60 rounded"></div>
            <div className="w-4 h-1 bg-white/40 rounded"></div>
          </div>
        </div>

        {/* Decorative Pattern */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Header */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--nature-secondary))] shadow-glow">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">NaturaLink</h1>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">Bienvenue sur page admin de Naturalink</h2>
              <p className="text-muted-foreground">
                Connectez-vous pour accéder à votre espace de traçabilité intelligente
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adresse email</Label>
                <Input id="email" type="email" placeholder="admin" value={email} onChange={e => setEmail(e.target.value)} className="h-12" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="admin" value={password} onChange={e => setPassword(e.target.value)} className="h-12 pr-12" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember me and Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={rememberMe} onCheckedChange={checked => setRememberMe(checked as boolean)} />
                <Label htmlFor="remember" className="text-sm">
                  Se souvenir de moi
                </Label>
              </div>
              <button type="button" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Mot de passe oublié ?
              </button>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 transition-smooth">
              Se connecter
            </Button>

            {/* Google Login */}
            
          </form>

          {/* Sign up link */}
          
        </div>
      </div>
    </div>;
};
export default Login;
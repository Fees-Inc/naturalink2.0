import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Leaf, AlertCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });

  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signUp(
      signUpData.email,
      signUpData.password,
      signUpData.firstName,
      signUpData.lastName
    );

    if (error) {
      setError(error.message);
    } else {
      // Successfully signed up
      navigate('/role-selection');
    }
    setIsLoading(false);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      setError(error.message);
    } else {
      // Successfully signed in
      navigate('/');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <div className="w-full max-w-md space-y-6 p-6">
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 nature-gradient rounded-lg flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">NaturaLink</span>
          </div>
          <p className="text-muted-foreground">
            Rejoignez la révolution de la traçabilité agricole
          </p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Connexion</TabsTrigger>
            <TabsTrigger value="signup">Inscription</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <Card>
              <CardHeader>
                <CardTitle>Se connecter</CardTitle>
                <CardDescription>
                  Accédez à votre compte NaturaLink
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={signInData.email}
                      onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Mot de passe</Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInData.password}
                      onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Connexion...' : 'Se connecter'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Créer un compte</CardTitle>
                <CardDescription>
                  Rejoignez NaturaLink et commencez votre parcours vers la traçabilité
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        placeholder="Jean"
                        value={signUpData.firstName}
                        onChange={(e) => setSignUpData({ ...signUpData, firstName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        placeholder="Dupont"
                        value={signUpData.lastName}
                        onChange={(e) => setSignUpData({ ...signUpData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="votre@email.com"
                      value={signUpData.email}
                      onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Mot de passe</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Minimum 6 caractères"
                      value={signUpData.password}
                      onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Création...' : 'Créer mon compte'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
import { useState } from "react";
import {
  User,
  Lock,
  Dumbbell,
  LogIn,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export default function Login({ onCreateAccount }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    identifier: "", // This will hold either the username or the email
    password: "",
  });
  const { mutate: login, isPending, isError, error } = useLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    switch (user.role) {
      case "ROLE_ADMIN":
        navigate("/admin", { replace: true });
        break;

      case "ROLE_GYM_OWNER":
        navigate("/owner", { replace: true });
        break;

      case "ROLE_MEMBER":
        navigate("/member", { replace: true });
        break;
    }
  }, [user, navigate]);
  return (
    <div className="relative min-h-screen w-full bg-[#E1E5F1] flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Dynamic Background Blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[oklch(0.70_0.20_30/0.3)] blur-[100px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[oklch(0.85_0.15_340/0.2)] blur-[100px] rounded-full" />

      <Card className="relative z-10 w-full max-w-[450px] rounded-[32px] border-white/20 bg-black/80 backdrop-blur-2xl shadow-2xl text-white">
        <CardHeader className="pt-8 px-8 pb-1">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)] p-1.5 rounded-lg">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-black tracking-widest uppercase opacity-80">
                FitCloud
              </span>
            </div>
          </div>

          <CardTitle className="text-3xl font-black tracking-tight uppercase leading-none">
            Welcome <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)]">
              Back Athlete
            </span>
          </CardTitle>
          <CardDescription className="text-white/50 font-medium">
            Pick up exactly where you left off.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 py-1 space-y-5">
          {/* IDENTIFIER INPUT (Username or Email) */}
          <div className="space-y-1.5">
            <Label
              htmlFor="identifier"
              className="text-[10px] font-bold text-white/50 ml-1 uppercase"
            >
              Username or Email
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <Input
                id="identifier"
                type="text"
                placeholder="shrey_fit or hello@fitcloud.com"
                className="pl-9 h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <Label
                htmlFor="password"
                id="passlabel"
                className="text-[10px] font-bold text-white/50 uppercase"
              >
                Password
              </Label>
              <a
                href="#"
                className="text-[10px] text-white/30 hover:text-[oklch(0.70_0.20_30)] transition-colors"
              >
                FORGOT?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                className="pl-9 pr-10 h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                {showPassword ? (
                  <EyeOff className="w-3.5 h-3.5" />
                ) : (
                  <Eye className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-8 pb-10 pt-4 flex flex-col gap-4">
          <Button
            onClick={handleSubmit}
            className="w-full h-12 rounded-xl text-sm font-black bg-gradient-to-r from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-orange-500/10 group"
          >
            SIGN IN
            <LogIn className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="text-center text-[11px] text-white/40">
            New to the tribe?{" "}
            <button
              onClick={onCreateAccount}
              className="text-white font-bold hover:text-[oklch(0.70_0.20_30)] transition-colors underline decoration-[oklch(0.70_0.20_30)] underline-offset-4"
            >
              Create Account
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

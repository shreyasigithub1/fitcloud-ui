import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Phone,
  AtSign,
  Building2,
  Dumbbell,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRegisterGymOwner ,useLogin} from "@/hooks/useAuth";

export default function GymOwnerRegister({ onBack }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    bio: "",
    businessName: "",
  });

  const { mutate: register, isPending } = useRegisterGymOwner();
  const { mutate: login } = useLogin();

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    register(formData, {
      onSuccess: (registerResponse) => {
        console.log("Registered:", registerResponse);

        // auto login after successful registration
        login(
          {
            identifier: formData.userName,
            password: formData.password,
          },
          {
            onSuccess: (loginResponse) => {
              localStorage.setItem("token", loginResponse.token);
              localStorage.setItem("identifier", loginResponse.identifier);

              navigate("/dashboard");
            },
          }
        );
      },
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-[#E1E5F1] flex items-center justify-center p-4 overflow-hidden font-sans">

      {/* Background Blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[oklch(0.70_0.20_30/0.3)] blur-[100px] rounded-full animate-pulse" />

      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[oklch(0.85_0.15_340/0.2)] blur-[100px] rounded-full" />

      <Card className="relative z-10 w-full max-w-[650px] rounded-[32px] border-white/20 bg-black/80 backdrop-blur-2xl shadow-2xl text-white">

        <CardHeader className="pt-8 px-8 pb-4">

          {/* Top Section */}
          <div className="flex justify-between items-center mb-4">

            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <div className="flex items-center gap-1 text-[oklch(0.70_0.20_30)] text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Step 2 of 2
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-gradient-to-br from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)] p-1.5 rounded-lg">
              <Dumbbell className="w-5 h-5 text-white" />
            </div>

            <span className="text-sm font-black tracking-widest uppercase opacity-80">
              FitCloud
            </span>
          </div>

          {/* Heading */}
          <CardTitle className="text-3xl font-black tracking-tight uppercase leading-none">
            Build Your <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)]">
              Fitness Empire
            </span>
          </CardTitle>

          <CardDescription className="text-white/50 font-medium pt-2">
            Create your gym owner account and manage your fitness business.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 py-2 space-y-4">

          {/* Name + Username */}
          <div className="grid grid-cols-2 gap-3">

            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-[10px] font-bold text-white/50 ml-1 uppercase"
              >
                Full Name
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />

                <Input
                  id="name"
                  placeholder="Shreyasi"
                  className="pl-9 h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="userName"
                className="text-[10px] font-bold text-white/50 ml-1 uppercase"
              >
                Username
              </Label>

              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />

                <Input
                  id="userName"
                  placeholder="fit_owner"
                  className="pl-9 h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-2 gap-3">

            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-[10px] font-bold text-white/50 ml-1 uppercase"
              >
                Email Address
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />

                <Input
                  id="email"
                  type="email"
                  placeholder="owner@gmail.com"
                  className="pl-9 h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="phoneNumber"
                className="text-[10px] font-bold text-white/50 ml-1 uppercase"
              >
                Phone Number
              </Label>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />

                <Input
                  id="phoneNumber"
                  placeholder="+919876543210"
                  className="pl-9 h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Business Name */}
          <div className="space-y-1.5">

            <Label
              htmlFor="businessName"
              className="text-[10px] font-bold text-white/50 ml-1 uppercase"
            >
              Business Name
            </Label>

            <div className="relative">

              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />

              <Input
                id="businessName"
                placeholder="FitZone Gym"
                className="pl-9 h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-1.5">

            <Label
              htmlFor="bio"
              className="text-[10px] font-bold text-white/50 ml-1 uppercase"
            >
              Business Bio
            </Label>

            <Input
              id="bio"
              placeholder="Premium fitness center owner"
              className="h-11 bg-white/5 border-white/10 rounded-xl text-sm focus:border-[oklch(0.70_0.20_30)] transition-all"
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">

            <Label
              htmlFor="password"
              className="text-[10px] font-bold text-white/50 ml-1 uppercase"
            >
              Secure Password
            </Label>

            <div className="relative">

              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
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

        <CardFooter className="px-8 pb-10 pt-4">

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="w-full h-12 rounded-xl text-sm font-black bg-gradient-to-r from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)] hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl shadow-orange-500/10 group"
          >
            {isPending ? "Creating Account..." : "CREATE GYM OWNER ACCOUNT"}

            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
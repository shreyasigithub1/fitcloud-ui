import { Dumbbell, User, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function SelectRole({
  onSelectMember,
  onSelectGymOwner,
  onBack,
}) {
  return (
    <div className="relative min-h-screen w-full bg-[#E1E5F1] flex items-center justify-center p-4 overflow-hidden font-sans">

      {/* Background Blurs */}
      <div className="absolute top-[-5%] left-[-5%] w-[400px] h-[400px] bg-[oklch(0.70_0.20_30/0.3)] blur-[100px] rounded-full animate-pulse" />

      <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-[oklch(0.85_0.15_340/0.2)] blur-[100px] rounded-full" />

      <Card className="relative z-10 w-full max-w-[450px] rounded-[32px] border-white/20 bg-black/80 backdrop-blur-2xl shadow-2xl text-white">

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
              Step 1 of 2
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
            Choose Your <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)]">
              Fitness Identity
            </span>
          </CardTitle>

          <CardDescription className="text-white/50 font-medium pt-2">
            Select how you want to experience FitCloud.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8 pb-8 space-y-4">

          {/* Member Button */}
          <Button
            onClick={onSelectMember}
            className="w-full h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-[1.01] active:scale-[0.99] group"
          >
            <div className="flex items-center justify-between w-full px-2">

              <div className="flex items-center gap-4">

                <div className="bg-gradient-to-br from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)] p-3 rounded-xl">
                  <User className="w-5 h-5 text-white" />
                </div>

                <div className="text-left">
                  <p className="font-black text-sm uppercase">
                    Gym Member
                  </p>

                  <p className="text-[11px] text-white/50">
                    Track workouts & fitness goals
                  </p>
                </div>
              </div>

              <span className="text-white/30 group-hover:text-white transition-colors">
                →
              </span>
            </div>
          </Button>

          {/* Gym Owner Button */}
          <Button
            onClick={onSelectGymOwner}
            className="w-full h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-[1.01] active:scale-[0.99] group"
          >
            <div className="flex items-center justify-between w-full px-2">

              <div className="flex items-center gap-4">

                <div className="bg-gradient-to-br from-[oklch(0.70_0.20_30)] to-[oklch(0.85_0.15_340)] p-3 rounded-xl">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>

                <div className="text-left">
                  <p className="font-black text-sm uppercase">
                    Gym Owner
                  </p>

                  <p className="text-[11px] text-white/50">
                    Manage gyms, trainers & members
                  </p>
                </div>
              </div>

              <span className="text-white/30 group-hover:text-white transition-colors">
                →
              </span>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
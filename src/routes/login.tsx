import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [seconds, setSeconds] = useState(240);

  useEffect(() => {
    if (!otpSent) return;
    const i = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(i);
  }, [otpSent]);

  const sendCode = async () => {
    if (!email) return toast.error("Enter your email");
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    setOtpSent(true); setSeconds(240);
    toast.success("Verification code sent to your email");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) return sendCode();
    if (code.length < 6) return toast.error("Enter the 6-digit code");
    setLoading(true);
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "email" });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back");
    nav({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="glass-strong w-full max-w-md p-6 space-y-4">
        <div className="flex justify-center"><Logo size={42} /></div>
        <h1 className="text-center text-xl font-semibold">Welcome back</h1>
        <input className="input-glass" type="email" placeholder="Gmail address" value={email} onChange={e => setEmail(e.target.value)} disabled={otpSent} required />
        <div className="flex gap-2">
          <input className="input-glass" placeholder="Verification code" value={code} onChange={e => setCode(e.target.value)} maxLength={6} disabled={!otpSent} />
          <button type="button" className="btn-glow whitespace-nowrap" onClick={sendCode} disabled={loading}>
            {otpSent ? `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,"0")}` : "Send code"}
          </button>
        </div>
        <button disabled={loading} className="btn-glow btn-glow-primary w-full">
          {loading ? "Please wait…" : otpSent ? "Verify & sign in" : "Send verification code"}
        </button>
        <p className="text-center text-sm text-muted-foreground">No account? <Link to="/register" className="text-primary">Register</Link></p>
      </form>
    </div>
  );
}

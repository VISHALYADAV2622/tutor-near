"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineUser, AiOutlineMail } from "react-icons/ai";
import PasswordInput from "./PasswordInput";
import OTPInput from "./OTPInput";
import { studentRegisterSchema, StudentRegisterData } from "@/lib/validations";

type UserType = "student" | "teacher";
type Step = "form" | "otp";

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-xs text-red-500 flex items-center gap-1">
      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  );
}

function inputCls(error?: string) {
  return `w-full pl-10 pr-4 py-2.5 text-sm text-gray-900 border rounded-lg outline-none transition-all duration-150
    placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    ${error ? "border-red-400 bg-red-50 focus:ring-red-500/20 focus:border-red-400" : "border-gray-200 hover:border-gray-300"}`;
}

// ── OTP Verification Screen ───────────────────────────────────
function OTPScreen({ email, onSuccess, onBack }: { email: string; onSuccess: () => void; onBack: () => void }) {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let t = 30;
    const interval = setInterval(() => {
      t -= 1;
      setResendTimer(t);
      if (t <= 0) {
        clearInterval(interval);
        setCanResend(true);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const startResendTimer = () => {
    setCanResend(false);
    setResendTimer(30);
    let t = 30;
    const interval = setInterval(() => {
      t -= 1;
      setResendTimer(t);
      if (t <= 0) {
        clearInterval(interval);
        setCanResend(true);
      }
    }, 1000);
  };

  const handleVerify = async () => {
    if (otp.length < 6) {
      setOtpError("Please enter the complete 6-digit OTP");
      return;
    }
    setOtpError("");
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 1500));
    // TODO: verify OTP with backend
    setIsVerifying(false);
    onSuccess();
  };

  const handleResend = () => {
    setOtp("");
    setOtpError("");
    // TODO: resend OTP API call
    startResendTimer();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          We sent a 6-digit code to{" "}
          <span className="font-semibold text-gray-800">{email}</span>
        </p>
      </div>

      <OTPInput value={otp} onChange={setOtp} error={otpError} />

      <button
        onClick={handleVerify}
        disabled={isVerifying || otp.length < 6}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl
          transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        {isVerifying ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Verifying…
          </>
        ) : (
          "Verify OTP"
        )}
      </button>

      <p className="text-sm text-gray-500">
        Didn&apos;t receive the code?{" "}
        {canResend ? (
          <button onClick={handleResend} className="font-semibold text-blue-600 hover:underline">
            Resend OTP
          </button>
        ) : (
          <span className="text-gray-400">Resend in {resendTimer}s</span>
        )}
      </p>

      <button onClick={onBack} className="text-sm text-gray-400 hover:text-gray-600 hover:underline transition-colors">
        ← Wrong email? Go back
      </button>
    </div>
  );
}

// ── Register Fields (shared for both roles) ───────────────────
function RegisterFields({ userType, onSuccess }: { userType: UserType; onSuccess: (email: string) => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentRegisterData>({ resolver: zodResolver(studentRegisterSchema) });

  const onSubmit = async (data: StudentRegisterData) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    // TODO: call register API with userType + data
    console.log(`${userType} register:`, data);
    setIsLoading(false);
    onSuccess(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      {/* Full Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Full Name</label>
        <div className="relative">
          <AiOutlineUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="text"
            placeholder={userType === "student" ? "Rahul Verma" : "Priya Sharma"}
            {...register("fullName")}
            className={inputCls(errors.fullName?.message)}
          />
        </div>
        <FieldError msg={errors.fullName?.message} />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Email address</label>
        <div className="relative">
          <AiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4.5 h-4.5" />
          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email")}
            className={inputCls(errors.email?.message)}
          />
        </div>
        <FieldError msg={errors.email?.message} />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Phone Number</label>
        <div className="relative flex">
          <span className="flex items-center px-3 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-sm text-gray-600 font-medium">
            +91
          </span>
          <input
            type="tel"
            placeholder="9876543210"
            maxLength={10}
            {...register("phone")}
            className={`flex-1 pr-4 py-2.5 text-sm text-gray-900 border rounded-r-lg outline-none transition-all duration-150
              placeholder:text-gray-400 bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
              ${errors.phone ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
          />
        </div>
        <FieldError msg={errors.phone?.message} />
      </div>

      {/* Password */}
      <PasswordInput
        label="Password"
        placeholder="Min 8 chars, 1 uppercase, 1 number"
        showStrength
        {...register("password")}
        value={watch("password") ?? ""}
        error={errors.password?.message}
      />

      {/* Confirm Password */}
      <PasswordInput
        label="Confirm Password"
        placeholder="Repeat password"
        {...register("confirmPassword")}
        value={watch("confirmPassword") ?? ""}
        error={errors.confirmPassword?.message}
      />

      <button
        type="submit"
        disabled={isLoading}
        className="mt-1 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl
          transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
          flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
      >
        {isLoading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating account…
          </>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}

// ── Main ──────────────────────────────────────────────────────
export default function RegisterForm() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>("student");
  const [step, setStep] = useState<Step>("form");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleFormSuccess = (email: string) => {
    setRegisteredEmail(email);
    setStep("otp");
  };

  const handleOTPSuccess = () => {
    router.push("/login");
  };

  if (step === "otp") {
    return (
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Verify your email</h2>
          <p className="text-gray-500 text-sm mt-1">Almost there! Enter the code we sent you.</p>
        </div>
        <OTPScreen
          email={registeredEmail}
          onSuccess={handleOTPSuccess}
          onBack={() => setStep("form")}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Create your account</h2>
        <p className="text-gray-500 text-sm mt-1">Join thousands of learners and educators on TutorNear</p>
      </div>

      {/* User type tabs */}
      <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
        {(["student", "teacher"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setUserType(t)}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              userType === t ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span>{t === "student" ? "👨‍🎓" : "👩‍🏫"}</span>
            {t === "student" ? "Student / Parent" : "Teacher"}
          </button>
        ))}
      </div>

      {/* Role badge */}
      <div
        className={`flex items-center gap-2 mb-5 text-xs font-medium px-3 py-2 rounded-lg
          ${userType === "student" ? "bg-purple-50 text-purple-700" : "bg-green-50 text-green-700"}`}
      >
        <div className={`w-2 h-2 rounded-full ${userType === "student" ? "bg-purple-400" : "bg-green-400"}`} />
        {userType === "student"
          ? "Registering as a Student or Parent looking for tutors"
          : "Registering as a Teacher to offer tutoring services"}
      </div>

      <RegisterFields userType={userType} onSuccess={handleFormSuccess} />

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

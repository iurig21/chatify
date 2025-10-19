import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Loader } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

function SignUpPage() {
  const { register, handleSubmit } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const { isLoggingUp, login } = useAuthStore();

  function onLoggingUp(data) {
    login(data);
  }

  return (
    <div className="w-full flex items-center justify-center p-4 bg-slate-900">
      <div className="relative w-full max-w-5xl md:h-[675px] h-[650px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30">
              <div className="w-full max-w-md">
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>

                <form
                  onSubmit={handleSubmit(onLoggingUp)}
                  className="space-y-6"
                >
                  <div>
                    <label className="auth-input-label"> Email</label>
                    <div className="relative">
                      <Mail className="auth-input-icon" />
                      <input
                        type="email"
                        {...register("email")}
                        className="input"
                        placeholder="JohnDoe@gmail.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="auth-input-label"> Password</label>
                    <div className="relative">
                      <Lock className="auth-input-icon" />
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        className="input"
                        placeholder="**********"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer absolute left-102 top-1/2 -translate-y-1/2 text-slate-400 size-5"
                      >
                        {!showPassword ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="auth-btn"
                    disabled={isLoggingUp}
                  >
                    {" "}
                    {isLoggingUp ? (
                      <Loader className="w-full h-5 text-center animate-spin" />
                    ) : (
                      "Login"
                    )}{" "}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div>
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect Anytime,Anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Secure</span>
                    <span className="auth-badge">Fast</span>
                    <span className="auth-badge">Reliable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default SignUpPage;

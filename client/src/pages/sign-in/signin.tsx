import  { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../../config";

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await sendRequest({
        method: "post",
        isAuth: true,
        url: "sign-in",
        body: { email, password },
      });

      toast.success(res.message);
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 ">
      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6 ">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value.trim())}
                className="w-full px-4 py-2 pr-10 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 rounded-md shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;

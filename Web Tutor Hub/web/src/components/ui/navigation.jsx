import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Menu,
  X,
  Gamepad2,
  Coins,
  BookOpen,
  Newspaper,
  FileText,
  User,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Users,
} from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router";

const navItems = [
  { name: "Home", href: "/", icon: null },
  { name: "Games", href: "/games", icon: Gamepad2 },
  { name: "DeFi Try-It", href: "/defi", icon: Coins },
  { name: "Learn", href: "/learn", icon: BookOpen },
  { name: "News", href: "/news", icon: Newspaper },
  { name: "Sessions", href: "/sessions", icon: FileText },
  { name: "W3 Social", href: "/w3-social", icon: Users },
];

export const Navigation = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, login, register, logout, isAuthenticated } = useAuth();

  const handleNavClick = (href) => {
    navigate(href);
    setIsMobileMenuOpen(false);
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let result;
      if (authMode === "login") {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          setError("Name is required");
          setLoading(false);
          return;
        }
        result = await register(formData.email, formData.password, formData.name);
      }

      if (result.success) {
        setShowAuthModal(false);
        setFormData({ email: "", password: "", name: "" });
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick("/")}
                className="flex items-center space-x-3"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-md">
                  <div className="text-white font-bold text-sm">W3</div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Web3 Tutor Hub
                </span>
              </motion.button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <motion.button
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 font-medium"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Welcome, {user?.name}
                  </span>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setAuthMode("login");
                      setShowAuthModal(true);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="web3" 
                    onClick={() => {
                      setAuthMode("register");
                      setShowAuthModal(true);
                    }}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.button
                      key={item.name}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick(item.href)}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-left rounded-xl text-slate-600 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 font-medium"
                    >
                      {IconComponent && <IconComponent className="w-5 h-5" />}
                      <span>{item.name}</span>
                    </motion.button>
                  );
                })}

                {/* Mobile CTAs */}
                <div className="pt-4 space-y-3">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="text-center text-sm text-gray-600 dark:text-gray-300">
                        Welcome, {user?.name}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-center"
                        onClick={() => {
                          setAuthMode("login");
                          setShowAuthModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        variant="web3"
                        className="w-full justify-center"
                        onClick={() => {
                          setAuthMode("register");
                          setShowAuthModal(true);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {authMode === "login" ? "Sign In" : "Create Account"}
                </h2>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === "register" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => updateField("password", e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="text-red-600 text-sm">{error}</div>
                )}

                <Button 
                  type="submit" 
                  variant="web3" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Loading..." : (authMode === "login" ? "Sign In" : "Create Account")}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setAuthMode(authMode === "login" ? "register" : "login");
                    setError("");
                  }}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 text-sm font-medium"
                >
                  {authMode === "login" 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

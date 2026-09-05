import React, { useState } from 'react';
import {
  Shield,
  Lock,
  Mail,
  User,
  Building,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('s.jenkins@gov.capacityconnect.org');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Sarah Jenkins');
  const [department, setDepartment] = useState('Bureau of Public Innovation');
  const [selectedRole, setSelectedRole] = useState<UserRole>('learner');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter a valid official agency email address.');
      return;
    }
    setErrorMessage('');
    onLoginSuccess(selectedRole);
  };

  const fillQuickDemo = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'learner') {
      setEmail('s.jenkins@gov.capacityconnect.org');
      setFullName('Sarah Jenkins');
      setDepartment('Bureau of Public Innovation & Digital Services');
    } else {
      setEmail('admin.vance@gov.capacityconnect.org');
      setFullName('Dr. Marcus Vance');
      setDepartment('Agency Workforce & Capacity Directorate');
    }
    setPassword('GovSecure2026!');
  };

  return (
    <div
      id="login-screen-wrapper"
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8"
    >
      {/* Top Bar for Gov Trust */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Shield className="w-4 h-4 text-teal-600" />
          <span>Official Public Sector Digital Capacity Gateway</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-teal-700 font-semibold">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
          <span>FedRAMP &amp; ISO 27001 Aligned Sandbox</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-md w-full mx-auto my-auto py-6">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 text-white shadow-xs mb-4">
            <span className="text-2xl font-black tracking-tight">CC</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Capacity Connect
          </h1>
          <p className="text-xs text-slate-500 mt-1.5 max-w-sm mx-auto leading-relaxed">
            Digital Capacity Building &amp; Organizational Learning Management Portal
          </p>
        </div>

        {/* Auth Card */}
        <div
          id="auth-card"
          className="bg-white border border-slate-200 rounded-3xl shadow-xs p-6 sm:p-8"
        >
          {/* Quick Demo Autofill Notice */}
          <div className="mb-6 p-3.5 bg-teal-50 border border-teal-200 rounded-2xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-teal-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Demo 1-Click Fast Access:
              </span>
              <span className="text-[10px] text-teal-700 uppercase tracking-wider font-extrabold">
                Evaluation Mode
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                id="demo-login-learner-btn"
                onClick={() => {
                  fillQuickDemo('learner');
                  onLoginSuccess('learner');
                }}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                  selectedRole === 'learner'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Sign In as Learner (Sarah)
              </button>
              <button
                type="button"
                id="demo-login-admin-btn"
                onClick={() => {
                  fillQuickDemo('admin');
                  onLoginSuccess('admin');
                }}
                className={`py-2 px-2.5 rounded-xl text-xs font-bold border text-center transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Sign In as Admin (Marcus)
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-slate-100 mb-6">
            <button
              type="button"
              id="tab-login"
              onClick={() => {
                setIsRegisterMode(false);
                setErrorMessage('');
              }}
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
                !isRegisterMode
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              id="tab-register"
              onClick={() => {
                setIsRegisterMode(true);
                setErrorMessage('');
              }}
              className={`flex-1 pb-3 text-xs font-bold text-center border-b-2 transition-all cursor-pointer ${
                isRegisterMode
                  ? 'border-teal-600 text-teal-700'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              Register Account
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-800 text-xs font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegisterMode && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Legal / Official Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      required
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Department / Agency
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      id="register-department"
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Bureau of Public Innovation"
                      required
                      className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Official Agency Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.gov"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password
                </label>
                {!isRegisterMode && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      setResetEmailSent(false);
                    }}
                    className="text-[11px] text-teal-700 hover:text-teal-800 hover:underline font-semibold cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="auth-password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Role Selection Option */}
            <div className="pt-1">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Select Portal Access Role
              </label>
              <div className="grid grid-cols-2 gap-2">
                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedRole === 'learner'
                      ? 'bg-teal-50 border-teal-300 text-teal-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === 'learner'}
                    onChange={() => setSelectedRole('learner')}
                    className="accent-teal-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Employee / Learner</div>
                    <div className="text-[10px] text-slate-500">Personal upskilling</div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                    selectedRole === 'admin'
                      ? 'bg-teal-50 border-teal-300 text-teal-900'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    checked={selectedRole === 'admin'}
                    onChange={() => setSelectedRole('admin')}
                    className="accent-teal-600"
                  />
                  <div>
                    <div className="font-bold text-slate-900">Administrator</div>
                    <div className="text-[10px] text-slate-500">Agency oversight</div>
                  </div>
                </label>
              </div>
            </div>

            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{isRegisterMode ? 'Create Capacity Profile' : 'Access Learning Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footnote */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500 font-medium">
              {isRegisterMode ? 'Already registered?' : "Need an organization account?"}{' '}
              <button
                type="button"
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-teal-700 hover:text-teal-800 hover:underline font-bold cursor-pointer"
              >
                {isRegisterMode ? 'Sign in here' : 'Register official profile'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-xl animate-in fade-in">
            <div className="flex items-center gap-2 text-teal-700 mb-2">
              <HelpCircle className="w-5 h-5 text-teal-600" />
              <h3 className="font-black text-base text-slate-900">Reset Credentials</h3>
            </div>
            {resetEmailSent ? (
              <div className="py-3 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-900">Verification Link Dispatched</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  A secure password reset link has been transmitted to your agency inbox at {email}.
                </p>
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="mt-4 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Close &amp; Return to Sign In
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                  Enter your official email address. An authorization link will be sent to confirm your agency credentials.
                </p>
                <input
                  type="email"
                  defaultValue={email}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 mb-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="px-3.5 py-2 text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetEmailSent(true)}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="max-w-4xl mx-auto w-full text-center text-xs text-slate-500 pt-6">
        <p className="font-semibold text-slate-600">Capacity Connect — Digital Capacity Building &amp; Organizational Learning Management Portal</p>
        <p className="text-[11px] text-slate-400 mt-1">
          Designed for Public Sector Agencies &bull; Single Sign-On (SSO) &bull; Competency Architecture
        </p>
      </div>
    </div>
  );
};

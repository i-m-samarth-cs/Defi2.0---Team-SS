import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Navigation } from "@/components/ui/navigation";
import { DemoMessageDock } from "@/components/blocks/demo-message-dock";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Clock,
  Zap,
  Trophy,
  BarChart3,
  Target,
  Coins,
  Layers,
  RefreshCw,
} from "lucide-react";

const rewardPools = [
  {
    name: "ETH Staking Vault",
    apy: "12.4%",
    lockup: "Flexible",
    tvl: "$8.1M",
    gradient: "bg-gradient-to-r from-blue-500 to-indigo-500",
  },
  {
    name: "USDC Auto-Compounder",
    apy: "18.7%",
    lockup: "30 days",
    tvl: "$5.4M",
    gradient: "bg-gradient-to-r from-emerald-500 to-lime-500",
  },
  {
    name: "Multi-Chain Yield Basket",
    apy: "27.3%",
    lockup: "60 days",
    tvl: "$3.2M",
    gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

const milestones = [
  {
    title: "Compound Rewards Mastery",
    detail: "Unlock faster growth by reinvesting rewards automatically.",
  },
  {
    title: "APY Shock Testing",
    detail: "Stress-test your yields against real market volatility.",
  },
  {
    title: "Risk-Adjusted Growth",
    detail: "Balance rewards with capital preservation metrics.",
  },
];

const RewardsPage = () => {
  const [deposit, setDeposit] = useState(1500);
  const [apy, setApy] = useState(18);
  const [duration, setDuration] = useState(90);
  const [frequency, setFrequency] = useState("weekly");

  const compoundPerYear = {
    daily: 365,
    weekly: 52,
    monthly: 12,
  }[frequency];

  const projectedValue = useMemo(() => {
    const years = duration / 365;
    const rate = apy / 100;
    return deposit * Math.pow(1 + rate / compoundPerYear, compoundPerYear * years);
  }, [deposit, apy, duration, compoundPerYear]);

  const totalRewards = projectedValue - deposit;
  const effectiveApy = (totalRewards / deposit / (duration / 365)) * 100 || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-sm font-semibold mb 6">
              <Zap className="w-5 h-5 mr-2" />
              Live Rewards Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Simulate Yield Growth, Minute by Minute
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understand staking rewards, compounded interest, and accrual timing without
              locking up real capital. Control APY values, reward frequency, and payout
              schedules in a safe sandbox.
            </p>
          </motion.div>
        </div>
      </section>

  {/* Simulator */}
  <section className="pb-16">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
      {/* Controls */}
      <motion.div
        className="lg:col-span-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Reward Controls</CardTitle>
            <CardDescription>Interactively simulate your growth curve.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Deposit Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Starting Deposit (USD)
                </label>
                <input
                  type="number"
                  value={deposit}
                  min={100}
                  step={100}
                  onChange={(e) => setDeposit(parseFloat(e.target.value) || 0)}
                  className="mt-2 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-slate-900/50 text-gray-900 dark:text-white px-3 py-2"
                />
              </div>

              {/* APY Input */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Target APY (%)
                </label>
                <input
                  type="number"
                  value={apy}
                  min={5}
                  max={40}
                  step={0.5}
                  onChange={(e) => setApy(parseFloat(e.target.value) || 0)}
                  className="mt-2 w-full rounded-md border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-slate-900/50 text-gray-900 dark:text-white px-3 py-2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Duration Slider */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Simulation Duration (days)
                </label>
                <div className="mt-4">
                  <input
                    type="range"
                    min={30}
                    max={365}
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full accent-purple-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1 Month</span>
                    <span>{duration} days</span>
                    <span>1 Year</span>
                  </div>
                </div>
              </div>

              {/* Frequency Select */}
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Compounding Frequency
                </label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {["daily", "weekly", "monthly"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFrequency(option)}
                      className={`px-3 py-2 rounded-xl text-sm font-medium capitalize border ${
                        frequency === option
                          ? "bg-purple-600 text-white border-purple-600"
                          : "bg-white/80 dark:bg-slate-900/50 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Stats */}
            <div className="grid md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6">
              <div>
                <p className="text-sm text-gray-500">Projected Value</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  ${projectedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Rewards</p>
                <p className="text-2xl font-semibold text-emerald-500">
                  ${totalRewards.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Effective APY</p>
                <p className="text-2xl font-semibold text-purple-600">
                  {effectiveApy.toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Alerts */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-0">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Real-Time Accrual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-purple-100">
                    Rewards update every {frequency}. Perfect for studying short-term vs
                    long-term yields.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                <CardHeader>
                  <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
                    <Target className="w-5 h-5 mr-2" />
                    Risk Reminder
                  </CardTitle>
                  <CardDescription>
                    Use scenario testing to see how volatile APY can slow growth.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-amber-700 dark:text-amber-100">
                    Try lowering APY or extending duration to observe smoother curves.
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Pools Overview */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-6"
      >
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle>Live Reward Pools</CardTitle>
            <CardDescription>Compare strategies before going on-chain.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {rewardPools.map((pool) => (
              <div key={pool.name} className={`p-4 rounded-2xl text-white ${pool.gradient}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-semibold">{pool.name}</p>
                    <p className="text-sm text-white/80">Lockup: {pool.lockup}</p>
                  </div>
                  <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                    APY {pool.apy}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-3">
                  <span className="flex items-center">
                    <Coins className="w-4 h-4 mr-2" />
                    TVL {pool.tvl}
                  </span>
                  <span className="flex items-center">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Auto-compounding
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-slate-900 text-white">
          <CardHeader>
            <CardTitle className="text-white">Need mentorship?</CardTitle>
            <CardDescription className="text-slate-200">
              Join the live reward strategy workshop.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <BarChart3 className="w-6 h-6 text-emerald-300" />
              <div>
                <p className="font-medium">Yield Deep Dive</p>
                <p className="text-sm text-slate-200">
                  Daily at 18:00 UTC · Seats: 80 · Interactive
                </p>
              </div>
            </div>
            <Button variant="web3" className="w-full bg-white text-slate-900 hover:bg-slate-100">
              Save My Seat
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </section>

  {/* Learning */}
  <section className="pb-20">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="grid lg:grid-cols-2 gap-8"
      >
        <Card className="border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-white dark:from-slate-900 dark:to-slate-950">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Layers className="w-6 h-6 mr-3 text-emerald-600" />
              Milestone Roadmap
            </CardTitle>
            <CardDescription>Level up your reward farming intuition.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="p-4 rounded-2xl border border-emerald-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50">
                <p className="font-semibold">{milestone.title}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{milestone.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-950">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center">
              <Trophy className="w-6 h-6 mr-3 text-purple-600" />
              Challenge Mode
            </CardTitle>
            <CardDescription>
              Apply what you’ve learned under timed scenarios.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-purple-100 dark:border-slate-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Challenge 01</p>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Hit a 20% effective APY with &lt;15% volatility.
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Experiment with APY, duration, and compounding until the effective APY target is reached.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/60 border border-purple-100 dark:border-slate-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Challenge 02</p>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Double your deposit in under 18 months.
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use realistic APY values and compounding frequencies to see how feasible this goal is.
              </p>
            </div>
            <Button variant="web3" className="w-full">
              Start Challenge
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  </section>

  <DemoMessageDock />
</div>
  );
};

export default RewardsPage;
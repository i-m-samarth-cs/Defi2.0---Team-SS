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
import { Input } from "@/components/ui/input";
import {
  Droplet,
  Waves,
  AlertTriangle,
  Shield,
  Coins,
  RefreshCw,
  Zap,
  LineChart,
  GraduationCap,
  Layers,
} from "lucide-react";

const pools = [
  {
    name: "ETH / USDC",
    tvl: "$12.4M",
    fees: "0.30%",
    dailyVolume: "$3.1M",
    gradient: "bg-gradient-to-r from-blue-500 to-cyan-400",
  },
  {
    name: "SOL / ETH",
    tvl: "$4.8M",
    fees: "0.50%",
    dailyVolume: "$740K",
    gradient: "bg-gradient-to-r from-purple-500 to-indigo-400",
  },
  {
    name: "MATIC / USDT",
    tvl: "$6.1M",
    fees: "0.05%",
    dailyVolume: "$1.4M",
    gradient: "bg-gradient-to-r from-emerald-500 to-lime-400",
  },
];

const learningTracks = [
  {
    title: "Impermanent Loss Lab",
    description: "Visualize how price divergence impacts your LP position.",
    icon: AlertTriangle,
  },
  {
    title: "Fee Farming Strategies",
    description: "Compare fee tiers and APY outcomes for different pools.",
    icon: Coins,
  },
  {
    title: "Concentrated Liquidity",
    description: "Practice allocating liquidity into custom tick ranges.",
    icon: Layers,
  },
];

const formatNumber = (value) =>
  new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);

const LiquidityPage = () => {
  const [tokenA, setTokenA] = useState(1.5);
  const [tokenB, setTokenB] = useState(3000);
  const [poolLiquidity, setPoolLiquidity] = useState(2500000);
  const [priceShift, setPriceShift] = useState(12);

  const lpValue = useMemo(() => tokenA * tokenB, [tokenA, tokenB]);
  const poolShare = useMemo(
    () => Math.min((lpValue / poolLiquidity) * 100, 100),
    [lpValue, poolLiquidity]
  );

  const impermanentLoss = useMemo(() => {
    const ratio = (100 + priceShift) / 100;
    const il = (2 * Math.sqrt(ratio)) / (1 + ratio) - 1;
    return Math.abs(il * 100);
  }, [priceShift]);

  const projectedFees = useMemo(() => {
    const baseAPR = 18;
    const utilizationBonus = Math.min(priceShift / 4, 6);
    return (poolShare / 100) * (baseAPR + utilizationBonus);
  }, [poolShare, priceShift]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-blue-50 dark:from-gray-950 dark:via-slate-900 dark:to-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
              <Droplet className="w-5 h-5 mr-2" />
              Liquidity Provision Simulator
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Practice Providing Liquidity Like a Pro
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understand AMM math, LP share calculations, fees, and impermanent
              loss inside an interactive sandbox. Your moves update the metrics
              instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Simulator */}
      <section className="pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-3 gap-8">
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Liquidity Controls</CardTitle>
                <CardDescription>
                  Adjust your position and see the results in real time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Token A Amount (ETH)
                    </label>
                    <div className="mt-2 flex items-center space-x-2">
                      <Input
                        type="number"
                        value={tokenA}
                        min={0}
                        step={0.1}
                        onChange={(e) => setTokenA(parseFloat(e.target.value) || 0)}
                      />
                      <span className="text-sm text-gray-500">ETH</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Token B Amount (USDC)
                    </label>
                    <div className="mt-2 flex items-center space-x-2">
                      <Input
                        type="number"
                        value={tokenB}
                        min={0}
                        step={50}
                        onChange={(e) => setTokenB(parseFloat(e.target.value) || 0)}
                      />
                      <span className="text-sm text-gray-500">USDC</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Total Pool Liquidity (USD)
                    </label>
                    <div className="mt-2 flex items-center space-x-2">
                      <Input
                        type="number"
                        value={poolLiquidity}
                        min={500000}
                        step={50000}
                        onChange={(e) =>
                          setPoolLiquidity(parseFloat(e.target.value) || 0)
                        }
                      />
                      <span className="text-sm text-gray-500">USD</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Expected Price Movement
                    </label>
                    <div className="mt-6">
                      <input
                        type="range"
                        min={0}
                        max={40}
                        value={priceShift}
                        onChange={(e) => setPriceShift(Number(e.target.value))}
                        className="w-full accent-blue-600"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Stable</span>
                        <span>{priceShift}% swing</span>
                        <span>Volatile</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 grid md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">Your LP Value</p>
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      ${formatNumber(lpValue)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pool Share</p>
                    <p className="text-2xl font-semibold text-blue-600">
                      {formatNumber(poolShare)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Projected Fees (APR)</p>
                    <p className="text-2xl font-semibold text-emerald-500">
                      {formatNumber(projectedFees)}%
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white border-0">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Waves className="w-5 h-5 mr-2" />
                        Liquidity Health
                      </CardTitle>
                      <CardDescription className="text-blue-100">
                        Based on current inputs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">
                        {poolShare > 5 ? "Robust" : "Conservative"}
                      </div>
                      <p className="text-sm text-blue-100">
                        Position is optimised for {priceShift < 15 ? "stable" : "volatile"}{" "}
                        market conditions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
                    <CardHeader>
                      <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
                        <AlertTriangle className="w-5 h-5 mr-2" />
                        Impermanent Loss
                      </CardTitle>
                      <CardDescription>
                        Expected loss if prices diverge by {priceShift}%.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-amber-600">
                        {formatNumber(impermanentLoss)}%
                      </div>
                      <p className="text-sm text-amber-700 dark:text-amber-200 mt-2">
                        Mitigate by rebalancing or selecting narrower price ranges.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pools list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Live Pool Benchmarks</CardTitle>
                <CardDescription>
                  Compare with popular pools before deploying capital.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pools.map((pool) => (
                  <div
                    key={pool.name}
                    className={`p-4 rounded-2xl text-white flex flex-col gap-2 ${pool.gradient}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold">{pool.name}</div>
                      <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">
                        Fee {pool.fees}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Zap className="w-4 h-4 mr-2" /> TVL {pool.tvl}
                      </span>
                      <span className="flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" /> Volume {pool.dailyVolume}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#38bdf8,_transparent_40%)]" />
              </div>
              <CardHeader>
                <CardTitle className="text-white">Need guidance?</CardTitle>
                <CardDescription className="text-slate-200">
                  Jump into the live workshop for this simulator.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-cyan-300" />
                  <div>
                    <p className="font-medium">Instructor-led LP Strategy</p>
                    <p className="text-sm text-slate-200">
                      Daily at 16:00 UTC · Seats: 120 · Free
                    </p>
                  </div>
                </div>
                <Button variant="web3" className="w-full bg-white text-slate-900 hover:bg-slate-100">
                  Reserve Your Spot
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Learning section */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <Card className="border border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <LineChart className="w-6 h-6 mr-3 text-blue-600" />
                  Progression Path
                </CardTitle>
                <CardDescription>
                  Follow this curriculum to master liquidity provision.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningTracks.map((track) => (
                  <div
                    key={track.title}
                    className="p-4 rounded-2xl border border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-900/50 flex items-start space-x-3"
                  >
                    <track.icon className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <p className="font-semibold">{track.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {track.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-white dark:from-slate-900 dark:to-slate-950">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <GraduationCap className="w-6 h-6 mr-3 text-purple-600" />
                  Challenge Mode
                </CardTitle>
                <CardDescription>
                  Target-based exercises to test your understanding.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-purple-100 dark:border-slate-800">
                  <p className="text-sm text-gray-500">Challenge 01</p>
                  <h4 className="text-lg font-semibold">
                    Reach 10% pool share with less than 3% impermanent loss.
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Adjust token ratios and pool size to hit the target metrics.
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-purple-100 dark:border-slate-800">
                  <p className="text-sm text-gray-500">Challenge 02</p>
                  <h4 className="text-lg font-semibold">
                    Earn more fees than projected impermanent loss.
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Tweak volatility inputs until projected APR surpasses IL.
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

export default LiquidityPage;


import React, { useState, useEffect } from "react";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  ArrowLeft,
  RefreshCw,
  DollarSign,
  Percent,
  AlertCircle,
  TrendingDown,
  Calculator,
  PieChart,
} from "lucide-react";
import {
  formatCurrency,
  formatNumber,
  calculateImpermanentLoss,
} from "@/lib/utils";

const YieldFarmingPage = () => {
  const [gameState, setGameState] = useState({
    tokenA: { symbol: "ETH", amount: 1, price: 2000 },
    tokenB: { symbol: "USDC", amount: 2000, price: 1 },
    poolShare: 0,
    initialValue: 0,
    currentValue: 0,
    impermanentLoss: 0,
    rewards: 0,
    totalReturn: 0,
    apy: 12.5,
    timeElapsed: 0,
  });

  const [priceHistory, setPriceHistory] = useState([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const liquidityPairs = [
    { tokenA: "ETH", tokenB: "USDC", apy: 12.5 },
    { tokenA: "ETH", tokenB: "DAI", apy: 15.2 },
    { tokenA: "WBTC", tokenB: "ETH", apy: 18.7 },
    { tokenA: "USDC", tokenB: "DAI", apy: 8.3 },
  ];

  const initializeGame = (tokenA = "ETH", tokenB = "USDC", apy = 12.5) => {
    const newState = {
      tokenA: {
        symbol: tokenA,
        amount: tokenA === "ETH" ? 1 : tokenA === "WBTC" ? 0.05 : 1000,
        price: getTokenPrice(tokenA),
      },
      tokenB: {
        symbol: tokenB,
        amount: tokenB === "USDC" || tokenB === "DAI" ? 2000 : 1,
        price: getTokenPrice(tokenB),
      },
      poolShare: 0,
      initialValue: 0,
      currentValue: 0,
      impermanentLoss: 0,
      rewards: 0,
      totalReturn: 0,
      apy,
      timeElapsed: 0,
    };

    // Calculate initial values
    newState.initialValue =
      newState.tokenA.amount * newState.tokenA.price +
      newState.tokenB.amount * newState.tokenB.price;
    newState.currentValue = newState.initialValue;
    newState.poolShare = newState.initialValue;

    setGameState(newState);
    setPriceHistory([
      {
        time: 0,
        ethPrice: newState.tokenA.price,
        value: newState.initialValue,
        il: 0,
        rewards: 0,
      },
    ]);
  };

  const getTokenPrice = (symbol) => {
    const prices = {
      ETH: 2000,
      WBTC: 45000,
      USDC: 1,
      DAI: 1,
    };
    return prices[symbol] || 1;
  };

  const simulateMarket = () => {
    if (isSimulating) return;

    setIsSimulating(true);
    let time = 0;
    const interval = setInterval(() => {
      time += 1;

      // Simulate price changes (more volatile for crypto pairs)
      const volatility =
        gameState.tokenA.symbol === "ETH" && gameState.tokenB.symbol === "USDC"
          ? 0.05
          : 0.03;
      const priceChange = (Math.random() - 0.5) * volatility;

      setGameState((prevState) => {
        const newTokenAPrice = Math.max(
          prevState.tokenA.price * (1 + priceChange),
          100,
        );
        const priceRatio = newTokenAPrice / prevState.tokenA.price;

        // Calculate new pool composition using constant product formula
        const k = prevState.tokenA.amount * prevState.tokenB.amount;
        const newAmountA = Math.sqrt(k / priceRatio);
        const newAmountB = k / newAmountA;

        // Current value if just holding
        const holdValue =
          prevState.tokenA.amount * newTokenAPrice +
          prevState.tokenB.amount * prevState.tokenB.price;

        // Current value in pool
        const poolValue =
          newAmountA * newTokenAPrice + newAmountB * prevState.tokenB.price;

        // Impermanent Loss calculation
        const il = ((poolValue - holdValue) / holdValue) * 100;

        // Rewards calculation (APY prorated)
        const rewards =
          ((prevState.initialValue * prevState.apy) / 100) * (time / 365);

        // Total return
        const totalReturn = poolValue + rewards - prevState.initialValue;

        const newState = {
          ...prevState,
          tokenA: { ...prevState.tokenA, price: newTokenAPrice },
          currentValue: poolValue,
          impermanentLoss: il,
          rewards,
          totalReturn,
          timeElapsed: time,
        };

        // Update price history
        setPriceHistory((prev) => [
          ...prev.slice(-29),
          {
            time,
            ethPrice: newTokenAPrice,
            value: poolValue,
            il,
            rewards,
          },
        ]);

        return newState;
      });

      if (time >= 30) {
        // Stop after 30 seconds
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 500);
  };

  const resetSimulation = () => {
    initializeGame(
      gameState.tokenA.symbol,
      gameState.tokenB.symbol,
      gameState.apy,
    );
    setIsSimulating(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      {/* Header */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/games")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>

            <div className="flex items-center mb-6">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Yield Farming Simulator
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Learn about impermanent loss, LP rewards, and DeFi yield
                  farming
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Game Content */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Controls */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="w-5 h-5 mr-2" />
                    Liquidity Pool Setup
                  </CardTitle>
                  <CardDescription>
                    Configure your yield farming position
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Pair Selection */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Liquidity Pair
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {liquidityPairs.map((pair, index) => (
                        <Button
                          key={index}
                          variant={
                            gameState.tokenA.symbol === pair.tokenA
                              ? "default"
                              : "outline"
                          }
                          className="justify-between"
                          onClick={() =>
                            initializeGame(pair.tokenA, pair.tokenB, pair.apy)
                          }
                          disabled={isSimulating}
                        >
                          <span>
                            {pair.tokenA}/{pair.tokenB}
                          </span>
                          <span className="text-green-600">
                            {pair.apy}% APY
                          </span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Position Size */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Position Value
                    </label>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatCurrency(gameState.initialValue)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {formatNumber(gameState.tokenA.amount)}{" "}
                      {gameState.tokenA.symbol} +{" "}
                      {formatNumber(gameState.tokenB.amount)}{" "}
                      {gameState.tokenB.symbol}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="space-y-3">
                    <Button
                      variant="web3"
                      className="w-full"
                      onClick={simulateMarket}
                      disabled={isSimulating}
                    >
                      {isSimulating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Simulating...
                        </>
                      ) : (
                        "Start Market Simulation"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={resetSimulation}
                      disabled={isSimulating}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {/* Time Elapsed */}
                  {gameState.timeElapsed > 0 && (
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        Time Elapsed
                      </div>
                      <div className="text-lg font-semibold">
                        {gameState.timeElapsed} days
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Results Dashboard */}
            <div className="lg:col-span-2 space-y-6">
              {/* Metrics Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Current Value
                        </p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {formatCurrency(gameState.currentValue)}
                        </p>
                      </div>
                      <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Impermanent Loss
                        </p>
                        <p
                          className={`text-lg font-bold ${gameState.impermanentLoss < 0 ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
                        >
                          {formatNumber(gameState.impermanentLoss, 2)}%
                        </p>
                      </div>
                      <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          LP Rewards
                        </p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {formatCurrency(gameState.rewards)}
                        </p>
                      </div>
                      <Percent className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Net PnL
                        </p>
                        <p
                          className={`text-lg font-bold ${gameState.totalReturn >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                        >
                          {gameState.totalReturn >= 0 ? "+" : ""}
                          {formatCurrency(gameState.totalReturn)}
                        </p>
                      </div>
                      <TrendingUp
                        className={`w-6 h-6 ${gameState.totalReturn >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart */}
              {priceHistory.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PieChart className="w-5 h-5 mr-2" />
                      Performance Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={priceHistory}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="time"
                            label={{
                              value: "Time (days)",
                              position: "insideBottom",
                              offset: -5,
                            }}
                          />
                          <YAxis />
                          <Tooltip
                            formatter={(value, name) => [
                              name === "value"
                                ? formatCurrency(value)
                                : `${formatNumber(value, 2)}%`,
                              name === "value"
                                ? "Pool Value"
                                : name === "il"
                                  ? "Impermanent Loss"
                                  : "Rewards",
                            ]}
                          />
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            name="Pool Value"
                          />
                          <Line
                            type="monotone"
                            dataKey="il"
                            stroke="#EF4444"
                            strokeWidth={2}
                            name="Impermanent Loss %"
                          />
                          <Line
                            type="monotone"
                            dataKey="rewards"
                            stroke="#10B981"
                            strokeWidth={2}
                            name="Rewards"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Educational Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Learn: Understanding the Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">
                        Impermanent Loss
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        The temporary loss you experience when providing
                        liquidity compared to just holding the tokens. It occurs
                        when the price ratio of your pooled assets changes.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                        LP Rewards
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Rewards earned from providing liquidity, including
                        trading fees and additional token incentives. These
                        rewards often offset impermanent loss over time.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">
                        APY (Annual Percentage Yield)
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        The projected yearly return from your liquidity
                        provision, including compound interest. Higher APY often
                        comes with higher risk.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-orange-600 dark:text-orange-400">
                        Net PnL
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Your total profit or loss including both impermanent
                        loss and earned rewards. This shows your actual
                        performance versus holding.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Message Dock */}
      <DemoMessageDock />
    </div>
  );
};

export default YieldFarmingPage;

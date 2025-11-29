import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  Zap,
  ArrowLeft,
  Play,
  Pause,
  RefreshCw,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Target,
  CheckCircle,
  XCircle,
  Timer,
} from "lucide-react";
import { formatCurrency, formatNumber, simulateGasPrice } from "@/lib/utils";

const GasOptimizationPage = () => {
  const [gameState, setGameState] = useState({
    isRunning: false,
    currentGasPrice: 25,
    baseFee: 20,
    priorityFee: 5,
    totalCost: 0,
    timeElapsed: 0,
    score: 0,
    level: 1,
    targetGasPrice: 0,
    transactions: [],
    currentObjective: null,
  });

  const [gasHistory, setGasHistory] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [gameResults, setGameResults] = useState(null);
  const intervalRef = useRef(null);

  const objectives = [
    {
      id: 1,
      title: "Execute under 30 gwei",
      description:
        "Wait for gas to drop below 30 gwei and execute your transaction",
      targetGasPrice: 30,
      timeLimit: 30,
      reward: 100,
    },
    {
      id: 2,
      title: "Perfect timing - under 25 gwei",
      description:
        "Execute when gas is at 25 gwei or lower for maximum savings",
      targetGasPrice: 25,
      timeLimit: 45,
      reward: 200,
    },
    {
      id: 3,
      title: "Network congestion challenge",
      description:
        "Execute during low congestion (under 20 gwei) in volatile conditions",
      targetGasPrice: 20,
      timeLimit: 60,
      reward: 300,
    },
  ];

  const gasEstimates = [
    { name: "Simple Transfer", gasLimit: 21000 },
    { name: "Token Swap", gasLimit: 150000 },
    { name: "DeFi Interaction", gasLimit: 300000 },
    { name: "NFT Mint", gasLimit: 200000 },
  ];

  const [selectedTransaction, setSelectedTransaction] = useState(
    gasEstimates[0],
  );

  const startGame = () => {
    const objective = objectives[gameState.level - 1] || objectives[0];
    setGameState((prev) => ({
      ...prev,
      isRunning: true,
      timeElapsed: 0,
      score: 0,
      currentObjective: objective,
      transactions: [],
    }));
    setShowResult(false);
    setGasHistory([]);

    // Start the simulation
    intervalRef.current = setInterval(() => {
      updateGasPrice();
    }, 1500); // Update every 1.5 seconds
  };

  const stopGame = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setGameState((prev) => ({ ...prev, isRunning: false }));
  };

  const resetGame = () => {
    stopGame();
    setGameState({
      isRunning: false,
      currentGasPrice: 25,
      baseFee: 20,
      priorityFee: 5,
      totalCost: 0,
      timeElapsed: 0,
      score: 0,
      level: 1,
      targetGasPrice: 0,
      transactions: [],
      currentObjective: null,
    });
    setGasHistory([]);
    setShowResult(false);
    setGameResults(null);
  };

  const updateGasPrice = () => {
    setGameState((prev) => {
      const newTimeElapsed = prev.timeElapsed + 1.5;

      // Simulate network congestion with varying patterns
      const congestionFactor = Math.sin(newTimeElapsed / 10) * 0.5 + 0.5; // 0 to 1
      const volatility = 0.3 + congestionFactor * 0.4; // Higher volatility during congestion

      const baseGasChange = (Math.random() - 0.5) * volatility * prev.baseFee;
      const newBaseFee = Math.max(
        10,
        Math.min(100, prev.baseFee + baseGasChange),
      );

      const priorityFeeChange = (Math.random() - 0.5) * 0.2 * prev.priorityFee;
      const newPriorityFee = Math.max(
        1,
        Math.min(20, prev.priorityFee + priorityFeeChange),
      );

      const newGasPrice = newBaseFee + newPriorityFee;

      // Update gas history
      setGasHistory((prevHistory) => [
        ...prevHistory.slice(-19),
        {
          time: newTimeElapsed,
          gasPrice: newGasPrice,
          baseFee: newBaseFee,
          priorityFee: newPriorityFee,
          congestion: congestionFactor,
        },
      ]);

      // Check if time limit exceeded
      if (
        prev.currentObjective &&
        newTimeElapsed >= prev.currentObjective.timeLimit
      ) {
        // Time's up - show results
        setTimeout(() => {
          setGameResults({
            success: false,
            reason: "Time limit exceeded",
            finalGasPrice: newGasPrice,
            timeElapsed: newTimeElapsed,
            score: prev.score,
          });
          setShowResult(true);
          stopGame();
        }, 100);
      }

      return {
        ...prev,
        currentGasPrice: newGasPrice,
        baseFee: newBaseFee,
        priorityFee: newPriorityFee,
        timeElapsed: newTimeElapsed,
        totalCost: (selectedTransaction.gasLimit * newGasPrice) / 1e9, // Convert to ETH
      };
    });
  };

  const executeTransaction = () => {
    if (!gameState.isRunning || !gameState.currentObjective) return;

    const success =
      gameState.currentGasPrice <= gameState.currentObjective.targetGasPrice;
    const gasUsed = selectedTransaction.gasLimit;
    const totalCost = (gasUsed * gameState.currentGasPrice) / 1e9; // Convert to ETH

    const newTransaction = {
      id: Date.now(),
      type: selectedTransaction.name,
      gasPrice: gameState.currentGasPrice,
      gasUsed,
      cost: totalCost,
      success,
      timestamp: gameState.timeElapsed,
    };

    const newScore = success
      ? gameState.score +
        gameState.currentObjective.reward +
        Math.max(
          0,
          (gameState.currentObjective.targetGasPrice -
            gameState.currentGasPrice) *
            10,
        )
      : gameState.score - 50;

    setGameState((prev) => ({
      ...prev,
      transactions: [...prev.transactions, newTransaction],
      score: newScore,
    }));

    // Show results
    setGameResults({
      success,
      reason: success
        ? `Perfect! Executed at ${gameState.currentGasPrice.toFixed(1)} gwei`
        : `Too expensive! Gas was ${gameState.currentGasPrice.toFixed(1)} gwei, target was ${gameState.currentObjective.targetGasPrice} gwei`,
      finalGasPrice: gameState.currentGasPrice,
      timeElapsed: gameState.timeElapsed,
      score: newScore,
      savings: success
        ? ((gameState.currentObjective.targetGasPrice -
            gameState.currentGasPrice) /
            gameState.currentObjective.targetGasPrice) *
          100
        : 0,
    });
    setShowResult(true);
    stopGame();
  };

  const nextLevel = () => {
    const nextLevelNum = Math.min(gameState.level + 1, objectives.length);
    setGameState((prev) => ({
      ...prev,
      level: nextLevelNum,
    }));
    setShowResult(false);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const getGasPriceColor = (gasPrice, target) => {
    if (!target) return "text-blue-600 dark:text-blue-400";
    if (gasPrice <= target) return "text-green-600 dark:text-green-400";
    if (gasPrice <= target * 1.2) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getCongestionLevel = (gasPrice) => {
    if (gasPrice < 20) return { level: "Low", color: "text-green-600" };
    if (gasPrice < 35) return { level: "Medium", color: "text-yellow-600" };
    if (gasPrice < 50) return { level: "High", color: "text-red-600" };
    return { level: "Extreme", color: "text-red-800" };
  };

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
              <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mr-3" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Gas Fee Optimization Game
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Master the art of timing your transactions for optimal gas
                  fees
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
            {/* Game Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Current Objective */}
              {gameState.currentObjective && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Level {gameState.level} Challenge
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">
                      {gameState.currentObjective.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {gameState.currentObjective.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Target:</span>
                        <span className="font-semibold">
                          &lt; {gameState.currentObjective.targetGasPrice} gwei
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Time Limit:</span>
                        <span className="font-semibold">
                          {gameState.currentObjective.timeLimit}s
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Reward:</span>
                        <span className="font-semibold text-green-600">
                          +{gameState.currentObjective.reward} pts
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Transaction Type */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Transaction Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {gasEstimates.map((tx) => (
                      <Button
                        key={tx.name}
                        variant={
                          selectedTransaction.name === tx.name
                            ? "default"
                            : "outline"
                        }
                        className="w-full justify-between"
                        onClick={() => setSelectedTransaction(tx)}
                        disabled={gameState.isRunning}
                      >
                        <span>{tx.name}</span>
                        <span className="text-xs">
                          {tx.gasLimit.toLocaleString()} gas
                        </span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Current Gas Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Network Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">
                      <span
                        className={getGasPriceColor(
                          gameState.currentGasPrice,
                          gameState.currentObjective?.targetGasPrice,
                        )}
                      >
                        {formatNumber(gameState.currentGasPrice, 1)} gwei
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Base: {formatNumber(gameState.baseFee, 1)} + Priority:{" "}
                      {formatNumber(gameState.priorityFee, 1)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Congestion:</span>
                      <span
                        className={`font-semibold ${getCongestionLevel(gameState.currentGasPrice).color}`}
                      >
                        {getCongestionLevel(gameState.currentGasPrice).level}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Est. Cost:</span>
                      <span className="font-semibold">
                        ${(gameState.totalCost * 2000).toFixed(2)}{" "}
                        {/* Assuming $2000 ETH */}
                      </span>
                    </div>
                  </div>

                  {gameState.isRunning && gameState.currentObjective && (
                    <div className="mt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm">Time Remaining:</span>
                        <span className="font-semibold">
                          {Math.max(
                            0,
                            gameState.currentObjective.timeLimit -
                              gameState.timeElapsed,
                          ).toFixed(1)}
                          s
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.max(0, ((gameState.currentObjective.timeLimit - gameState.timeElapsed) / gameState.currentObjective.timeLimit) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Game Controls */}
              <Card>
                <CardContent className="p-4 space-y-3">
                  {!gameState.isRunning ? (
                    <Button
                      variant="web3"
                      className="w-full"
                      onClick={startGame}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Simulation
                    </Button>
                  ) : (
                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={executeTransaction}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Execute Transaction
                    </Button>
                  )}

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      onClick={stopGame}
                      disabled={!gameState.isRunning}
                    >
                      <Pause className="w-4 h-4 mr-1" />
                      Pause
                    </Button>
                    <Button variant="outline" onClick={resetGame}>
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Game Display */}
            <div className="lg:col-span-2 space-y-6">
              {/* Live Gas Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Live Gas Price Feed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    {gasHistory.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={gasHistory}>
                          <defs>
                            <linearGradient
                              id="gasGradient"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3B82F6"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3B82F6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="time"
                            type="number"
                            scale="linear"
                            domain={["dataMin", "dataMax"]}
                            tickFormatter={(value) => `${value.toFixed(0)}s`}
                          />
                          <YAxis
                            label={{
                              value: "Gas Price (gwei)",
                              angle: -90,
                              position: "insideLeft",
                            }}
                          />
                          <Tooltip
                            formatter={(value, name) => [
                              `${formatNumber(value, 1)} gwei`,
                              name === "gasPrice" ? "Gas Price" : "Base Fee",
                            ]}
                            labelFormatter={(value) =>
                              `Time: ${value.toFixed(1)}s`
                            }
                          />
                          <Area
                            type="monotone"
                            dataKey="gasPrice"
                            stroke="#3B82F6"
                            strokeWidth={2}
                            fill="url(#gasGradient)"
                            name="Gas Price"
                          />
                          {gameState.currentObjective && (
                            <Line
                              type="monotone"
                              dataKey={() =>
                                gameState.currentObjective.targetGasPrice
                              }
                              stroke="#10B981"
                              strokeDasharray="5 5"
                              strokeWidth={2}
                              name="Target"
                              dot={false}
                            />
                          )}
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                        Start simulation to see live gas prices
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Score and Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Score
                        </p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {gameState.score}
                        </p>
                      </div>
                      <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Level
                        </p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          {gameState.level}
                        </p>
                      </div>
                      <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Transactions
                        </p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {gameState.transactions.length}
                        </p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              {gameState.transactions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {gameState.transactions.slice(-5).map((tx) => (
                        <div
                          key={tx.id}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            {tx.success ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <div>
                              <span className="font-medium">{tx.type}</span>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {formatNumber(tx.gasPrice, 1)} gwei • $
                                {(tx.cost * 2000).toFixed(2)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`font-semibold ${tx.success ? "text-green-600" : "text-red-600"}`}
                            >
                              {tx.success ? "Success" : "Too Expensive"}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Modal */}
      <AnimatePresence>
        {showResult && gameResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowResult(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                {gameResults.success ? (
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                ) : (
                  <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                )}

                <h2 className="text-2xl font-bold mb-2">
                  {gameResults.success
                    ? "Excellent Timing!"
                    : "Better Luck Next Time!"}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {gameResults.reason}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Final Score:</span>
                    <span className="font-bold">{gameResults.score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Used:</span>
                    <span className="font-bold">
                      {gameResults.timeElapsed.toFixed(1)}s
                    </span>
                  </div>
                  {gameResults.success && (
                    <div className="flex justify-between">
                      <span>Gas Savings:</span>
                      <span className="font-bold text-green-600">
                        {formatNumber(gameResults.savings, 1)}%
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowResult(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  {gameResults.success &&
                  gameState.level < objectives.length ? (
                    <Button
                      variant="web3"
                      onClick={nextLevel}
                      className="flex-1"
                    >
                      Next Level
                    </Button>
                  ) : (
                    <Button
                      variant="web3"
                      onClick={resetGame}
                      className="flex-1"
                    >
                      Play Again
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Message Dock */}
      <DemoMessageDock />
    </div>
  );
};

export default GasOptimizationPage;

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
  ArrowUpDown,
  ArrowLeft,
  Settings,
  Info,
  AlertCircle,
  TrendingUp,
  DollarSign,
  RefreshCw,
  ChevronDown,
  Zap,
} from "lucide-react";
import { formatNumber, formatCurrency } from "@/lib/utils";

const SwapSimulatorPage = () => {
  const [swapState, setSwapState] = useState({
    fromToken: "ETH",
    toToken: "USDC",
    fromAmount: "",
    toAmount: "",
    slippageTolerance: 0.5,
    showSettings: false,
    priceImpact: 0,
    minimumReceived: 0,
    liquidityProviderFee: 0,
    route: [],
  });

  const tokens = {
    ETH: {
      name: "Ethereum",
      symbol: "ETH",
      price: 2000,
      decimals: 18,
      liquidity: 50000, // Liquidity in the pool
      logo: "🔹",
    },
    USDC: {
      name: "USD Coin",
      symbol: "USDC",
      price: 1,
      decimals: 6,
      liquidity: 100000000, // 100M USDC liquidity
      logo: "💵",
    },
    DAI: {
      name: "Dai Stablecoin",
      symbol: "DAI",
      price: 1,
      decimals: 18,
      liquidity: 80000000, // 80M DAI liquidity
      logo: "🟡",
    },
  };

  const calculateSwap = (fromAmount, fromToken, toToken) => {
    if (!fromAmount || fromAmount <= 0) {
      return {
        toAmount: 0,
        priceImpact: 0,
        minimumReceived: 0,
        fee: 0,
        route: [],
      };
    }

    const fromTokenData = tokens[fromToken];
    const toTokenData = tokens[toToken];

    // Get pool liquidity values (using constant product formula x * y = k)
    const fromLiquidity = fromTokenData.liquidity;
    const toLiquidity = toTokenData.liquidity;

    // Calculate output using AMM formula: dy = y * dx / (x + dx)
    const inputAmount = parseFloat(fromAmount);
    const outputBeforeFee =
      (toLiquidity * inputAmount) / (fromLiquidity + inputAmount);

    // Apply 0.3% fee (standard Uniswap fee)
    const fee = outputBeforeFee * 0.003;
    const outputAfterFee = outputBeforeFee - fee;

    // Calculate price impact
    const expectedOutput =
      inputAmount * (fromTokenData.price / toTokenData.price);
    const priceImpact =
      ((expectedOutput - outputAfterFee) / expectedOutput) * 100;

    // Calculate minimum received with slippage
    const minimumReceived =
      outputAfterFee * (1 - swapState.slippageTolerance / 100);

    // Determine route (direct swap for now, could be multi-hop)
    const route = [fromToken, toToken];

    return {
      toAmount: outputAfterFee,
      priceImpact: Math.max(0, priceImpact),
      minimumReceived,
      fee,
      route,
    };
  };

  const updateSwap = (field, value) => {
    setSwapState((prev) => {
      const newState = { ...prev, [field]: value };

      if (
        field === "fromAmount" ||
        field === "fromToken" ||
        field === "toToken"
      ) {
        const calculation = calculateSwap(
          field === "fromAmount" ? value : prev.fromAmount,
          field === "fromToken" ? value : prev.fromToken,
          field === "toToken" ? value : prev.toToken,
        );

        return {
          ...newState,
          toAmount: calculation.toAmount.toFixed(6),
          priceImpact: calculation.priceImpact,
          minimumReceived: calculation.minimumReceived,
          liquidityProviderFee: calculation.fee,
          route: calculation.route,
        };
      }

      return newState;
    });
  };

  const switchTokens = () => {
    const newFromToken = swapState.toToken;
    const newToToken = swapState.fromToken;

    updateSwap("fromToken", newFromToken);
    updateSwap("toToken", newToToken);
    updateSwap("fromAmount", "");
  };

  const executeSwap = () => {
    if (!swapState.fromAmount || parseFloat(swapState.fromAmount) <= 0) {
      return;
    }

    // Simulate transaction success
    alert(`Swap executed! 
${swapState.fromAmount} ${swapState.fromToken} → ${formatNumber(parseFloat(swapState.toAmount), 6)} ${swapState.toToken}
Price Impact: ${formatNumber(swapState.priceImpact, 2)}%
Fee: ${formatCurrency(swapState.liquidityProviderFee * tokens[swapState.toToken].price)}`);

    // Reset form
    updateSwap("fromAmount", "");
    updateSwap("toAmount", "");
  };

  const getPriceImpactColor = (impact) => {
    if (impact < 1) return "text-green-600 dark:text-green-400";
    if (impact < 3) return "text-yellow-600 dark:text-yellow-400";
    if (impact < 5) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getPriceImpactWarning = (impact) => {
    if (impact < 1) return null;
    if (impact < 3) return { level: "Low", message: "Small price impact" };
    if (impact < 5)
      return { level: "Medium", message: "Noticeable price impact" };
    return {
      level: "High",
      message: "High price impact - consider smaller amount",
    };
  };

  const warning = getPriceImpactWarning(swapState.priceImpact);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      {/* Header */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              variant="ghost"
              onClick={() => (window.location.href = "/defi")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to DeFi Hub
            </Button>

            <div className="flex items-center mb-6">
              <ArrowUpDown className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Token Swap Simulator
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Practice DEX trading with real-time calculations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Swap Interface */}
      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Swap Card */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <ArrowUpDown className="w-5 h-5 mr-2" />
                      Swap Tokens
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        updateSwap("showSettings", !swapState.showSettings)
                      }
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                  {swapState.showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-4 mt-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Slippage Tolerance: {swapState.slippageTolerance}%
                        </label>
                        <div className="flex gap-2 mb-4">
                          {[0.1, 0.5, 1.0].map((value) => (
                            <Button
                              key={value}
                              variant={
                                swapState.slippageTolerance === value
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                updateSwap("slippageTolerance", value)
                              }
                            >
                              {value}%
                            </Button>
                          ))}
                        </div>
                        <Input
                          type="number"
                          placeholder="Custom %"
                          value={swapState.slippageTolerance}
                          onChange={(e) =>
                            updateSwap(
                              "slippageTolerance",
                              parseFloat(e.target.value) || 0.5,
                            )
                          }
                          max="50"
                          min="0.01"
                          step="0.1"
                        />
                      </div>
                    </motion.div>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* From Token */}
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">
                      From
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={swapState.fromAmount}
                        onChange={(e) =>
                          updateSwap("fromAmount", e.target.value)
                        }
                        className="text-2xl h-16 pr-32"
                      />
                      <div className="absolute right-2 top-2 bottom-2">
                        <select
                          value={swapState.fromToken}
                          onChange={(e) =>
                            updateSwap("fromToken", e.target.value)
                          }
                          className="h-full px-3 bg-gray-100 dark:bg-gray-800 rounded-lg border-0 text-sm font-semibold"
                        >
                          {Object.entries(tokens).map(([symbol, token]) => (
                            <option key={symbol} value={symbol}>
                              {token.logo} {symbol}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      ≈{" "}
                      {formatCurrency(
                        parseFloat(swapState.fromAmount || 0) *
                          tokens[swapState.fromToken].price,
                      )}
                    </div>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={switchTokens}
                      className="rounded-full p-2 border-2"
                    >
                      <ArrowUpDown className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* To Token */}
                  <div className="relative">
                    <label className="block text-sm font-medium mb-2">To</label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.0"
                        value={swapState.toAmount}
                        readOnly
                        className="text-2xl h-16 pr-32 bg-gray-50 dark:bg-gray-800"
                      />
                      <div className="absolute right-2 top-2 bottom-2">
                        <select
                          value={swapState.toToken}
                          onChange={(e) =>
                            updateSwap("toToken", e.target.value)
                          }
                          className="h-full px-3 bg-gray-100 dark:bg-gray-800 rounded-lg border-0 text-sm font-semibold"
                        >
                          {Object.entries(tokens)
                            .filter(
                              ([symbol]) => symbol !== swapState.fromToken,
                            )
                            .map(([symbol, token]) => (
                              <option key={symbol} value={symbol}>
                                {token.logo} {symbol}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      ≈{" "}
                      {formatCurrency(
                        parseFloat(swapState.toAmount || 0) *
                          tokens[swapState.toToken].price,
                      )}
                    </div>
                  </div>

                  {/* Warning */}
                  {warning && (
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        <span className="text-sm font-medium text-orange-800 dark:text-orange-300">
                          {warning.level} Price Impact
                        </span>
                      </div>
                      <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                        {warning.message}
                      </p>
                    </div>
                  )}

                  {/* Swap Button */}
                  <Button
                    variant="web3"
                    className="w-full h-14 text-lg font-semibold"
                    onClick={executeSwap}
                    disabled={
                      !swapState.fromAmount ||
                      parseFloat(swapState.fromAmount) <= 0
                    }
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {swapState.fromAmount &&
                    parseFloat(swapState.fromAmount) > 0
                      ? `Swap ${swapState.fromToken} for ${swapState.toToken}`
                      : "Enter Amount"}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Details Panel */}
            <div className="space-y-6">
              {/* Swap Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Info className="w-5 h-5 mr-2" />
                    Swap Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Price Impact
                      </span>
                      <span
                        className={`font-semibold ${getPriceImpactColor(swapState.priceImpact)}`}
                      >
                        {formatNumber(swapState.priceImpact, 2)}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Minimum Received
                      </span>
                      <span className="font-semibold">
                        {formatNumber(swapState.minimumReceived, 6)}{" "}
                        {swapState.toToken}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Liquidity Provider Fee
                      </span>
                      <span className="font-semibold">
                        {formatCurrency(
                          swapState.liquidityProviderFee *
                            tokens[swapState.toToken].price,
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Route
                      </span>
                      <span className="font-semibold text-xs">
                        {swapState.route.length > 0
                          ? swapState.route.join(" → ")
                          : "No route selected"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Current Prices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Current Prices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(tokens).map(([symbol, token]) => (
                      <div
                        key={symbol}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{token.logo}</span>
                          <span className="font-medium">{symbol}</span>
                        </div>
                        <span className="font-semibold">
                          {formatCurrency(token.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Educational Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Learn More
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h4 className="font-semibold mb-1 text-blue-600 dark:text-blue-400">
                        Price Impact
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        The difference between the market price and the actual
                        price you'll pay due to trade size.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-green-600 dark:text-green-400">
                        Slippage Tolerance
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Maximum price movement you're willing to accept.
                        Protects against unfavorable price changes.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1 text-purple-600 dark:text-purple-400">
                        LP Fees
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        0.3% fee paid to liquidity providers to incentivize them
                        to provide trading liquidity.
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

export default SwapSimulatorPage;

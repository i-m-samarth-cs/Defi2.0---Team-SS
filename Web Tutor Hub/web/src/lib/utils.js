import { twMerge } from "tailwind-merge";
import clsx from "classnames";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumber(number, decimals = 2) {
  if (number === 0) return "0";
  if (!number) return "-";

  if (number < 0.01) {
    return `< 0.01`;
  }

  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(number);
}

export function formatCurrency(amount, symbol = "$") {
  if (!amount) return `${symbol}0`;

  if (amount < 1000) {
    return `${symbol}${formatNumber(amount)}`;
  }

  if (amount < 1000000) {
    return `${symbol}${formatNumber(amount / 1000, 1)}k`;
  }

  return `${symbol}${formatNumber(amount / 1000000, 1)}M`;
}

export function calculatePercentage(value, total) {
  if (!total || total === 0) return 0;
  return (value / total) * 100;
}

// Web3 simulation utilities
export function simulateGasPrice() {
  // Simulate gas price fluctuations (in Gwei)
  const baseGas = 20;
  const volatility = Math.random() * 50; // 0-50 Gwei volatility
  return Math.floor(baseGas + volatility);
}

export function calculateImpermanentLoss(priceRatio) {
  // IL = 2 * sqrt(ratio) / (1 + ratio) - 1
  const sqrtRatio = Math.sqrt(priceRatio);
  const il = (2 * sqrtRatio) / (1 + priceRatio) - 1;
  return Math.abs(il) * 100; // Return as percentage
}

export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

import React, { useState, useEffect } from "react";
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
  Shield,
  ArrowLeft,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Trophy,
  RefreshCw,
  Lightbulb,
  Target,
  Clock,
  BookOpen,
} from "lucide-react";

const WalletSafetyPage = () => {
  const [gameState, setGameState] = useState({
    currentQuestion: 0,
    score: 0,
    answers: [],
    isGameComplete: false,
    showExplanation: false,
    timeElapsed: 0,
    startTime: null,
  });

  const questions = [
    {
      id: 1,
      type: "mcq",
      question: "What is the most secure way to store your seed phrase?",
      options: [
        "Screenshot it and save to your phone",
        "Write it down on paper and store it securely offline",
        "Save it in a text file on your computer",
        "Share it with a trusted family member",
      ],
      correctAnswer: 1,
      explanation:
        "Writing your seed phrase on paper and storing it offline is the most secure method. Digital storage can be hacked, and sharing it with others creates additional risk points.",
      category: "Storage Security",
    },
    {
      id: 2,
      type: "scenario",
      question:
        'You receive an email claiming to be from your wallet provider asking you to "verify" your wallet by entering your seed phrase on a website. What should you do?',
      scenario:
        "The email looks legitimate with official logos and claims there's suspicious activity on your account.",
      options: [
        "Enter your seed phrase to verify your account",
        "Click the link but don't enter any information",
        "Ignore the email completely - legitimate services never ask for seed phrases",
        "Forward it to friends to warn them",
      ],
      correctAnswer: 2,
      explanation:
        "This is a classic phishing attack. Legitimate wallet providers will NEVER ask for your seed phrase via email or any other communication method. Always ignore such requests.",
      category: "Phishing Protection",
    },
    {
      id: 3,
      type: "mcq",
      question:
        "When connecting to a DeFi protocol, what should you always check first?",
      options: [
        "The color scheme of the website",
        "The URL to ensure it's the official website",
        "How many followers they have on Twitter",
        "The loading speed of the website",
      ],
      correctAnswer: 1,
      explanation:
        "Always verify the URL is correct before connecting your wallet. Scammers often create fake websites with similar URLs to steal your funds.",
      category: "DeFi Safety",
    },
    {
      id: 4,
      type: "scenario",
      question:
        "You're about to make a large DeFi transaction. What's the best practice before proceeding?",
      scenario:
        "You want to provide $10,000 worth of liquidity to a new farming protocol offering 300% APY.",
      options: [
        "Execute the transaction immediately to get the best returns",
        "First do a small test transaction to verify everything works correctly",
        "Ask for advice in the protocol's Discord server",
        "Wait for the APY to go even higher",
      ],
      correctAnswer: 1,
      explanation:
        "Always do a small test transaction first, especially with large amounts or new protocols. This helps you verify the contract works as expected and gives you time to double-check everything.",
      category: "Transaction Safety",
    },
    {
      id: 5,
      type: "mcq",
      question:
        'What does it mean when a wallet asks for "unlimited token approval"?',
      options: [
        "You can make unlimited transactions",
        "The contract can spend unlimited amounts of that token from your wallet",
        "You get unlimited gas for transactions",
        "You can approve unlimited contracts",
      ],
      correctAnswer: 1,
      explanation:
        "Unlimited token approval allows the smart contract to spend unlimited amounts of that specific token from your wallet. Only approve what you need for immediate use.",
      category: "Smart Contract Security",
    },
    {
      id: 6,
      type: "scenario",
      question:
        'You see a "trending" new token on social media promising 1000x returns. The website looks professional and has celebrity endorsements. What should you do?',
      scenario:
        "The token has already pumped 500% today and influencers are promoting it heavily.",
      options: [
        "Invest immediately to not miss out",
        "Research the project thoroughly first - check the team, code, and tokenomics",
        "Invest a small amount to test the waters",
        "Follow what the influencers are doing",
      ],
      correctAnswer: 1,
      explanation:
        "High-return promises and celebrity endorsements are often red flags for scams. Always do thorough research (DYOR) before investing in any project.",
      category: "Investment Security",
    },
    {
      id: 7,
      type: "mcq",
      question: "Which of these is NOT a good security practice for Web3?",
      options: [
        "Using a hardware wallet for large amounts",
        "Having multiple wallets for different purposes",
        "Using the same password for all crypto accounts",
        "Regularly updating your wallet software",
      ],
      correctAnswer: 2,
      explanation:
        "Using the same password across accounts is a major security risk. If one account is compromised, all accounts become vulnerable.",
      category: "Account Security",
    },
    {
      id: 8,
      type: "scenario",
      question:
        "Your wallet shows a transaction you didn't make, transferring all your tokens to an unknown address. What should you do immediately?",
      scenario:
        "You just noticed $5,000 worth of tokens were transferred from your wallet 10 minutes ago.",
      options: [
        "Post about it on social media asking for help",
        "Immediately transfer all remaining funds to a new, secure wallet",
        "Contact customer support to reverse the transaction",
        "Wait to see if more transactions happen",
      ],
      correctAnswer: 1,
      explanation:
        "If your wallet is compromised, immediately secure any remaining funds by moving them to a new wallet. Blockchain transactions cannot be reversed.",
      category: "Emergency Response",
    },
    {
      id: 9,
      type: "mcq",
      question: 'What is a "rug pull" in the context of DeFi?',
      options: [
        "When network congestion slows down transactions",
        "When developers abandon a project and steal investors' funds",
        "When smart contract gas fees become too high",
        "When a token's price drops significantly",
      ],
      correctAnswer: 1,
      explanation:
        "A rug pull occurs when project developers suddenly withdraw all funds from the liquidity pool, leaving investors with worthless tokens.",
      category: "DeFi Risks",
    },
    {
      id: 10,
      type: "scenario",
      question:
        "You want to try a new DeFi yield farming protocol. What's the safest approach?",
      scenario:
        'A new protocol launched yesterday promising 2000% APY with a "revolutionary" algorithm.',
      options: [
        "Invest your entire crypto portfolio for maximum returns",
        "Wait for the protocol to be audited and proven over time, then invest only what you can afford to lose",
        "Copy what other large investors are doing",
        "Invest half your portfolio to balance risk and reward",
      ],
      correctAnswer: 1,
      explanation:
        "New protocols are high-risk. Wait for security audits, let the protocol prove itself over time, and never invest more than you can afford to lose.",
      category: "Risk Management",
    },
  ];

  const startQuiz = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      isGameComplete: false,
      showExplanation: false,
      timeElapsed: 0,
      startTime: Date.now(),
    });
  };

  const selectAnswer = (answerIndex) => {
    const currentQ = questions[gameState.currentQuestion];
    const isCorrect = answerIndex === currentQ.correctAnswer;

    const newAnswers = [
      ...gameState.answers,
      {
        questionId: currentQ.id,
        selectedAnswer: answerIndex,
        correct: isCorrect,
        question: currentQ.question,
        explanation: currentQ.explanation,
      },
    ];

    setGameState((prev) => ({
      ...prev,
      answers: newAnswers,
      score: prev.score + (isCorrect ? 10 : 0),
      showExplanation: true,
    }));
  };

  const nextQuestion = () => {
    const nextQ = gameState.currentQuestion + 1;

    if (nextQ >= questions.length) {
      // Quiz complete
      setGameState((prev) => ({
        ...prev,
        isGameComplete: true,
        timeElapsed: (Date.now() - prev.startTime) / 1000,
        showExplanation: false,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        currentQuestion: nextQ,
        showExplanation: false,
      }));
    }
  };

  const resetQuiz = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      isGameComplete: false,
      showExplanation: false,
      timeElapsed: 0,
      startTime: null,
    });
  };

  const getScoreGrade = (score) => {
    if (score >= 90)
      return {
        grade: "A+",
        color: "text-green-600",
        message: "Outstanding! You're a Web3 security expert!",
      };
    if (score >= 80)
      return {
        grade: "A",
        color: "text-green-600",
        message: "Excellent! You have strong security knowledge.",
      };
    if (score >= 70)
      return {
        grade: "B",
        color: "text-blue-600",
        message: "Good work! You understand most security concepts.",
      };
    if (score >= 60)
      return {
        grade: "C",
        color: "text-yellow-600",
        message: "Decent. Some areas need improvement.",
      };
    return {
      grade: "F",
      color: "text-red-600",
      message: "Study more! Your funds are at risk with this knowledge level.",
    };
  };

  const currentQuestion = questions[gameState.currentQuestion];
  const progress = ((gameState.currentQuestion + 1) / questions.length) * 100;

  if (gameState.startTime === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Navigation />

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

              <Card className="text-center">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-center mb-6">
                    <Shield className="w-16 h-16 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-bold">
                    Wallet Safety Quiz
                  </CardTitle>
                  <CardDescription className="text-xl mt-4">
                    Test your Web3 security knowledge and learn how to protect
                    your digital assets
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                      <div className="font-semibold">10 Questions</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Mixed scenarios and multiple choice
                      </div>
                    </div>
                    <div className="text-center">
                      <Target className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                      <div className="font-semibold">Scoring System</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        10 points per correct answer
                      </div>
                    </div>
                    <div className="text-center">
                      <Lightbulb className="w-8 h-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-2" />
                      <div className="font-semibold">Learn & Practice</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Detailed explanations for each answer
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
                          Why Wallet Security Matters
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          In Web3, you are your own bank. Unlike traditional
                          finance, there's no customer service to call if you
                          lose your funds. One security mistake can result in
                          permanent loss of your digital assets.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    variant="web3"
                    onClick={startQuiz}
                    className="text-lg px-8 py-4"
                  >
                    Start Security Quiz
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <DemoMessageDock />
      </div>
    );
  }

  if (gameState.isGameComplete) {
    const scorePercentage = (gameState.score / 100) * 100;
    const grade = getScoreGrade(scorePercentage);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <Navigation />

        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <CardHeader>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <Trophy className="w-20 h-20 text-yellow-600 dark:text-yellow-400 mx-auto mb-6" />
                </motion.div>
                <CardTitle className="text-3xl font-bold mb-4">
                  Quiz Complete!
                </CardTitle>
                <CardDescription className="text-xl">
                  {grade.message}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${grade.color} mb-2`}>
                      {grade.grade}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Grade
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {gameState.score}/100
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Score
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                      {Math.round(gameState.timeElapsed)}s
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Time
                    </div>
                  </div>
                </div>

                <div className="text-left">
                  <h3 className="text-xl font-semibold mb-4">
                    Review Your Answers
                  </h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {gameState.answers.map((answer, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                      >
                        <div className="flex items-start space-x-3">
                          {answer.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium mb-2">
                              Q{index + 1}: {answer.question}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {answer.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/games")}
                  >
                    Back to Games
                  </Button>
                  <Button variant="web3" onClick={resetQuiz}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retake Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <DemoMessageDock />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <Navigation />

      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Question {gameState.currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Score: {gameState.score}/100
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-semibold">
                  {currentQuestion.category}
                </span>
              </div>
              <CardTitle className="text-2xl mb-4">
                {currentQuestion.question}
              </CardTitle>
              {currentQuestion.scenario && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                        Scenario:
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-300">
                        {currentQuestion.scenario}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent>
              {!gameState.showExplanation ? (
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start p-4 h-auto"
                      onClick={() => selectAnswer(index)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                      const isSelected =
                        index ===
                        gameState.answers[gameState.answers.length - 1]
                          .selectedAnswer;
                      const isCorrect = index === currentQuestion.correctAnswer;

                      let bgColor = "bg-gray-50 dark:bg-gray-800";
                      let borderColor = "border-gray-200 dark:border-gray-700";
                      let icon = null;

                      if (isCorrect) {
                        bgColor = "bg-green-50 dark:bg-green-900/20";
                        borderColor = "border-green-500";
                        icon = (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        );
                      } else if (isSelected && !isCorrect) {
                        bgColor = "bg-red-50 dark:bg-red-900/20";
                        borderColor = "border-red-500";
                        icon = <XCircle className="w-5 h-5 text-red-600" />;
                      }

                      return (
                        <div
                          key={index}
                          className={`p-4 rounded-lg border ${bgColor} ${borderColor}`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span className="flex-1">{option}</span>
                            {icon}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                          Explanation:
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300">
                          {currentQuestion.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="web3"
                    onClick={nextQuestion}
                    className="w-full"
                  >
                    {gameState.currentQuestion === questions.length - 1
                      ? "View Results"
                      : "Next Question"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <DemoMessageDock />
    </div>
  );
};

export default WalletSafetyPage;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView, StyleSheet, TextStyle } from 'react-native';
import { MotiView } from 'moti';
import { colors } from '@/constants/colors';

interface Props {
  onNavigate?: (tab: string) => void;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  emoji: string;
  color: string;
  bgColor: string;
  questions: QuizQuestion[];
}

const QUIZZES: Quiz[] = [
  {
    id: 'stocks-101',
    title: 'Stocks 101',
    emoji: '📈',
    color: '#3B82F6',
    bgColor: '#E6F0FF',
    questions: [
      {
        question: 'What is a stock?',
        options: [
          'A share of ownership in a company',
          'A savings account',
          'A type of bond',
          'A cryptocurrency',
        ],
        correctAnswer: 0,
        explanation: 'A stock represents a small piece of ownership in a company!',
      },
      {
        question: 'When you own a stock and the company does well, what happens?',
        options: [
          'The stock price usually goes down',
          'The stock price usually goes up',
          'Nothing changes',
          'You lose money',
        ],
        correctAnswer: 1,
        explanation: 'When companies perform well, investors want to own them, driving prices up!',
      },
      {
        question: 'What does "diversify" mean?',
        options: [
          'Buy only one stock',
          'Spread investments across different companies',
          'Never buy stocks',
          'Buy stocks only in one sector',
        ],
        correctAnswer: 1,
        explanation: 'Diversifying means spreading your investments to reduce risk!',
      },
      {
        question: 'Why do stock prices change?',
        options: [
          'Random chance only',
          'Supply and demand from buyers and sellers',
          'Government mandate',
          'Stocks never change',
        ],
        correctAnswer: 1,
        explanation: 'Stock prices reflect what people are willing to pay based on demand!',
      },
      {
        question: 'What is a good long-term investing strategy?',
        options: [
          'Buy and panic sell often',
          'Put all money in risky stocks',
          'Buy quality stocks and hold them',
          'Never buy stocks',
        ],
        correctAnswer: 2,
        explanation: 'Long-term investing with quality companies tends to build wealth!',
      },
    ],
  },
  {
    id: 'risk-management',
    title: 'Risk Management',
    emoji: '⚠️',
    color: '#FF6B6B',
    bgColor: '#FFE6E6',
    questions: [
      {
        question: 'What is risk in investing?',
        options: [
          'Always losing money',
          'The possibility that investments may lose value',
          'Buying expensive stocks',
          'Having too much money',
        ],
        correctAnswer: 1,
        explanation: 'Risk is the chance that your investment might not perform as expected.',
      },
      {
        question: 'Which is riskier?',
        options: [
          'A large, established company',
          'A small, new startup',
          'Both are equally risky',
          'Bonds are riskier',
        ],
        correctAnswer: 1,
        explanation: 'Startups are riskier because they\'re unproven, but offer higher rewards!',
      },
      {
        question: 'How can you reduce investment risk?',
        options: [
          'Put all money in one stock',
          'Never invest',
          'Diversify across different investments',
          'Only buy risky stocks',
        ],
        correctAnswer: 2,
        explanation: 'Diversification spreads risk across multiple investments!',
      },
      {
        question: 'What is a market storm in Wealthlings?',
        options: [
          'Always good news',
          'A period of high volatility and market uncertainty',
          'Something that never happens',
          'Free money for everyone',
        ],
        correctAnswer: 1,
        explanation: 'Market storms are volatile periods where prices swing dramatically!',
      },
      {
        question: 'What should you do during a market storm?',
        options: [
          'Panic and sell everything',
          'Stay calm and stick to your strategy',
          'Buy as much as possible',
          'Give up on investing',
        ],
        correctAnswer: 1,
        explanation: 'Cool heads prevail! Panic selling often locks in losses.',
      },
    ],
  },
  {
    id: 'budgeting',
    title: 'Smart Budgeting',
    emoji: '📊',
    color: '#10B981',
    bgColor: '#E6F9F0',
    questions: [
      {
        question: 'What is a budget?',
        options: [
          'A way to waste money',
          'A plan for how to spend and save your money',
          'Only for rich people',
          'Tracking expenses is impossible',
        ],
        correctAnswer: 1,
        explanation: 'A budget is your financial roadmap that helps you reach your goals!',
      },
      {
        question: 'How much should beginners save from their income?',
        options: [
          'As little as possible',
          'At least 10-20%',
          'Only save leftovers',
          'Never save',
        ],
        correctAnswer: 1,
        explanation: 'Most experts recommend saving at least 10% of your income!',
      },
      {
        question: 'What is an emergency fund?',
        options: [
          'Money for fun activities',
          'Money saved for unexpected expenses',
          'Money you never use',
          'Only for adults',
        ],
        correctAnswer: 1,
        explanation: 'An emergency fund protects you when unexpected costs arise!',
      },
      {
        question: 'Which is a good budgeting practice?',
        options: [
          'Spend first, save later',
          'Track your spending regularly',
          'Never check your balance',
          'Budget is pointless',
        ],
        correctAnswer: 1,
        explanation: 'Regular tracking helps you stay on budget and reach goals faster!',
      },
      {
        question: 'What does "pay yourself first" mean?',
        options: [
          'Get paid before others',
          'Set aside savings before spending',
          'Never spend money',
          'Only for employees',
        ],
        correctAnswer: 1,
        explanation: '"Pay yourself first" means prioritizing savings before other expenses!',
      },
    ],
  },
  {
    id: 'compound-interest',
    title: 'Compound Growth',
    emoji: '💰',
    color: '#FFD700',
    bgColor: '#FFF9E6',
    questions: [
      {
        question: 'What is compound interest?',
        options: [
          'Money that disappears',
          'Interest earned on your principal + previous interest',
          'A type of tax',
          'Only happens with bonds',
        ],
        correctAnswer: 1,
        explanation: 'Compound interest is "interest on interest" - your earnings grow exponentially!',
      },
      {
        question: 'Why is starting to invest early important?',
        options: [
          'You earn more money immediately',
          'Time allows compound growth to work its magic',
          'It\'s not important',
          'You can\'t wait anyway',
        ],
        correctAnswer: 1,
        explanation: 'The longer your money compounds, the more powerful the growth!',
      },
      {
        question: 'If you invest $100 at 10% annual return, after 1 year you have:',
        options: [
          '$100',
          '$105',
          '$110',
          '$120',
        ],
        correctAnswer: 2,
        explanation: '$100 + (10% of $100) = $100 + $10 = $110!',
      },
      {
        question: 'What is a major benefit of holding investments long-term?',
        options: [
          'You pay more fees',
          'Compound growth has more time to work',
          'Risk increases',
          'You earn nothing',
        ],
        correctAnswer: 1,
        explanation: 'Long-term investing lets compound growth turn small amounts into large wealth!',
      },
      {
        question: 'Which timeline benefits most from compound growth?',
        options: [
          '1 year',
          '5 years',
          '20+ years',
          'Compound growth doesn\'t matter',
        ],
        correctAnswer: 2,
        explanation: 'The longer the timeline, the more dramatic compound growth becomes!',
      },
    ],
  },
  {
    id: 'diversification',
    title: 'Portfolio Mix',
    emoji: '🌈',
    color: '#EC4899',
    bgColor: '#FFE6F5',
    questions: [
      {
        question: 'What does diversification do?',
        options: [
          'Guarantees you\'ll never lose money',
          'Spreads risk across different investments',
          'Makes you rich overnight',
          'Is unnecessary',
        ],
        correctAnswer: 1,
        explanation: 'Diversification spreads your eggs across baskets so one loss doesn\'t hurt!',
      },
      {
        question: 'Which portfolio is better diversified?',
        options: [
          '100% tech stocks',
          '100% one company',
          'Mix of tech, healthcare, energy, and consumer stocks',
          'All cash',
        ],
        correctAnswer: 2,
        explanation: 'A mix across different sectors and companies is much safer!',
      },
      {
        question: 'What is the Team Shield in Wealthlings?',
        options: [
          'An item you can buy',
          'Protection from spending too much',
          'A bonus when you have 3+ different archetypes',
          'Something that doesn\'t exist',
        ],
        correctAnswer: 2,
        explanation: 'The Team Shield rewards diversification by protecting you from volatility!',
      },
      {
        question: 'Should you invest in different sectors?',
        options: [
          'No, pick one sector',
          'Yes, different sectors perform differently',
          'It doesn\'t matter',
          'Sectors don\'t exist',
        ],
        correctAnswer: 1,
        explanation: 'Different sectors perform differently in various market conditions!',
      },
      {
        question: 'How many different investments should a beginner have?',
        options: [
          'Just 1',
          '5-10 or a diversified fund',
          '100+',
          'Doesn\'t matter',
        ],
        correctAnswer: 1,
        explanation: 'Start with 5-10 different investments or a diversified fund!',
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.slate950,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.white,
    letterSpacing: -0.5,
    marginBottom: 8,
  } as TextStyle,
  subtitle: {
    fontSize: 14,
    color: colors.slate400,
  } as TextStyle,
  quizButtonsContainer: {
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 40,
  },
  quizButton: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 16,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  quizButtonEmoji: {
    fontSize: 40,
  },
  quizButtonContent: {
    flex: 1,
  },
  quizButtonTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 4,
  } as TextStyle,
  quizButtonDescription: {
    fontSize: 12,
    fontWeight: '600',
  } as TextStyle,

  // Quiz Screen Styles
  quizContainer: {
    flex: 1,
    backgroundColor: colors.slate950,
  },
  quizHeader: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quizBackButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  quizBackText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,
  quizProgress: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.slate400,
  } as TextStyle,
  progressBar: {
    height: 4,
    backgroundColor: colors.slate800,
    marginHorizontal: 24,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.blue500,
  },
  questionContainer: {
    paddingHorizontal: 24,
    flex: 1,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.white,
    marginBottom: 24,
    lineHeight: 28,
  } as TextStyle,
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.slate700,
    backgroundColor: colors.slate800,
  },
  optionButtonSelected: {
    borderColor: colors.blue500,
    backgroundColor: colors.blue500 + '20',
  },
  optionButtonCorrect: {
    borderColor: colors.emerald400,
    backgroundColor: colors.emerald400 + '20',
  },
  optionButtonWrong: {
    borderColor: colors.rose500,
    backgroundColor: colors.rose500 + '20',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.slate300,
  } as TextStyle,
  optionTextSelected: {
    color: colors.white,
  } as TextStyle,
  submitButton: {
    marginHorizontal: 24,
    marginBottom: 24,
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.blue500,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: colors.slate700,
    opacity: 0.5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,

  // Results Screen Styles
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  scoreCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 4,
  },
  scoreText: {
    fontSize: 64,
    fontWeight: '900',
    color: colors.white,
  } as TextStyle,
  scoreLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.slate400,
    marginTop: 8,
  } as TextStyle,
  resultMessage: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  } as TextStyle,
  resultDescription: {
    fontSize: 14,
    color: colors.slate400,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 20,
  } as TextStyle,
  retakeButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: colors.blue500,
    borderRadius: 12,
    marginBottom: 16,
  },
  homeButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: colors.slate700,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.white,
    textAlign: 'center',
  } as TextStyle,
});

export const QuizScreen: React.FC<Props> = ({ onNavigate }) => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  const currentQuiz = QUIZZES.find((q) => q.id === activeQuiz);
  const questions = currentQuiz?.questions || [];

  const handleStartQuiz = (quizId: string) => {
    setActiveQuiz(quizId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
    setAnswers([]);
  };

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handleBackToQuizzes = () => {
    setActiveQuiz(null);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return '🌟 Perfect! Financial Genius!';
    if (percentage >= 80) return '🎉 Excellent Work!';
    if (percentage >= 60) return '👍 Good Job!';
    if (percentage >= 40) return '💪 Keep Learning!';
    return '📚 Keep Practicing!';
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return colors.emerald400;
    if (percentage >= 80) return colors.blue500;
    if (percentage >= 60) return '#F59E0B';
    if (percentage >= 40) return colors.yellow;
    return colors.rose500;
  };

  // Main Quiz Selection Screen
  if (!activeQuiz) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Financial Quizzes 📚</Text>
            <Text style={styles.subtitle}>Test your knowledge and earn coins!</Text>
          </View>

          <View style={styles.quizButtonsContainer}>
            {QUIZZES.map((quiz, index) => (
              <MotiView
                key={quiz.id}
                from={{ opacity: 0, translateX: 20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: index * 100 }}
              >
                <TouchableOpacity
                  onPress={() => handleStartQuiz(quiz.id)}
                  style={[
                    styles.quizButton,
                    {
                      backgroundColor: quiz.bgColor,
                      borderColor: quiz.color,
                    },
                  ]}
                >
                  <Text style={styles.quizButtonEmoji}>{quiz.emoji}</Text>
                  <View style={styles.quizButtonContent}>
                    <Text style={[styles.quizButtonTitle, { color: quiz.color }]}>{quiz.title}</Text>
                    <Text style={[styles.quizButtonDescription, { color: quiz.color }]}>
                      5 questions • Complete for rewards!
                    </Text>
                  </View>
                  <Text style={{ fontSize: 20 }}>→</Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Results Screen
  if (showResults) {
    const percentage = (score / questions.length) * 100;
    return (
      <SafeAreaView style={[styles.container, styles.resultsContainer]}>
        <MotiView
          from={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={[
            styles.scoreCircle,
            {
              borderColor: getScoreColor(),
              backgroundColor: getScoreColor() + '20',
            },
          ]}
        >
          <Text style={styles.scoreText}>{score}/5</Text>
          <Text style={[styles.scoreLabel, { color: getScoreColor() }]}>
            {percentage.toFixed(0)}%
          </Text>
        </MotiView>

        <Text style={styles.resultMessage}>{getScoreMessage()}</Text>
        <Text style={styles.resultDescription}>
          You answered {score} out of {questions.length} questions correctly. Keep learning to improve!
        </Text>

        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => handleStartQuiz(activeQuiz!)}
        >
          <Text style={styles.buttonText}>🔄 Retake Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => {
            handleBackToQuizzes();
            onNavigate?.('dashboard');
          }}
        >
          <Text style={styles.buttonText}>🏠 Back to Dashboard</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Quiz In Progress Screen
  if (currentQuiz && !showResults) {
    const question = questions[currentQuestion];
    const progress = (currentQuestion + 1) / questions.length;
    const isAnswered = selectedAnswer !== null;

    return (
      <SafeAreaView style={styles.quizContainer}>
        <View style={styles.quizHeader}>
          <TouchableOpacity style={styles.quizBackButton} onPress={handleBackToQuizzes}>
            <Text style={styles.quizBackText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.quizProgress}>
            {currentQuestion + 1}/{questions.length}
          </Text>
        </View>

        <View style={styles.progressBar}>
          <MotiView
            from={{ width: '0%' }}
            animate={{ width: `${progress * 100}%` }}
            style={styles.progressFill}
          />
        </View>

        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectAnswer(index)}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.optionButtonSelected,
                  selectedAnswer === index &&
                    index === question.correctAnswer &&
                    styles.optionButtonCorrect,
                  selectedAnswer === index &&
                    index !== question.correctAnswer &&
                    styles.optionButtonWrong,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswer === index && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, !isAnswered && styles.submitButtonDisabled]}
          onPress={handleNextQuestion}
          disabled={!isAnswered}
        >
          <Text style={styles.submitButtonText}>
            {currentQuestion === questions.length - 1 ? '📊 See Results' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return null;
};

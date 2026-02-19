'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, ArrowLeft, Heart, Sparkles, Activity, ShieldCheck } from 'lucide-react';

const steps = [
    {
        id: 'concern',
        title: "How can we help you?",
        questions: [
            { id: 'ivf', label: 'Starting IVF', icon: <Heart className="w-6 h-6" /> },
            { id: 'preservation', label: 'Egg Freezing', icon: <Sparkles className="w-6 h-6" /> },
            { id: 'diagnostics', label: 'Diagnostic Testing', icon: <Activity className="w-6 h-6" /> },
            { id: 'consult', label: 'General Consultation', icon: <ShieldCheck className="w-6 h-6" /> },
        ]
    },
    {
        id: 'goal',
        title: "What's your main goal?",
        questions: [
            { id: 'family', label: 'Starting a Family', icon: <Heart className="w-6 h-6" /> },
            { id: 'future', label: 'Preserving Options', icon: <Sparkles className="w-6 h-6" /> },
            { id: 'health', label: 'Understanding Health', icon: <Activity className="w-6 h-6" /> },
            { id: 'support', label: 'Compassionate Support', icon: <ShieldCheck className="w-6 h-6" /> },
        ]
    },
    {
        id: 'timeline',
        title: "When would you like to start?",
        questions: [
            { id: 'asap', label: 'As soon as possible', icon: <div className="text-sm font-bold italic">NOW</div> },
            { id: 'soon', label: 'Within 6 months', icon: <div className="text-sm font-bold">Soon</div> },
            { id: 'research', label: 'Just researching', icon: <div className="text-sm font-bold">Info</div> },
            { id: 'flexible', label: 'Flexible timeline', icon: <div className="text-sm font-bold">Later</div> },
        ]
    }
];

export default function AssessmentQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isFinished, setIsFinished] = useState(false);

    const [email, setEmail] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const isEmailValid = email.includes('@');

    const handleAnswer = (questionId: string) => {
        setAnswers({ ...answers, [steps[currentStep].id]: questionId });
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
        }
    };

    const progress = ((currentStep + 1) / steps.length) * 100;

    return (
        <section id="quiz" className="py-24 bg-berry relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-rose/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                {!isFinished ? (
                    <>
                        <Badge className="bg-rose/10 text-rose mb-6">30-Second Assessment</Badge>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-tight">
                            Start Your <span className="text-rose">Fertility Journey.</span>
                        </h2>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-3xl">
                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
                                <motion.div
                                    className="h-full bg-rose"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className="text-gray-400 text-sm uppercase tracking-widest mb-4 font-bold">Step {currentStep + 1} of {steps.length}</p>
                                    <h3 className="text-3xl font-bold text-white mb-10">{steps[currentStep].title}</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {steps[currentStep].questions.map((q) => (
                                            <button
                                                key={q.id}
                                                onClick={() => handleAnswer(q.id)}
                                                className="group flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-rose/50 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1"
                                            >
                                                <div className="w-14 h-14 rounded-full bg-berry flex items-center justify-center mb-4 text-rose group-hover:scale-110 transition-transform">
                                                    {q.icon}
                                                </div>
                                                <span className="text-white font-medium">{q.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            {currentStep > 0 && (
                                <button
                                    onClick={() => setCurrentStep(currentStep - 1)}
                                    className="mt-12 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm mx-auto"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>Oops, go back</span>
                                </button>
                            )}
                        </div>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl text-center"
                    >
                        {!isEmailSubmitted ? (
                            <>
                                <div className="w-20 h-20 bg-rose/10 rounded-full flex items-center justify-center mb-8 mx-auto">
                                    <Check className="w-10 h-10 text-rose font-bold" />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-berry mb-6">Assessment Complete!</h3>
                                <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
                                    Based on your answers, you&apos;re a great candidate for our <span className="text-berry font-bold">Boutique Fertility Program.</span> Give us your email to see your recommended next steps.
                                </p>

                                <div className="max-w-sm mx-auto flex flex-col gap-4">
                                    <div className="text-left">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            className={`w-full px-6 py-4 rounded-xl border focus:outline-none transition-colors text-lg ${!isEmailValid && email !== ''
                                                ? 'border-red-500 ring-red-100'
                                                : 'border-gray-200 focus:ring-2 focus:ring-rose/30'
                                                }`}
                                        />
                                        {!isEmailValid && email !== '' && (
                                            <p className="text-red-500 text-xs mt-1 ml-1">Please include an &apos;@&apos; in the email address.</p>
                                        )}
                                    </div>
                                    <Button
                                        size="lg"
                                        onClick={() => isEmailValid && setIsEmailSubmitted(true)}
                                        className={`text-lg py-7 rounded-xl transition-all duration-300 ${isEmailValid
                                            ? 'bg-berry hover:bg-berry-700 text-white shadow-xl shadow-berry/20 scale-[1.02]'
                                            : 'bg-berry/40 cursor-not-allowed text-white/80'
                                            }`}
                                    >
                                        See My Results
                                    </Button>
                                </div>
                                <p className="mt-8 text-sm text-gray-400 flex items-center justify-center gap-2">
                                    <ShieldCheck className="w-4 h-4" />
                                    Your data is secured and private.
                                </p>
                            </>
                        ) : (
                            <div className="py-10">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8 mx-auto">
                                    <Check className="w-10 h-10 text-green-500 font-bold" />
                                </div>
                                <h3 className="text-3xl font-bold text-berry mb-4">Results Sent!</h3>
                                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                                    Thank you! We&apos;ve sent your personalized fertility roadmap to <span className="font-bold text-berry">{email}</span>.
                                </p>
                                <Button
                                    onClick={() => {
                                        setIsFinished(false);
                                        setIsEmailSubmitted(false);
                                        setCurrentStep(0);
                                        setEmail('');
                                    }}
                                    variant="outline"
                                    className="border-berry text-berry hover:bg-berry hover:text-white"
                                >
                                    Take Quiz Again
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </section>
    );
}

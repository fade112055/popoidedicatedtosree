import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Gamepad2, Send, Check, Plus, Heart, Loader2, Star, Zap } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  gameTitle: z.string().min(1, "Game title is required"),
  platform: z.string().min(1, "Please select a platform"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const popularGames = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    platform: "PC",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=200&fit=crop&crop=center",
    description: "Open-world action-adventure game",
    popular: true
  },
  {
    id: 2,
    title: "Forza Horizon 5",
    platform: "PC",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop&crop=center",
    description: "Racing simulation game",
    popular: true
  },
  {
    id: 3,
    title: "Cyberpunk 2077",
    platform: "PC",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop&crop=center",
    description: "Action role-playing game",
    popular: true
  },
  {
    id: 4,
    title: "Red Dead Redemption 2",
    platform: "PC",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=300&h=200&fit=crop&crop=center",
    description: "Action-adventure game",
    popular: true
  },
  {
    id: 5,
    title: "Call of Duty: Modern Warfare",
    platform: "PC",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop&crop=center",
    description: "First-person shooter",
    popular: true
  },
  {
    id: 6,
    title: "Minecraft",
    platform: "PC",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop&crop=center",
    description: "Sandbox building game",
    popular: true
  }
];

const ConfettiPiece = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full"
    style={{
      left: `${Math.random() * 100}%`,
      backgroundColor: ["#7C3AED", "#3B82F6", "#F59E0B", "#10B981"][Math.floor(Math.random() * 4)],
    }}
    initial={{ y: -100, rotate: 0, opacity: 1 }}
    animate={{ y: window.innerHeight + 100, rotate: 720, opacity: 0 }}
    transition={{ duration: 2, delay, ease: "easeOut" }}
  />
);

export default function Home() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedGame, setSelectedGame] = useState<typeof popularGames[0] | null>(null);
  const [showGameGallery, setShowGameGallery] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gameTitle: "",
      platform: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    try {
      // Create FormData object for FormSubmit
      const formData = new FormData();
      formData.append("_subject", "New Game Request from Popoi");
      formData.append("_next", window.location.href + "#success");
      formData.append("_captcha", "false");
      formData.append("_template", "table");
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("game_title", data.gameTitle);
      formData.append("platform", data.platform);
      formData.append("description", data.description);

      // Submit to FormSubmit
      const response = await fetch("https://formsubmit.co/assoryamsu80@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setIsSubmitted(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Show error toast or handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewRequest = () => {
    setIsSubmitted(false);
    setSelectedGame(null);
    setShowGameGallery(false);
    form.reset();
  };

  const handleGameSelect = (game: typeof popularGames[0]) => {
    setSelectedGame(game);
    setShowGameGallery(false);
    form.setValue("gameTitle", game.title);
    form.setValue("platform", game.platform);
    form.setValue("description", `I would love to play ${game.title}! ${game.description}`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "hsl(var(--popoi-bg-dark))" }}>
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 rounded-full blur-3xl popoi-floating-orb"
          style={{ 
            background: "hsl(var(--popoi-primary))",
            opacity: 0.1,
            top: "25%",
            left: "25%"
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-3xl popoi-floating-orb"
          style={{ 
            background: "hsl(var(--popoi-secondary))",
            opacity: 0.1,
            bottom: "25%",
            right: "25%"
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full blur-3xl popoi-floating-orb"
          style={{ 
            background: "hsl(var(--popoi-accent))",
            opacity: 0.1,
            top: "75%",
            left: "50%"
          }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 50 }).map((_, i) => (
              <ConfettiPiece key={i} delay={i * 0.1} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="popoi-card-bg border-slate-700/50 p-8 shadow-2xl">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      className="flex items-center justify-center mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="popoi-gradient-bg p-3 rounded-xl">
                        <Gamepad2 className="h-8 w-8 text-white" />
                      </div>
                    </motion.div>
                    
                    <motion.h1
                      className="text-3xl font-bold mb-2"
                      style={{
                        background: `linear-gradient(135deg, hsl(var(--popoi-primary)), hsl(var(--popoi-secondary)), hsl(var(--popoi-accent)))`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text"
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Popoi
                    </motion.h1>
                    
                    <motion.p
                      className="text-slate-400 text-lg mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Request your favorite game
                    </motion.p>

                    {/* Popular Games Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        type="button"
                        onClick={() => setShowGameGallery(!showGameGallery)}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:opacity-90 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <Star className="mr-2 h-4 w-4" />
                        {showGameGallery ? 'Hide' : 'Browse'} Popular Games
                      </Button>
                    </motion.div>
                  </div>

                  {/* Popular Games Gallery */}
                  <AnimatePresence>
                    {showGameGallery && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mb-8"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          {popularGames.map((game, index) => (
                            <motion.div
                              key={game.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="cursor-pointer"
                              onClick={() => handleGameSelect(game)}
                            >
                              <Card className={`popoi-card-bg border-slate-700/50 hover:border-primary/50 p-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ${
                                selectedGame?.id === game.id ? 'ring-2 ring-primary' : ''
                              }`}>
                                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg mb-2 overflow-hidden">
                                  <img
                                    src={game.image}
                                    alt={game.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <h3 className="text-sm font-semibold text-slate-200 mb-1 truncate">{game.title}</h3>
                                <p className="text-xs text-slate-400 mb-1">{game.platform}</p>
                                <p className="text-xs text-slate-500 truncate">{game.description}</p>
                                {game.popular && (
                                  <div className="flex items-center mt-1">
                                    <Zap className="h-3 w-3 text-yellow-400 mr-1" />
                                    <span className="text-xs text-yellow-400">Popular</span>
                                  </div>
                                )}
                              </Card>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Selected Game Display */}
                  {selectedGame && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <Card className="popoi-card-bg border-primary/50 p-4 shadow-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-16 h-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden">
                            <img
                              src={selectedGame.image}
                              alt={selectedGame.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-200">{selectedGame.title}</h3>
                            <p className="text-sm text-slate-400">{selectedGame.platform}</p>
                            <p className="text-xs text-slate-500">{selectedGame.description}</p>
                          </div>
                          <Button
                            type="button"
                            onClick={() => setSelectedGame(null)}
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-slate-200"
                          >
                            ×
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {/* Form */}
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Your Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-slate-800/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter your name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Email Address</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                className="bg-slate-800/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="your.email@example.com"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="gameTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Game Title</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                className="bg-slate-800/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter the game title"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="platform"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Platform</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent">
                                  <SelectValue placeholder="Select a platform" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-slate-800 border-slate-600">
                                <SelectItem value="PC">PC</SelectItem>
                                <SelectItem value="PlayStation">PlayStation</SelectItem>
                                <SelectItem value="Xbox">Xbox</SelectItem>
                                <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
                                <SelectItem value="Mobile">Mobile</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-300">Why do you want this game?</FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                rows={4}
                                className="bg-slate-800/50 border-slate-600 text-slate-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                placeholder="Tell us why you want this game..."
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full popoi-gradient-bg hover:opacity-90 text-white font-semibold py-4 px-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Submit Request
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card className="popoi-card-bg border-slate-700/50 p-8 shadow-2xl">
                  <div className="text-center">
                    {/* Success Icon */}
                    <motion.div
                      className="flex items-center justify-center mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="bg-gradient-to-r from-green-500 to-emerald-400 p-4 rounded-full">
                        <Check className="h-8 w-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Success Message */}
                    <motion.h2
                      className="text-3xl font-bold text-green-400 mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Request Submitted!
                    </motion.h2>
                    
                    <motion.p
                      className="text-slate-300 text-lg mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Thank you for your game request. We'll review it and get back to you soon!
                    </motion.p>

                    {/* Special Thanks - Animated */}
                    <motion.div
                      className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl p-6 mb-8 border border-purple-400/30 shadow-lg shadow-purple-400/20"
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                    >
                      <motion.p 
                        className="text-yellow-400 font-semibold text-lg mb-3 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                      >
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          <Heart className="mr-2 h-5 w-5 text-red-400" />
                        </motion.div>
                        Special Thanks
                      </motion.p>
                      
                      <motion.p 
                        className="text-slate-300 italic text-center relative"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                      >
                        <motion.span
                          className="inline-block"
                          animate={{ 
                            background: [
                              "linear-gradient(45deg, #fbbf24, #f59e0b)",
                              "linear-gradient(45deg, #8b5cf6, #7c3aed)",
                              "linear-gradient(45deg, #3b82f6, #1d4ed8)",
                              "linear-gradient(45deg, #fbbf24, #f59e0b)"
                            ]
                          }}
                          transition={{ 
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          style={{
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text"
                          }}
                        >
                          Special thanks to Sreekanth vs Gimi for inspiring Popoi!
                        </motion.span>
                        
                        {/* Sparkle Effects */}
                        <motion.div
                          className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.5
                          }}
                        />
                        <motion.div
                          className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1
                          }}
                        />
                        <motion.div
                          className="absolute top-1/2 -left-3 w-1 h-1 bg-blue-400 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 1.5
                          }}
                        />
                      </motion.p>
                    </motion.div>

                    {/* New Request Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Button
                        onClick={handleNewRequest}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 text-white font-semibold py-3 px-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Submit Another Request
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

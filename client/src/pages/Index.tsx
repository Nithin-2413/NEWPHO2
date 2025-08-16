import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Heart, Mail, Star, Users, Clock, MapPin, Sparkles, Gift, MessageCircle, PenTool } from 'lucide-react';
import { Link } from 'wouter';
import ContactForm from '@/components/ContactForm';
import ServiceCard from '@/components/ServiceCard';
import CEOSection from '@/components/CEOSection';
import TypingAnimation from '@/components/TypingAnimation';
import FAQSection from '@/components/FAQSection';
import WhyWeExistSection from '@/components/WhyWeExistSection';
import StillNotSureSection from '@/components/StillNotSureSection';
const backgroundMusic = 'https://res.cloudinary.com/dwmybitme/video/upload/v1755353394/WhatsApp_Audio_2025-08-15_at_12.09.54_AM_fn8je9.m4a';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const targetVolume = 0.32; // 32% volume
  let isPlaying = false;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    setIsVisible(true);

    // Setup background music with auto-play
    const setupBackgroundMusic = () => {
      if (audioRef.current) {
        const audio = audioRef.current;
        audio.loop = true;
        audio.preload = 'auto';
        audio.volume = targetVolume;

        // Enhanced play music function for all devices including mobile
        const playMusic = async () => {
          if (isPlaying) return;

          // Strategy 1: Direct play attempt
          try {
            audio.currentTime = 0;
            await audio.play();
            isPlaying = true;
            console.log('Background music started successfully');
            return;
          } catch (error) {
            console.log('Direct play failed, trying muted approach');
          }

          // Strategy 2: Muted then unmute approach
          try {
            audio.muted = true;
            await audio.play();
            isPlaying = true;
            setTimeout(() => {
              audio.muted = false;
              audio.volume = targetVolume;
            }, 100);
            console.log('Muted approach successful');
            return;
          } catch (mutedError) {
            console.log('Muted approach failed, setting up interaction listeners');
          }

          // Strategy 3: Comprehensive interaction listeners for mobile
          const startMusicOnInteraction = async () => {
            try {
              audio.currentTime = 0;
              await audio.play();
              isPlaying = true;
              console.log('Music started on user interaction');
              // Remove all listeners after success
              ['click', 'touchstart', 'touchend', 'touchmove', 'scroll', 'mousemove', 'keydown', 'focus', 'blur', 'resize'].forEach(event => {
                document.removeEventListener(event, startMusicOnInteraction);
                window.removeEventListener(event, startMusicOnInteraction);
              });
            } catch (err) {
              console.log('Failed to start music even with interaction:', err);
            }
          };

          // Add comprehensive listeners including mobile-specific events
          ['click', 'touchstart', 'touchend', 'touchmove', 'scroll', 'mousemove', 'keydown'].forEach(event => {
            document.addEventListener(event, startMusicOnInteraction, { once: true, passive: true });
          });
          ['focus', 'blur', 'resize', 'orientationchange'].forEach(event => {
            window.addEventListener(event, startMusicOnInteraction, { once: true });
          });

          // Special mobile device detection and handling
          if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Additional mobile-specific attempts
            setTimeout(() => {
              if (!isPlaying) {
                console.log('Mobile device detected, trying delayed start');
                playMusic();
              }
            }, 1500);
            
            // Try on visibility change for mobile apps
            document.addEventListener('visibilitychange', () => {
              if (document.visibilityState === 'visible' && !isPlaying) {
                playMusic();
              }
            });
          }
        };


        // Handle page visibility change
        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible' && !isPlaying) {
            playMusic();
          } else if (document.visibilityState === 'hidden' && isPlaying) {
            audio.pause();
            isPlaying = false;
          }
        };

        // Start music immediately
        playMusic();

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
      }
    };

    setupBackgroundMusic();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Love Letters",
      description: "Express your deepest feelings with beautifully crafted love letters that speak directly to the heart.",
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&h=600&fit=crop",
      price: "₹899",
      note: "Add-ons available based on specific requirements"
    },
    {
      title: "Gratitude Messages", 
      description: "Say thank you in the most meaningful way with personalized gratitude letters that touch souls.",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop",
      price: "₹899",
      note: "Add-ons available based on specific requirements"
    },
    {
      title: "Apology Letters",
      description: "Mend hearts and relationships with sincere, heartfelt apology messages that heal wounds.",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop",
      price: "₹799",
      note: "Add-ons available based on specific requirements"
    },
    {
      title: "Special Occasions",
      description: "Make birthdays, anniversaries, and milestones unforgettable with custom emotional messages.",
      image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&h=600&fit=crop",
      price: "₹1099",
      note: "Add-ons available based on specific requirements"
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden premium-scroll relative">
      {/* Cosmic Premium Background */}
      <div className="cosmic-background"></div>

      {/* Animated Star Background */}
      <div className="star-background">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div className="night">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="shooting_star"></div>
          ))}
        </div>
      </div>

      {/* Background Music */}
      <audio ref={audioRef} preload="auto">
        <source src={backgroundMusic} type="audio/mp4" />
        <source src={backgroundMusic} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {/* Enhanced Floating Elements that scroll with page */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Heart elements */}
        <div className="absolute top-32 left-16 animate-float opacity-15">
          <Heart className="w-6 h-6 text-pink-300 fill-current" />
        </div>
        <div className="absolute top-96 right-20 animate-float delay-1000 opacity-20">
          <Heart className="w-4 h-4 text-rose-300 fill-current" />
        </div>
        <div className="absolute top-[800px] left-1/4 animate-float delay-2000 opacity-25">
          <Heart className="w-5 h-5 text-red-300 fill-current" />
        </div>

        {/* Star elements */}
        <div className="absolute top-48 right-32 animate-float delay-500 opacity-20">
          <Star className="w-5 h-5 text-yellow-300 fill-current" />
        </div>
        <div className="absolute top-[600px] left-20 animate-float delay-1500 opacity-15">
          <Star className="w-6 h-6 text-amber-300 fill-current" />
        </div>
        <div className="absolute top-[1200px] right-16 animate-float delay-2500 opacity-20">
          <Star className="w-4 h-4 text-orange-300 fill-current" />
        </div>

        {/* Gift elements */}
        <div className="absolute top-[400px] right-24 animate-float delay-700 opacity-15">
          <Gift className="w-5 h-5 text-purple-300" />
        </div>
        <div className="absolute top-[1000px] left-32 animate-float delay-1800 opacity-20">
          <Gift className="w-6 h-6 text-indigo-300" />
        </div>

        {/* Sparkles elements */}
        <div className="absolute top-64 left-1/3 animate-float delay-1200 opacity-15">
          <Sparkles className="w-5 h-5 text-pink-300" />
        </div>
        <div className="absolute top-[900px] right-1/4 animate-float delay-2200 opacity-20">
          <Sparkles className="w-4 h-4 text-violet-300" />
        </div>
        <div className="absolute top-[1400px] left-1/2 animate-float delay-3000 opacity-15">
          <Sparkles className="w-6 h-6 text-fuchsia-300" />
        </div>

        {/* Additional floating dots */}
        <div className="absolute top-80 right-1/3 animate-float delay-800 opacity-10">
          <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
        </div>
        <div className="absolute top-[700px] left-1/2 animate-float delay-1700 opacity-15">
          <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
        </div>
        <div className="absolute top-[1100px] right-1/3 animate-float delay-2300 opacity-12">
          <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrollY > 50 ? 'glass-premium border-b border-border/50 shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            The Written Hug
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#about" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">About</a>
            <a href="#services" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">Services</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">How It Works</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">Contact</a>
          </div>
          <Button onClick={scrollToContact} className="sparkle-button bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300">
            <div className="star-1">⭐</div>
            <div className="star-2">✨</div>
            <div className="star-3">❤️</div>
            <div className="star-4">🎁</div>
            <div className="star-5">⭐</div>
            <div className="star-6">✨</div>
            <div className="star-7">❤️</div>
            <div className="star-8">🎁</div>
            Get Started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-pink-50/20 to-purple-50/20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
             style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,182,193,0.08),transparent_50%)]" />

        {/* Elegant Floating Elements */}
        <div className="absolute top-20 left-10 animate-float opacity-40">
          <div className="w-6 h-6 text-pink-300/60">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute top-32 right-20 animate-float delay-1000 opacity-30">
          <div className="w-4 h-4 text-rose-300/50">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float delay-2000 opacity-25">
          <div className="w-8 h-8 text-pink-200/40">
            <Heart className="w-full h-full fill-current" />
          </div>
        </div>

        <div className={`text-center max-w-5xl mx-auto relative z-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <TypingAnimation 
              text="A hug without touch, but meaning so much"
              speed={80}
              className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent"
            />
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed times-new-roman-italic">
            Your feelings. My words. Their smile.
          </p>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed">
            We help you express what your heart holds but words can't quite say.
            <br />
            In every unspoken moment, there lives a feeling waiting for its voice—let us help you set it free.
          </p>

          <div className="flex justify-center">
            <Button onClick={scrollToContact} size="lg" className="sparkle-button bg-gradient-to-r from-primary to-purple-600 text-white px-8 py-4 text-lg group hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <div className="star-1">⭐</div>
              <div className="star-2">✨</div>
              <div className="star-3">❤️</div>
              <div className="star-4">🎁</div>
              <div className="star-5">⭐</div>
              <div className="star-6">✨</div>
              <div className="star-7">❤️</div>
              <div className="star-8">🎁</div>
              Start Your Message
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Premium Floating Background Elements */}
        <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-r from-pink-300/10 to-rose-300/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-r from-purple-300/10 to-pink-300/10 rounded-full blur-xl animate-pulse delay-1000" />
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-gradient-to-b from-background to-muted/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Share a smile,
              </span>
              <br />
              The Written Hug style
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether it's love, gratitude, apology, or something deeply personal, we take your raw feelings 
              and turn them into beautifully crafted messages — written with care, designed with emotion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-2 rounded-2xl">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-red-500 group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4 transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent">Heartfelt Connection</h3>
                <p className="text-muted-foreground">Every message is crafted to create genuine emotional connections that last forever.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-2 rounded-2xl">
              <CardContent className="p-8 text-center">
                <Mail className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-blue-500 group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4 transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent">Beautiful Presentation</h3>
                <p className="text-muted-foreground">Each letter is elegantly designed and presented to make the moment truly special.</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-700 border-0 bg-gradient-to-br from-background to-muted/30 hover:-translate-y-2 rounded-2xl">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-6 text-muted-foreground group-hover:text-green-500 group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-2xl font-semibold mb-4 transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent">Personal Touch</h3>
                <p className="text-muted-foreground">Every word is chosen carefully to reflect your unique voice and emotions.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CEO Section */}
      <CEOSection />

      {/* Why We Exist Section */}
      <WhyWeExistSection />

      {/* New Business Story Section */}
      <section className="py-32 px-6 bg-gradient-to-b from-pink-50/10 to-purple-50/10 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                We Didn't Mean to Start a Business…
              </span>
              <br />
              <span className="text-foreground text-4xl">But...</span>
            </h2>
          </div>

          <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
            <p className="text-xl font-medium text-primary times-new-roman-italic">
              It began with a late-night "HELP!" — a friend with so much to say, but no way to say it.
            </p>

            <p>
              They tried. They stumbled. They gave up. Then they called Onaamika.
            </p>

            <p>
              She listened. She felt. She wrote.
            </p>

            <p className="text-xl font-semibold text-foreground times-new-roman-italic">
              And when the message reached its heart, it didn't just get read — it connected, it healed, it made someone truly smile.
            </p>

            <p className="text-lg font-medium text-primary times-new-roman-italic">
              That night, we learned something simple but powerful:<br />
              We all feel deeply, but not all of us can put those feelings into words.<br />
              And sometimes, what's left unsaid is lost forever.
            </p>

            <div className="bg-gradient-to-r from-pink-50/50 to-purple-50/50 p-8 rounded-3xl border border-pink-200/30">
              <p className="text-xl font-semibold text-foreground mb-4">Because let's be honest —</p>
              <p className="times-new-roman-italic">We live in a world where people are constantly feeling deeply…</p>
              <p className="font-medium times-new-roman-italic">…but rarely saying it meaningfully.</p>
            </div>

            <p>
              Most of us are either too busy, too shy, or just not fluent in "emotional poetry."<br />
              And that's okay. That's where we come in.
            </p>

            <div className="text-center py-8">
              <p className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent times-new-roman-italic">
                We're the translators of the heart.
              </p>
            </div>

            <p>
              At The Written Hug, we turn raw, unspoken feelings into beautiful, soul-stirring letters.<br />
              Love, gratitude, apology, celebration — whatever's on your heart, we craft it into words that move people.
            </p>

            <p>
              And we don't just write — we create.<br />
              Each message is carefully written, lovingly designed, and delivered with a personal touch that feels like a handwritten hug.
            </p>

            <div className="bg-gradient-to-r from-yellow-50/50 to-orange-50/50 p-8 rounded-3xl border border-yellow-200/30">
              <p className="text-xl font-semibold text-foreground mb-2">Why?</p>
              <p className="times-new-roman-italic">Because in a world full of auto-replies and emoji shortcuts, authentic emotion stands out.</p>
            </div>

            <p className="text-xl text-center font-medium text-primary times-new-roman-italic">
              So if you're someone who feels a lot but freezes at the keyboard, don't worry — we've made it our art to say what you can't.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Feelings found in
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                flowing ink
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of personalized writing services, each crafted to perfection
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 px-6 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to transform your feelings into beautiful words
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { 
                step: "01", 
                title: "Share Your Story", 
                desc: "Tell us about your feelings, the person, and what you want to express",
                icon: MessageCircle,
                color: "from-pink-500 to-rose-500"
              },
              { 
                step: "02", 
                title: "We Craft Magic", 
                desc: "Our team transforms your emotions into beautifully written messages",
                icon: PenTool,
                color: "from-purple-500 to-indigo-500"
              },
              { 
                step: "03", 
                title: "Review & Refine", 
                desc: "We'll share the draft for your approval and make any adjustments",
                icon: Star,
                color: "from-yellow-500 to-orange-500"
              },
              { 
                step: "04", 
                title: "Delivered with Love", 
                desc: "Receive your personalized message, ready to touch hearts",
                icon: Gift,
                color: "from-green-500 to-emerald-500"
              }
            ].map((item, index) => (
              <div key={index} className="text-center group relative hover:scale-105 transition-all duration-500">
                {/* Connection line */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-muted-foreground/20 to-transparent transform translate-x-4 z-0"></div>
                )}

                <div className="relative z-10">
                  <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                    <span>{item.step}</span>
                  </div>

                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-8 h-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                  </div>

                  <h3 className="text-xl font-semibold mb-4 transition-all duration-700 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent">{item.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Art of Saying It Right - 3D Carousel Section */}
      <section className="py-40 px-6 bg-gradient-to-b from-muted/10 to-background relative overflow-hidden z-10">
        {/* Cosmic Premium Background */}
        <div className="cosmic-background"></div>
        
        {/* Animated Star Background */}
        <div className="star-background">
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div className="night">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="shooting_star"></div>
            ))}
          </div>
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                The Art of
              </span>
              <br />
              Saying It Right
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              These moments began with someone's feelings and ended with someone's smile.
            </p>
          </div>

          {/* 3D Carousel Container */}
          <div className="relative w-full h-[400px] flex items-center justify-center mb-16">
            <div className="carousel-3d-container group">
              <div className="carousel-3d" style={{"--quantity": 9} as React.CSSProperties}>
                {[
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356947/Special_Occasion_designed_wooden_boxes_5_as4sup.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356958/Special_Occasion_designed_wooden_boxes_yumtwe.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356951/Untitled_design_5_ar557f.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356969/Untitled_design_3_iji6n1.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356965/Untitled_design_4_hwtmhw.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356950/Special_Occasion_designed_wooden_boxes_4_ak7pmn.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356946/Special_Occasion_designed_wooden_boxes_3_e8e2zj.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356945/Special_Occasion_designed_wooden_boxes_1_r5x26x.png",
                  "https://res.cloudinary.com/dwmybitme/image/upload/v1755356949/Special_Occasion_designed_wooden_boxes_2_ai7htr.png"
                ].map((image, index) => (
                  <div 
                    key={index} 
                    className="carousel-item" 
                    style={{
                      "--position": index + 1,
                      transform: `rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(300px)`
                    } as React.CSSProperties}
                  >
                    <img src={image} alt={`Gallery ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Info Section */}
      <section className="py-32 px-6 bg-gradient-to-r from-pink-50/30 to-purple-50/30 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-12">
            <p className="text-2xl font-medium text-primary times-new-roman-italic mb-6">
              Your feelings, perfectly packaged, arrive exactly where they're meant to live—in the heart.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center group">
              <MapPin className="h-12 w-12 text-muted-foreground group-hover:text-green-500 group-hover:scale-110 transition-all duration-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">All Over India</h3>
              <p className="text-muted-foreground">We deliver to every corner of the country</p>
            </div>
            <div className="flex flex-col items-center group">
              <Clock className="h-12 w-12 text-muted-foreground group-hover:text-blue-600 group-hover:scale-110 transition-all duration-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">10-15 Days</h3>
              <p className="text-muted-foreground">Standard free delivery timeline</p>
            </div>
            <div className="flex flex-col items-center group">
              <Heart className="h-12 w-12 text-muted-foreground group-hover:text-red-500 group-hover:scale-110 transition-all duration-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Made with Love</h3>
              <p className="text-muted-foreground">Every message crafted with care</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Still Not Sure Section */}
      <StillNotSureSection />

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden z-10">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Share Your Heart
              <br />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                With Us
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Ready to express what your heart holds? Share your story with us.
            </p>
            <p className="text-lg text-muted-foreground">
              Questions? Reach us at{" "}
              <a href="mailto:thewrittenhug@gmail.com" className="text-primary hover:underline transition-all duration-300">
                thewrittenhug@gmail.com
              </a>
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-muted/10 border-t border-border/50 relative overflow-hidden z-10">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-6 canduful-font">
            The Written Hug
          </div>
          <p className="text-muted-foreground mb-8">
            A hug without touch, but meaning so much
          </p>
          <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
            <span>Made with ❤️ in India</span>
            <span>•</span>
            <a href="mailto:thewrittenhug@gmail.com" className="hover:text-primary transition-colors duration-300">
              Contact Us
            </a>
            <span>•</span>
            <Link href="/admin/login">
              <button className="hover:text-primary transition-colors duration-300 underline text-xs">
                Admin Portal
              </button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
import React, { useState, useEffect } from "react";
import {
  Trophy,
  Users,
  Calendar,
  Target,
  ChevronDown,
  Menu,
  X,
  Award,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Globe,
  Clock,
  Sparkles,
  MousePointer2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function KamerCueLeague() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeTab, setActiveTab] = useState("vision");
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 45,
    hours: 12,
    minutes: 30,
    seconds: 0,
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [cursorVariant, setCursorVariant] = useState("default");

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Suivi de la souris pour effet parallaxe
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Intersection Observer pour animations au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: entry.isIntersecting,
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const sections = document.querySelectorAll("[data-animate]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Rotation des témoignages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Compte à rebours
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const testimonials = [
    {
      name: "Emmanuel Ndongo",
      role: "Champion National 2023",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
      text: "Kings of the table a complètement transformé ma carrière. Une organisation impeccable et une plateforme qui valorise vraiment les talents.",
    },
    {
      name: "Marie Fotso",
      role: "Joueuse Professionnelle",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
      text: "Enfin une compétition qui combine transparence, professionnalisme et respect des standards internationaux. Un vrai tournant pour le billard camerounais.",
    },
    {
      name: "David Kameni",
      role: "Coach & Consultant",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
      text: "La dimension digitale de la Kings of the table est révolutionnaire. Mes joueurs peuvent suivre leurs performances en temps réel et progresser continuellement.",
    },
  ];

  const placesRestantes = 23;

  const handleRegister = () => {
    navigate("/registration");
  };

  return (
    <div className="bg-[#F5F5F2] text-[#1E1E1E]">
      {/* Navigation Élégante */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/98 backdrop-blur-xl shadow-lg"
            : "bg-gradient-to-b from-[#0B1C2D]/90 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#C9A24D]" />
              </div>
              <div>
                <span
                  className={`block text-xl font-bold ${
                    scrolled ? "text-[#0F3D2E]" : "text-white"
                  }`}
                >
                  Kings of the table
                </span>
                <span
                  className={`block text-xs font-medium ${
                    scrolled ? "text-[#C9A24D]" : "text-[#C9A24D]"
                  }`}
                >
                  Tournoi National 2025
                </span>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              {[
                { label: "Accueil", id: "home" },
                { label: "Vision", id: "vision" },
                { label: "Compétition", id: "competition" },
                { label: "Témoignages", id: "testimonials" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors ${
                    scrolled
                      ? "text-[#1E1E1E] hover:text-[#0F3D2E]"
                      : "text-white/90 hover:text-[#C9A24D]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("register")}
                className="bg-gradient-to-r from-[#C9A24D] to-[#B8934A] text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
              >
                S'inscrire
              </button>
            </div>

            <button
              className={`lg:hidden ${
                scrolled ? "text-[#0F3D2E]" : "text-white"
              }`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3 border-t border-gray-200 pt-4">
              {["Accueil", "Vision", "Compétition", "Témoignages"].map(
                (item, idx) => (
                  <button
                    key={item}
                    onClick={() =>
                      scrollToSection(
                        ["home", "vision", "competition", "testimonials"][idx]
                      )
                    }
                    className="block w-full text-left text-[#1E1E1E] hover:text-[#0F3D2E] transition-colors font-medium py-2"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section Raffiné */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1574340085851-db19e3b16d51?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Championship Billiard"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B1C2D]/95 via-[#0F3D2E]/90 to-[#0B1C2D]/95"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-20">
          <div className="inline-block px-4 py-2 bg-[#C9A24D]/10 border border-[#C9A24D]/30 rounded-full mb-8">
            <span className="text-[#C9A24D] font-semibold text-sm">
              🇨🇲 Édition Cameroun 2025
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            La référence du billard
            <br />
            professionnel au Cameroun
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Excellence • Innovation • Transparence
          </p>

          {/* Compteurs Élégants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            {/* Cagnotte */}
            <div className="bg-gradient-to-br from-[#C9A24D]/20 to-[#C9A24D]/5 border-2 border-[#C9A24D] rounded-xl p-6 backdrop-blur-sm">
              <Trophy className="w-8 h-8 text-[#C9A24D] mx-auto mb-3" />
              <div className="text-4xl font-bold text-[#C9A24D] mb-1">
                450 000
              </div>
              <div className="text-sm text-gray-300 font-medium">
                FCFA À GAGNER
              </div>
            </div>

            {/* Places restantes */}
            <div className="bg-gradient-to-br from-red-500/20 to-red-500/5 border-2 border-red-400 rounded-xl p-6 backdrop-blur-sm">
              <Users className="w-8 h-8 text-red-400 mx-auto mb-3" />
              <div className="text-4xl font-bold text-red-400 mb-1">
                {placesRestantes}
              </div>
              <div className="text-sm text-gray-300 font-medium">
                PLACES RESTANTES
              </div>
            </div>

            {/* Compte à rebours */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/30 rounded-xl p-6 backdrop-blur-sm">
              <Clock className="w-8 h-8 text-white mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m
              </div>
              <div className="text-sm text-gray-300 font-medium">
                AVANT LE DÉBUT
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => scrollToSection("register")}
              className="px-10 py-4 bg-gradient-to-r from-[#C9A24D] to-[#B8934A] text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all flex items-center space-x-2"
            >
              <span>Réserver ma place</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollToSection("vision")}
              className="px-10 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
            >
              En savoir plus
            </button>
          </div>

          {/* Stats minimalistes */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { number: "100", label: "Joueurs" },
              { number: "3", label: "Jours" },
              { number: "5", label: "Tables pro" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-[#C9A24D] mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-[#C9A24D]" />
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#0F3D2E]/10 text-[#0F3D2E] rounded-full font-semibold text-sm mb-6">
              Notre mission
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0F3D2E]">
              Redéfinir l'excellence
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une vision qui allie tradition sportive et innovation
              technologique
            </p>
          </div>

          <div className="flex justify-center gap-3 mb-12">
            {[
              {
                id: "vision",
                label: "Vision",
                icon: <Globe className="w-5 h-5" />,
              },
              {
                id: "innovation",
                label: "Innovation",
                icon: <Zap className="w-5 h-5" />,
              },
              {
                id: "excellence",
                label: "Excellence",
                icon: <Award className="w-5 h-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-[#0F3D2E] text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={
                  activeTab === "vision"
                    ? "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=90"
                    : activeTab === "innovation"
                    ? "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=90"
                    : "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=90"
                }
                alt="Tab content"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              {activeTab === "vision" && (
                <>
                  <h3 className="text-3xl font-bold text-[#0F3D2E]">
                    Une vision transformative
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    La Kings of the table ne se contente pas d'organiser des
                    matchs. Nous construisons un écosystème complet qui valorise
                    le talent, célèbre la performance et structure durablement
                    le billard camerounais.
                  </p>
                  {[
                    "Structuration professionnelle du secteur",
                    "Développement des talents locaux",
                    "Standards internationaux adoptés",
                    "Communauté engagée et transparente",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-[#0F3D2E] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </>
              )}

              {activeTab === "innovation" && (
                <>
                  <h3 className="text-3xl font-bold text-[#0F3D2E]">
                    Innovation technologique
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous avons développé une plateforme digitale complète qui
                    révolutionne la gestion des tournois et offre une
                    transparence totale aux joueurs et spectateurs.
                  </p>
                  {[
                    "Inscriptions et paiements 100% en ligne",
                    "Suivi en temps réel des matchs",
                    "Statistiques détaillées des performances",
                    "Livestream professionnel des finales",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Zap className="w-6 h-6 text-[#C9A24D] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </>
              )}

              {activeTab === "excellence" && (
                <>
                  <h3 className="text-3xl font-bold text-[#0F3D2E]">
                    Standards d'excellence
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Nous appliquons les standards les plus élevés pour garantir
                    une compétition équitable, professionnelle et respectueuse
                    des règles internationales.
                  </p>
                  {[
                    "Tables homologuées aux normes EPBF",
                    "Arbitrage certifié et impartial",
                    "Règlement strict du billard à 15 boules",
                    "Environnement de compétition optimal",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <Award className="w-6 h-6 text-[#C9A24D] flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Competition Features */}
      <section id="competition" className="py-20 px-6 lg:px-8 bg-[#F5F5F2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#0B1C2D]/10 text-[#0B1C2D] rounded-full font-semibold text-sm mb-6">
              Format de compétition
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0F3D2E]">
              Une expérience professionnelle
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chaque détail pensé pour l'excellence compétitive
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-8 h-8" />,
                title: "Format professionnel",
                description:
                  "Règles officielles du billard à 15 boules respectées",
                image:
                  "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=600&q=80",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Plateforme digitale",
                description: "Gestion en temps réel des matchs et résultats",
                image:
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "100 participants",
                description:
                  "Sélection rigoureuse pour une compétition d'élite",
                image:
                  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: "3 jours intenses",
                description: "Planning optimisé avec matchs consécutifs",
                image:
                  "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&q=80",
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Transparence totale",
                description: "Chaque action enregistrée et vérifiable",
                image:
                  "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Tables homologuées",
                description: "5 tables professionnelles aux normes",
                image:
                  "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=600&q=80",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C2D]/80 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-[#C9A24D]">
                    {feature.icon}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-[#0F3D2E]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#C9A24D]/10 text-[#C9A24D] rounded-full font-semibold text-sm mb-6">
              Récompenses
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0F3D2E]">
              450 000 FCFA à remporter
            </h2>
            <p className="text-lg text-gray-600">
              Des prix qui récompensent l'excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                rank: "Champion",
                emoji: "🥇",
                amount: "300 000",
                bg: "from-[#C9A24D]/10 to-[#C9A24D]/5",
                border: "border-[#C9A24D]",
              },
              {
                rank: "Vice-Champion",
                emoji: "🥈",
                amount: "150 000",
                bg: "from-gray-100 to-gray-50",
                border: "border-gray-300",
              },
            ].map((prize, idx) => (
              <div
                key={idx}
                className={`relative bg-gradient-to-br ${prize.bg} border-2 ${prize.border} rounded-xl p-8 hover:shadow-lg transition-all`}
              >
                <div className="text-5xl mb-4">{prize.emoji}</div>
                <div className="text-sm font-bold text-gray-500 uppercase mb-2">
                  {prize.rank}
                </div>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-[#0F3D2E]">
                    {prize.amount}
                  </span>
                  <span className="text-xl font-semibold text-gray-600 ml-2">
                    FCFA
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#0F3D2E]/5 border border-[#0F3D2E]/20 rounded-xl p-8">
            <div className="flex items-start space-x-4">
              <Award className="w-8 h-8 text-[#C9A24D] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#0F3D2E]">
                  Distinctions supplémentaires
                </h3>
                <p className="text-gray-600">
                  Prix spéciaux attribués pendant la compétition : Fair-play,
                  Meilleure performance, Esprit sportif, et autres récompenses
                  surprises.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6 lg:px-8 bg-[#F5F5F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#0B1C2D]/10 text-[#0B1C2D] rounded-full font-semibold text-sm mb-6">
              Témoignages
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#0F3D2E]">
              Ce qu'ils disent de nous
            </h2>
          </div>

          <div className="relative">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 ${
                  idx === currentTestimonial
                    ? "opacity-100"
                    : "opacity-0 absolute inset-0"
                }`}
              >
                <div className="bg-white rounded-xl p-10 shadow-lg">
                  <div className="flex flex-col lg:flex-row items-center gap-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#C9A24D]"
                    />
                    <div className="flex-1 text-center lg:text-left">
                      <p className="text-lg text-gray-700 mb-4 italic">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <div className="text-lg font-bold text-[#0F3D2E]">
                          {testimonial.name}
                        </div>
                        <div className="text-[#C9A24D] font-medium text-sm">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentTestimonial
                      ? "bg-[#C9A24D] w-6"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="register"
        className="py-20 px-6 lg:px-8 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1553481187-be93c21490a9?w=1920&q=90"
            alt="CTA"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#C9A24D]/20 rounded-full mb-8">
            <Trophy className="w-8 h-8 text-[#C9A24D]" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Prêt à faire partie de l'histoire ?
          </h2>

          <p className="text-xl text-gray-300 mb-4">
            Les inscriptions sont ouvertes
          </p>

          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3 mb-12">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-white font-semibold text-sm">
              Seulement {placesRestantes} places restantes
            </span>
          </div>

          <button
            onClick={() => handleRegister()}
            className="px-12 py-5 bg-gradient-to-r from-[#C9A24D] to-[#B8934A] text-white rounded-lg font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center space-x-3 mx-auto mb-8"
          >
            <span>Réserver ma place maintenant</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          <div className="flex flex-wrap justify-center gap-6 text-gray-300 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#C9A24D]" />
              <span>Inscription en ligne</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#C9A24D]" />
              <span>Confirmation immédiate</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-[#C9A24D]" />
              <span>Support dédié</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 lg:px-8 bg-[#1E1E1E]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-11 h-11 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] rounded-lg flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-[#C9A24D]" />
                </div>
                <div>
                  <span className="block text-lg font-bold text-white">
                    Kings of the table
                  </span>
                  <span className="block text-xs text-[#C9A24D] font-medium">
                    Tournoi National
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                La référence du billard professionnel au Cameroun. Excellence,
                innovation et transparence.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-3">
                {["Accueil", "Vision", "Compétition", "Témoignages"].map(
                  (item, idx) => (
                    <li key={item}>
                      <button
                        onClick={() =>
                          scrollToSection(
                            ["home", "vision", "competition", "testimonials"][
                              idx
                            ]
                          )
                        }
                        className="text-gray-400 hover:text-[#C9A24D] transition-colors text-sm"
                      >
                        {item}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>Douala, Cameroun</li>
                <li>info@kingsofthetable.cm</li>
                <li>+237 696 995 879</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                {["F", "I", "T"].map((social, idx) => (
                  <button
                    key={idx}
                    className="w-10 h-10 bg-white/10 hover:bg-[#C9A24D] rounded-lg flex items-center justify-center transition-all"
                  >
                    <span className="text-white text-sm font-bold">
                      {social}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Kings of the table. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-gray-500 text-sm">
              <button className="hover:text-[#C9A24D] transition-colors">
                Mentions légales
              </button>
              <button className="hover:text-[#C9A24D] transition-colors">
                Confidentialité
              </button>
              <button className="hover:text-[#C9A24D] transition-colors">
                CGU
              </button>
            </div>
          </div>
        </div>
      </footer>
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-40px) translateX(-10px);
          }
          75% {
            transform: translateY(-20px) translateX(10px);
          }
        }

        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(201, 162, 77, 0.3),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .group:hover .group-hover-scale {
          transform: scale(1.1);
        }

        .group:hover .group-hover-rotate {
          transform: rotate(360deg);
        }
      `}</style>
    </div>
  );
}

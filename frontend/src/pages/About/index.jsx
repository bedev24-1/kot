import React, { useState, useEffect } from "react";
import {
  Trophy,
  Users,
  Calendar,
  Clock,
  MapPin,
  Play,
  ChevronRight,
  Filter,
  Search,
  Medal,
  Zap,
  TrendingUp,
  Award,
  AlertCircle,
  Shuffle,
  Target,
  Star,
  Eye,
} from "lucide-react";

export default function TournamentPools() {
  const [selectedPool, setSelectedPool] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, ongoing, finished
  const [showDrawAnimation, setShowDrawAnimation] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 7,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  // État du tournoi: 'before-draw' | 'after-draw' | 'ongoing' | 'finished'
  const tournamentStatus = "ongoing";
 // Changez cette valeur pour tester les différents états

  const drawDate = new Date("2025-02-15T14:00:00"); // Date du tirage au sort

  // Compte à rebours
  useEffect(() => {
    if (tournamentStatus === "before-draw") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
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
      return () => clearInterval(timer);
    }
  }, [tournamentStatus]);

  // Données simulées des poules (après tirage au sort)
  const pools = Array.from({ length: 20 }, (_, poolIndex) => ({
    id: poolIndex + 1,
    name: `Poule ${String.fromCharCode(65 + poolIndex)}`,
    players: Array.from({ length: 5 }, (_, playerIndex) => ({
      id: poolIndex * 5 + playerIndex + 1,
      name: `Joueur ${poolIndex * 5 + playerIndex + 1}`,
      played: Math.floor(Math.random() * 4),
      won: Math.floor(Math.random() * 3),
      lost: Math.floor(Math.random() * 2),
      points: Math.floor(Math.random() * 6),
      city: ["Douala", "Yaoundé", "Bafoussam", "Garoua", "Bamenda"][
        Math.floor(Math.random() * 5)
      ],
    })).sort((a, b) => b.points - a.points),
    matches: [
      {
        id: 1,
        player1: `Joueur ${poolIndex * 5 + 1}`,
        player2: `Joueur ${poolIndex * 5 + 2}`,
        score1: 15,
        score2: 12,
        date: "2025-02-20",
        time: "10:00",
        table: Math.floor(Math.random() * 5) + 1,
        status: "finished",
      },
      {
        id: 2,
        player1: `Joueur ${poolIndex * 5 + 3}`,
        player2: `Joueur ${poolIndex * 5 + 4}`,
        score1: null,
        score2: null,
        date: "2025-02-20",
        time: "11:30",
        table: Math.floor(Math.random() * 5) + 1,
        status: "scheduled",
      },
      {
        id: 3,
        player1: `Joueur ${poolIndex * 5 + 1}`,
        player2: `Joueur ${poolIndex * 5 + 3}`,
        score1: null,
        score2: null,
        date: "2025-02-20",
        time: "14:00",
        table: Math.floor(Math.random() * 5) + 1,
        status: "scheduled",
      },
    ],
  }));

  // Animation du tirage au sort
  const handleDrawAnimation = () => {
    setShowDrawAnimation(true);
    setTimeout(() => setShowDrawAnimation(false), 3000);
  };

  // Composant: Avant le tirage au sort
  if (tournamentStatus === "before-draw") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F3D2E] via-[#0B1C2D] to-[#0F3D2E] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#C9A24D] to-[#B8934A] rounded-3xl mb-6 animate-pulse">
              <Shuffle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tirage au sort des poules
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              100 joueurs • 20 poules de 5 joueurs
            </p>
          </div>

          {/* Compte à rebours principal */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border-2 border-white/20">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-[#C9A24D]" />
                <h2 className="text-2xl font-bold text-white">
                  Le tirage au sort commence dans
                </h2>
              </div>
              <div className="text-gray-300 mb-6">
                <Calendar className="w-5 h-5 inline mr-2" />
                {drawDate.toLocaleDateString("fr-FR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>

            {/* Compteurs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  value: countdown.days,
                  label: "Jours",
                  color: "from-red-500 to-red-600",
                },
                {
                  value: countdown.hours,
                  label: "Heures",
                  color: "from-orange-500 to-orange-600",
                },
                {
                  value: countdown.minutes,
                  label: "Minutes",
                  color: "from-yellow-500 to-yellow-600",
                },
                {
                  value: countdown.seconds,
                  label: "Secondes",
                  color: "from-green-500 to-green-600",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-center transform hover:scale-105 transition-all`}
                >
                  <div className="text-5xl font-bold text-white mb-2">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-white/90 text-sm font-semibold uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Informations */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#C9A24D]/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#C9A24D]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">100</div>
                  <div className="text-sm text-gray-300">Joueurs inscrits</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#C9A24D]/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#C9A24D]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">20</div>
                  <div className="text-sm text-gray-300">Poules de 5</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#C9A24D]/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#C9A24D]" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">3</div>
                  <div className="text-sm text-gray-300">
                    Jours de compétition
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment ça marche */}
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#0F3D2E] mb-8 text-center">
              Comment fonctionne le tirage ?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C9A24D] to-[#B8934A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">
                    Tirage aléatoire transparent
                  </h3>
                  <p className="text-gray-600">
                    Les 100 joueurs seront répartis de manière totalement
                    aléatoire dans 20 poules de 5 joueurs. Le tirage sera
                    diffusé en direct et enregistré pour garantir une
                    transparence totale.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C9A24D] to-[#B8934A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">
                    Phase de poules
                  </h3>
                  <p className="text-gray-600">
                    Chaque joueur affrontera tous les membres de sa poule. Les 2
                    meilleurs de chaque poule (40 joueurs au total) se
                    qualifieront pour la phase éliminatoire.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C9A24D] to-[#B8934A] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0F3D2E] mb-2">
                    Publication immédiate
                  </h3>
                  <p className="text-gray-600">
                    Dès la fin du tirage, les compositions des poules et le
                    calendrier des matchs seront publiés sur cette page. Vous
                    recevrez également une notification par email.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-[#C9A24D]/10 to-[#C9A24D]/5 border-2 border-[#C9A24D] rounded-2xl p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-[#C9A24D] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[#0F3D2E] mb-2">
                    Restez connecté !
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Le tirage au sort sera diffusé en direct sur nos réseaux
                    sociaux. Assurez-vous d'avoir vérifié votre email pour
                    recevoir la confirmation de votre poule et de vos horaires
                    de match.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bouton de simulation (à retirer en production) */}
          <div className="text-center mt-8">
            <button
              onClick={handleDrawAnimation}
              className="px-8 py-4 bg-gradient-to-r from-[#C9A24D] to-[#B8934A] text-white rounded-xl font-bold hover:shadow-2xl transition-all inline-flex items-center space-x-3"
            >
              <Shuffle className="w-5 h-5" />
              <span>Simuler le tirage</span>
            </button>
          </div>
        </div>

        {/* Animation de tirage */}
        {showDrawAnimation && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-[#C9A24D] to-[#B8934A] rounded-full flex items-center justify-center mb-6 animate-spin">
                <Shuffle className="w-16 h-16 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">
                Tirage en cours...
              </h2>
              <p className="text-xl text-gray-300">Attribution des poules</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Composant: Après le tirage au sort (affichage des poules)
  return (
    <div className="min-h-screen bg-white">
      {/* Header professionnel */}
      <div className="bg-gradient-to-r from-[#0F3D2E] to-[#0B1C2D] border-b-4 border-[#C9A24D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Kings of the Table 2025
              </h1>
              <p className="text-gray-300">
                Phase de Poules • 100 Joueurs • 20 Groupes
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="text-center px-6 border-l border-white/20">
                <div className="text-2xl font-bold text-white">Jour 2</div>
                <div className="text-sm text-gray-400">20 Fév 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats globales - Version professionnelle */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A24D] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                Matchs Total
              </span>
              <Play className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">200</div>
            <div className="text-xs text-gray-500 mt-1">Phase de groupes</div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A24D] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Joués</span>
              <Trophy className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">145</div>
            <div className="text-xs text-green-600 mt-1">72.5% complétés</div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A24D] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">
                En cours
              </span>
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">8</div>
            <div className="text-xs text-orange-600 mt-1">
              Tables 1-8 actives
            </div>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-[#C9A24D] transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">À venir</span>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">47</div>
            <div className="text-xs text-purple-600 mt-1">Programmés</div>
          </div>

          <div className="bg-gradient-to-br from-[#C9A24D] to-[#B8934A] rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/90 text-sm font-medium">
                Qualifiés
              </span>
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="text-3xl font-bold">40</div>
            <div className="text-xs text-white/80 mt-1">Top 2 par groupe</div>
          </div>
        </div>

        {/* Barre de recherche et filtres - Version pro */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher joueur, groupe..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24D] focus:border-transparent text-sm"
              />
            </div>
            <div className="flex gap-2 w-full lg:w-auto">
              {[
                {
                  id: "all",
                  label: "Tous",
                  icon: <Filter className="w-4 h-4" />,
                },
                {
                  id: "ongoing",
                  label: "En cours",
                  icon: <Play className="w-4 h-4" />,
                },
                {
                  id: "finished",
                  label: "Terminés",
                  icon: <Trophy className="w-4 h-4" />,
                },
              ].map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id)}
                  className={`flex-1 lg:flex-none px-4 py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
                    filter === filterOption.id
                      ? "bg-[#0F3D2E] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filterOption.icon}
                  <span>{filterOption.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille des groupes - Style sportif professionnel */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {pools.map((pool) => (
            <div
              key={pool.id}
              onClick={() => setSelectedPool(pool)}
              className="bg-white border-2 border-gray-200 rounded-lg hover:border-[#C9A24D] hover:shadow-lg transition-all cursor-pointer overflow-hidden"
            >
              {/* Header groupe */}
              <div className="bg-gray-50 border-b-2 border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0F3D2E] rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      {pool.name.split(" ")[1]}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">{pool.name}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              {/* Classement condensé */}
              <div className="p-3">
                <div className="space-y-1">
                  {pool.players.slice(0, 5).map((player, idx) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <span
                          className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                            idx === 0
                              ? "bg-[#C9A24D] text-white"
                              : idx === 1
                              ? "bg-gray-300 text-gray-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold text-sm text-gray-900 truncate">
                            {player.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {player.city}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs text-gray-500">
                          {player.played}J
                        </span>
                        <span className="font-bold text-sm text-gray-900 min-w-[2rem] text-right">
                          {player.points} pts
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal détail groupe - Version professionnelle */}
        {selectedPool && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPool(null)}
          >
            <div
              className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Modal */}
              <div className="bg-gradient-to-r from-[#0F3D2E] to-[#0B1C2D] px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedPool.name}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-300 text-sm mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedPool.players.length} joueurs
                    </span>
                    <span className="flex items-center gap-1">
                      <Play className="w-4 h-4" />
                      {selectedPool.matches.length} matchs
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPool(null)}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <span className="text-white text-2xl">×</span>
                </button>
              </div>

              <div className="overflow-y-auto flex-1 p-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Classement */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 border-b-2 border-gray-200 pb-2">
                      <Trophy className="w-5 h-5 text-[#C9A24D]" />
                      Classement
                    </h3>
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="py-3 px-3 text-left font-semibold text-gray-700">
                              #
                            </th>
                            <th className="py-3 px-3 text-left font-semibold text-gray-700">
                              Joueur
                            </th>
                            <th className="py-3 px-2 text-center font-semibold text-gray-700">
                              J
                            </th>
                            <th className="py-3 px-2 text-center font-semibold text-gray-700">
                              V
                            </th>
                            <th className="py-3 px-2 text-center font-semibold text-gray-700">
                              D
                            </th>
                            <th className="py-3 px-3 text-center font-semibold text-gray-700">
                              Pts
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedPool.players.map((player, idx) => (
                            <tr
                              key={player.id}
                              className={`border-b border-gray-100 last:border-0 hover:bg-gray-50 ${
                                idx < 2 ? "bg-green-50" : ""
                              }`}
                            >
                              <td className="py-3 px-3">
                                <span
                                  className={`inline-flex items-center justify-center w-7 h-7 rounded font-bold text-xs ${
                                    idx === 0
                                      ? "bg-[#C9A24D] text-white"
                                      : idx === 1
                                      ? "bg-gray-300 text-gray-700"
                                      : "bg-gray-100 text-gray-600"
                                  }`}
                                >
                                  {idx + 1}
                                </span>
                              </td>

                              <td className="py-3 px-3">
                                <div className="font-semibold text-gray-900">
                                  {player.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {player.city}
                                </div>
                              </td>

                              <td className="py-3 px-2 text-center text-gray-700">
                                {player.played}
                              </td>

                              <td className="py-3 px-2 text-center">
                                <span className="text-green-600 font-semibold">
                                  {player.won}
                                </span>
                              </td>

                              <td className="py-3 px-2 text-center">
                                <span className="text-red-600 font-semibold">
                                  {player.lost}
                                </span>
                              </td>

                              <td className="py-3 px-3 text-center">
                                <span className="font-bold text-gray-900">
                                  {player.points}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Trophy,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Users,
  Shield,
  Clock,
  AlertCircle,
  Sparkles,
  Star,
  Award,
  Calendar,
  FileText,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Étape 1: Informations personnelles
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "Camerounaise",

    // Étape 2: Contact
    email: "",
    phone: "",
    whatsapp: "",
    city: "",
    address: "",

    // Étape 3: Informations joueur
    playerLevel: "",
    yearsExperience: "",
    previousTournaments: "",
    preferredHand: "",

    // Étape 4: Conditions
    acceptRules: false,
    acceptTerms: false,
    acceptPrivacy: false,
    acceptFairPlay: false,

    // Étape 5: Paiement
    paymentMethod: "",
    transactionRef: "",
  });

  const [errors, setErrors] = useState({});
  const [placesRestantes, setPlacesRestantes] = useState(23);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 5;
  const registrationFee = 10000;

  // Animation des places restantes
  useEffect(() => {
    const interval = setInterval(() => {
      setPlacesRestantes((prev) =>
        Math.max(15, prev - Math.floor(Math.random() * 2))
      );
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.firstName.trim())
        newErrors.firstName = "Le prénom est requis";
      if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "La date de naissance est requise";
      if (!formData.gender)
        newErrors.gender = "Veuillez sélectionner votre genre";

      // Validation âge minimum (18 ans)
      if (formData.dateOfBirth) {
        const birthDate = new Date(formData.dateOfBirth);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 18)
          newErrors.dateOfBirth = "Vous devez avoir au moins 18 ans";
      }
    }

    if (step === 2) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email.trim()) newErrors.email = "L'email est requis";
      else if (!emailRegex.test(formData.email))
        newErrors.email = "Email invalide";

      const phoneRegex = /^[0-9]{9}$/;
      if (!formData.phone.trim()) newErrors.phone = "Le téléphone est requis";
      else if (!phoneRegex.test(formData.phone.replace(/\s/g, "")))
        newErrors.phone = "Numéro invalide (9 chiffres)";

      if (!formData.city.trim()) newErrors.city = "La ville est requise";
    }

    if (step === 3) {
      if (!formData.playerLevel)
        newErrors.playerLevel = "Sélectionnez votre niveau";
      if (!formData.yearsExperience)
        newErrors.yearsExperience = "Indiquez votre expérience";
      if (!formData.preferredHand)
        newErrors.preferredHand = "Sélectionnez votre main dominante";
    }

    if (step === 4) {
      if (!formData.acceptRules)
        newErrors.acceptRules = "Vous devez accepter le règlement";
      if (!formData.acceptTerms)
        newErrors.acceptTerms = "Vous devez accepter les CGU";
      if (!formData.acceptPrivacy)
        newErrors.acceptPrivacy =
          "Vous devez accepter la politique de confidentialité";
      if (!formData.acceptFairPlay)
        newErrors.acceptFairPlay = "Vous devez accepter le code fair-play";
    }

    if (step === 5) {
      if (!formData.paymentMethod)
        newErrors.paymentMethod = "Sélectionnez un mode de paiement";
      if (formData.paymentMethod && !formData.transactionRef.trim()) {
        newErrors.transactionRef = "La référence de transaction est requise";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(5)) {
      setIsSubmitting(true);

      // Simulation de soumission
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccess(true);
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F3D2E] via-[#0B1C2D] to-[#0F3D2E] flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-4xl font-bold text-[#0F3D2E] mb-4">
            Inscription confirmée ! 🎉
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Félicitations{" "}
            <span className="font-bold text-[#C9A24D]">
              {formData.firstName} {formData.lastName}
            </span>{" "}
            !<br />
            Votre inscription au tournoi a été enregistrée avec succès.
          </p>

          <div className="bg-gradient-to-r from-[#C9A24D]/10 to-[#C9A24D]/5 border-2 border-[#C9A24D] rounded-2xl p-6 mb-8">
            <div className="text-sm text-gray-600 mb-2">
              Numéro de confirmation
            </div>
            <div className="text-3xl font-bold text-[#0F3D2E] mb-4">
              KOT-2026-
              {Math.floor(Math.random() * 1000)
                .toString()
                .padStart(3, "0")}
            </div>
            <div className="text-sm text-gray-500">
              Un email de confirmation a été envoyé à{" "}
              <span className="font-semibold text-[#0F3D2E]">
                {formData.email}
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Frais d'inscription</span>
              <span className="font-bold text-[#0F3D2E]">
                {registrationFee.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <span className="text-gray-600">Statut du paiement</span>
              <span className="flex items-center text-green-600 font-semibold">
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmé
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-6 py-4 bg-gradient-to-r from-[#C9A24D] to-[#B8934A] text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center justify-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Télécharger la confirmation</span>
            </button>
            <button
              onClick={() => navigate("/home")}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F3D2E] via-[#0B1C2D] to-[#0F3D2E] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#C9A24D] to-[#B8934A] rounded-2xl flex items-center justify-center">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">
                Kings of the table
              </h1>
              <p className="text-[#C9A24D] text-sm font-semibold">
                Formulaire d'inscription 2025
              </p>
            </div>
          </div>

          {/* Alerte places restantes */}
          <div className="inline-flex items-center space-x-3 bg-red-500/20 backdrop-blur-md border-2 border-red-400 rounded-full px-6 py-3 mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <Users className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-white font-bold">
              Seulement {placesRestantes} places restantes !
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ${
                    step < currentStep
                      ? "bg-green-500 text-white scale-100"
                      : step === currentStep
                      ? "bg-gradient-to-br from-[#C9A24D] to-[#B8934A] text-white scale-110 shadow-lg"
                      : "bg-white/20 text-white/50"
                  }`}
                >
                  {step < currentStep ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step
                  )}
                </div>
                <div
                  className={`text-xs mt-2 font-medium ${
                    step === currentStep ? "text-[#C9A24D]" : "text-white/60"
                  }`}
                >
                  {
                    ["Identité", "Contact", "Joueur", "Règlement", "Paiement"][
                      step - 1
                    ]
                  }
                </div>
              </div>
            ))}
          </div>

          <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-[#C9A24D] to-green-500 transition-all duration-500 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            {/* Step 1: Informations personnelles */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F3D2E]">
                      Informations personnelles
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Commençons par vos informations de base
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Prénom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all ${
                        errors.firstName ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Jean"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nom <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all ${
                        errors.lastName ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Kameni"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date de naissance <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) =>
                        updateFormData("dateOfBirth", e.target.value)
                      }
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all ${
                        errors.dateOfBirth
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Genre <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.gender}
                      onChange={(e) => updateFormData("gender", e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all ${
                        errors.gender ? "border-red-500" : "border-gray-200"
                      }`}
                    >
                      <option value="">Sélectionner</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nationalité
                  </label>
                  <input
                    type="text"
                    value={formData.nationality}
                    onChange={(e) =>
                      updateFormData("nationality", e.target.value)
                    }
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F3D2E]">
                      Informations de contact
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Comment pouvons-nous vous joindre ?
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all ${
                      errors.email ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="jean.kameni@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          updateFormData("phone", e.target.value)
                        }
                        className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all ${
                          errors.phone ? "border-red-500" : "border-gray-200"
                        }`}
                        placeholder="696 995 879"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      WhatsApp (optionnel)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={formData.whatsapp}
                        onChange={(e) =>
                          updateFormData("whatsapp", e.target.value)
                        }
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all"
                        placeholder="696 995 879"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ville <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                      className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all ${
                        errors.city ? "border-red-500" : "border-gray-200"
                      }`}
                      placeholder="Douala"
                    />
                  </div>
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Adresse complète (optionnel)
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => updateFormData("address", e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all resize-none"
                    placeholder="Quartier, rue..."
                  />
                </div>
              </div>
            )}

            {/* Step 3: Informations joueur */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] rounded-xl flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F3D2E]">
                      Profil de joueur
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Parlez-nous de votre expérience
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Niveau de jeu <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Débutant", "Intermédiaire", "Avancé", "Expert"].map(
                      (level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => updateFormData("playerLevel", level)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            formData.playerLevel === level
                              ? "border-[#C9A24D] bg-[#C9A24D]/10 text-[#0F3D2E] font-bold"
                              : "border-gray-200 hover:border-[#C9A24D]/50"
                          }`}
                        >
                          {level}
                        </button>
                      )
                    )}
                  </div>
                  {errors.playerLevel && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.playerLevel}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Années d'expérience <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      "< 1 an",
                      "1-2 ans",
                      "3-5 ans",
                      "6-10 ans",
                      "> 10 ans",
                    ].map((exp) => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => updateFormData("yearsExperience", exp)}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          formData.yearsExperience === exp
                            ? "border-[#C9A24D] bg-[#C9A24D]/10 text-[#0F3D2E] font-bold"
                            : "border-gray-200 hover:border-[#C9A24D]/50"
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                  {errors.yearsExperience && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.yearsExperience}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tournois précédents (optionnel)
                  </label>
                  <textarea
                    value={formData.previousTournaments}
                    onChange={(e) =>
                      updateFormData("previousTournaments", e.target.value)
                    }
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all resize-none"
                    placeholder="Listez vos participations ou victoires dans des tournois précédents..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Main dominante <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-2 gap-4">
                    {["Droitier", "Gaucher"].map((hand) => (
                      <button
                        key={hand}
                        type="button"
                        onClick={() => updateFormData("preferredHand", hand)}
                        className={`p-5 rounded-xl border-2 transition-all flex items-center justify-center space-x-3 ${
                          formData.preferredHand === hand
                            ? "border-[#C9A24D] bg-[#C9A24D]/10 text-[#0F3D2E] font-bold"
                            : "border-gray-200 hover:border-[#C9A24D]/50"
                        }`}
                      >
                        <span className="text-2xl">
                          {hand === "Droitier" ? "👉" : "👈"}
                        </span>
                        <span>{hand}</span>
                      </button>
                    ))}
                  </div>

                  {errors.preferredHand && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.preferredHand}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Conditions et Règlement */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F3D2E]">
                      Règlement du tournoi
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Veuillez lire et accepter les conditions
                    </p>
                  </div>
                </div>

                {/* Règlement du Billard */}
                <div className="bg-gradient-to-br from-[#0F3D2E]/5 to-[#0F3D2E]/10 rounded-2xl p-6 border-2 border-[#0F3D2E]/20">
                  <div className="flex items-start space-x-3 mb-4">
                    <FileText className="w-6 h-6 text-[#C9A24D] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-[#0F3D2E] text-lg mb-2">
                        Règlement officiel du billard à 15 boules
                      </h3>
                      <div className="space-y-2 text-sm text-gray-700">
                        <p>
                          • <strong>Format :</strong> Billard à 15 boules selon
                          les règles internationales EPBF
                        </p>
                        <p>
                          • <strong>Déroulement :</strong> Phase de groupes puis
                          élimination directe
                        </p>
                        <p>
                          • <strong>Fautes :</strong> Toute faute entraîne le
                          passage de la main à l'adversaire
                        </p>
                        <p>
                          • <strong>Victoire :</strong> Premier joueur à
                          empocher la boule 15 légalement
                        </p>
                        <p>
                          • <strong>Arbitrage :</strong> Décisions des arbitres
                          certifiés sont finales
                        </p>
                        <p>
                          • <strong>Tenue :</strong> Tenue correcte exigée (pas
                          de shorts, tongs ou débardeurs)
                        </p>
                      </div>
                      <button className="mt-4 text-[#C9A24D] font-semibold text-sm hover:underline flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger le règlement complet (PDF)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Checkbox Règlement */}
                <div
                  className={`border-2 rounded-xl p-5 transition-all ${
                    errors.acceptRules
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptRules}
                      onChange={(e) =>
                        updateFormData("acceptRules", e.target.checked)
                      }
                      className="mt-1 w-5 h-5 text-[#C9A24D] border-gray-300 rounded focus:ring-[#C9A24D]"
                    />
                    <span className="text-gray-700 text-sm">
                      <strong className="text-[#0F3D2E]">
                        J'accepte le règlement du tournoi
                      </strong>{" "}
                      et m'engage à respecter les règles officielles du billard
                      à 15 boules et les décisions arbitrales.
                    </span>
                  </label>
                  {errors.acceptRules && (
                    <p className="mt-2 text-sm text-red-500 flex items-center ml-8">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.acceptRules}
                    </p>
                  )}
                </div>

                {/* Conditions générales */}
                <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
                  <h3 className="font-bold text-[#0F3D2E] mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-[#C9A24D]" />
                    Conditions générales de participation
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>• Âge minimum requis : 18 ans</p>
                    <p>
                      • Présence obligatoire 30 minutes avant le début de votre
                      match
                    </p>
                    <p>
                      • Aucun remboursement après confirmation d'inscription
                    </p>
                    <p>
                      • Photos et vidéos du tournoi peuvent être utilisées à des
                      fins promotionnelles
                    </p>
                    <p>
                      • Respect du code de conduite et fair-play obligatoire
                    </p>
                  </div>
                </div>

                {/* Checkbox CGU */}
                <div
                  className={`border-2 rounded-xl p-5 transition-all ${
                    errors.acceptTerms
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptTerms}
                      onChange={(e) =>
                        updateFormData("acceptTerms", e.target.checked)
                      }
                      className="mt-1 w-5 h-5 text-[#C9A24D] border-gray-300 rounded focus:ring-[#C9A24D]"
                    />
                    <span className="text-gray-700 text-sm">
                      <strong className="text-[#0F3D2E]">
                        J'accepte les conditions générales d'utilisation
                      </strong>{" "}
                      et reconnais avoir lu et compris toutes les modalités de
                      participation.
                    </span>
                  </label>
                  {errors.acceptTerms && (
                    <p className="mt-2 text-sm text-red-500 flex items-center ml-8">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.acceptTerms}
                    </p>
                  )}
                </div>

                {/* Checkbox Confidentialité */}
                <div
                  className={`border-2 rounded-xl p-5 transition-all ${
                    errors.acceptPrivacy
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptPrivacy}
                      onChange={(e) =>
                        updateFormData("acceptPrivacy", e.target.checked)
                      }
                      className="mt-1 w-5 h-5 text-[#C9A24D] border-gray-300 rounded focus:ring-[#C9A24D]"
                    />
                    <span className="text-gray-700 text-sm">
                      <strong className="text-[#0F3D2E]">
                        J'accepte la politique de confidentialité
                      </strong>{" "}
                      et consens au traitement de mes données personnelles
                      conformément au RGPD.
                    </span>
                  </label>
                  {errors.acceptPrivacy && (
                    <p className="mt-2 text-sm text-red-500 flex items-center ml-8">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.acceptPrivacy}
                    </p>
                  )}
                </div>

                {/* Code Fair-Play */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                  <h3 className="font-bold text-green-800 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-green-600" />
                    Code Fair-Play et Éthique Sportive
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>✓ Respect des adversaires, arbitres et organisateurs</p>
                    <p>
                      ✓ Interdiction de tout comportement antisportif ou
                      agressif
                    </p>
                    <p>
                      ✓ Pas de tricherie, manipulation ou tentative de
                      corruption
                    </p>
                    <p>
                      ✓ Acceptation des décisions arbitrales sans contestation
                      excessive
                    </p>
                    <p>✓ Esprit sportif et fair-play en toutes circonstances</p>
                  </div>
                </div>

                {/* Checkbox Fair-Play */}
                <div
                  className={`border-2 rounded-xl p-5 transition-all ${
                    errors.acceptFairPlay
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                >
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.acceptFairPlay}
                      onChange={(e) =>
                        updateFormData("acceptFairPlay", e.target.checked)
                      }
                      className="mt-1 w-5 h-5 text-[#C9A24D] border-gray-300 rounded focus:ring-[#C9A24D]"
                    />
                    <span className="text-gray-700 text-sm">
                      <strong className="text-[#0F3D2E]">
                        Je m'engage à respecter le code fair-play
                      </strong>{" "}
                      et à adopter un comportement exemplaire durant tout le
                      tournoi sous peine d'exclusion.
                    </span>
                  </label>
                  {errors.acceptFairPlay && (
                    <p className="mt-2 text-sm text-red-500 flex items-center ml-8">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.acceptFairPlay}
                    </p>
                  )}
                </div>

                {/* Avertissement */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Important :</strong> Tout manquement grave au
                      règlement ou au code fair-play entraînera une exclusion
                      immédiate du tournoi sans remboursement des frais
                      d'inscription.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Paiement */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#0F3D2E] to-[#0B1C2D] rounded-xl flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#C9A24D]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F3D2E]">
                      Paiement
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Finalisez votre inscription
                    </p>
                  </div>
                </div>

                {/* Récapitulatif */}
                <div className="bg-gradient-to-br from-[#C9A24D]/10 to-[#C9A24D]/5 border-2 border-[#C9A24D] rounded-2xl p-6">
                  <h3 className="font-bold text-[#0F3D2E] mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-[#C9A24D]" />
                    Récapitulatif de votre inscription
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-[#C9A24D]/20">
                      <span className="text-gray-700">Participant</span>
                      <span className="font-semibold text-[#0F3D2E]">
                        {formData.firstName} {formData.lastName}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#C9A24D]/20">
                      <span className="text-gray-700">Email</span>
                      <span className="font-semibold text-[#0F3D2E]">
                        {formData.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#C9A24D]/20">
                      <span className="text-gray-700">Niveau</span>
                      <span className="font-semibold text-[#0F3D2E]">
                        {formData.playerLevel}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 bg-[#0F3D2E] -mx-6 px-6 -mb-6 rounded-b-xl mt-4">
                      <span className="text-white font-bold">
                        Frais d'inscription
                      </span>
                      <span className="text-2xl font-bold text-[#C9A24D]">
                        {registrationFee.toLocaleString()} FCFA
                      </span>
                    </div>
                  </div>
                </div>

                {/* Méthodes de paiement */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    Mode de paiement <span className="text-red-500">*</span>
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      {
                        id: "momo",
                        name: "MTN Mobile Money",
                        icon: "📱",
                        color: "from-yellow-400 to-yellow-600",
                      },
                      {
                        id: "om",
                        name: "Orange Money",
                        icon: "🟠",
                        color: "from-orange-400 to-orange-600",
                      },
                      {
                        id: "bank",
                        name: "Virement bancaire",
                        icon: "🏦",
                        color: "from-blue-400 to-blue-600",
                      },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() =>
                          updateFormData("paymentMethod", method.id)
                        }
                        className={`p-5 rounded-xl border-2 transition-all ${
                          formData.paymentMethod === method.id
                            ? "border-[#C9A24D] bg-[#C9A24D]/10 shadow-lg scale-105"
                            : "border-gray-200 hover:border-[#C9A24D]/50 hover:scale-102"
                        }`}
                      >
                        <div className="text-4xl mb-3">{method.icon}</div>
                        <div className="text-sm font-semibold text-[#0F3D2E]">
                          {method.name}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.paymentMethod && (
                    <p className="mt-2 text-sm text-red-500 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.paymentMethod}
                    </p>
                  )}
                </div>

                {/* Instructions de paiement */}
                {formData.paymentMethod && (
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 animate-fade-in-up">
                    <h4 className="font-bold text-blue-900 mb-3 flex items-center">
                      <Clock className="w-5 h-5 mr-2" />
                      Instructions de paiement
                    </h4>
                    {formData.paymentMethod === "momo" && (
                      <div className="space-y-2 text-sm text-blue-800">
                        <p>
                          <strong>1.</strong> Composez *126# sur votre téléphone
                        </p>
                        <p>
                          <strong>2.</strong> Sélectionnez "Transfert d'argent"
                        </p>
                        <p>
                          <strong>3.</strong> Envoyez{" "}
                          <strong className="text-lg">
                            {registrationFee.toLocaleString()} FCFA
                          </strong>{" "}
                          au numéro :{" "}
                          <strong className="text-lg">6 96 995 879</strong>
                        </p>
                        <p>
                          <strong>4.</strong> Conservez le code de transaction
                          et entrez-le ci-dessous
                        </p>
                      </div>
                    )}
                    {formData.paymentMethod === "om" && (
                      <div className="space-y-2 text-sm text-blue-800">
                        <p>
                          <strong>1.</strong> Composez #150# sur votre téléphone
                        </p>
                        <p>
                          <strong>2.</strong> Sélectionnez "Transfert d'argent"
                        </p>
                        <p>
                          <strong>3.</strong> Envoyez{" "}
                          <strong className="text-lg">
                            {registrationFee.toLocaleString()} FCFA
                          </strong>{" "}
                          au numéro :{" "}
                          <strong className="text-lg">6 96 995 879</strong>
                        </p>
                        <p>
                          <strong>4.</strong> Conservez le code de transaction
                          et entrez-le ci-dessous
                        </p>
                      </div>
                    )}
                    {formData.paymentMethod === "bank" && (
                      <div className="space-y-2 text-sm text-blue-800">
                        <p>
                          <strong>Bénéficiaire :</strong> KINGS OF THE TABLE
                        </p>
                        <p>
                          <strong>Banque :</strong> AFRILAND FIRST BANK
                        </p>
                        {/* <p>
                          <strong>IBAN :</strong> CM21 1000 2XXX XXXX XXXX XXXX
                          XXXX
                        </p> */}
                        <p>
                          <strong>Montant :</strong>{" "}
                          <strong className="text-lg">
                            {registrationFee.toLocaleString()} FCFA
                          </strong>
                        </p>
                        <p>
                          <strong>Référence :</strong> Votre nom complet
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Référence de transaction */}
                {formData.paymentMethod && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Référence/Code de transaction{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.transactionRef}
                      onChange={(e) =>
                        updateFormData("transactionRef", e.target.value)
                      }
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A24D] transition-all font-mono ${
                        errors.transactionRef
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Ex: MP240115.1234.A12345"
                    />
                    {errors.transactionRef && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors.transactionRef}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-gray-500">
                      Entrez exactement le code reçu par SMS après votre
                      paiement
                    </p>
                  </div>
                )}

                {/* Note importante */}
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-5">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <strong>Important :</strong> Votre inscription sera
                      validée dans les 24h après vérification de votre paiement.
                      Vous recevrez un email de confirmation avec votre numéro
                      de participant.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-8 border-t-2 border-gray-100 mt-8">
              {currentStep > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center space-x-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Précédent</span>
                </button>
              )}

              {currentStep < totalSteps ? (
                <button
                  onClick={nextStep}
                  className={`px-8 py-3 bg-gradient-to-r from-[#C9A24D] to-[#B8934A] text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center space-x-2 ${
                    currentStep === 1 ? "w-full justify-center" : "ml-auto"
                  }`}
                >
                  <span>Suivant</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`ml-auto px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all flex items-center space-x-2 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Traitement...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Confirmer l'inscription</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-white/80 text-sm">
          <p>
            Besoin d'aide ? Contactez-nous au +237 696 995 879 ou
            info@kingsofthetable.cm
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

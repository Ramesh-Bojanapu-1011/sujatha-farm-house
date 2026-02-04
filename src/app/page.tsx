"use client";

import { useEffect, useRef, useState } from "react";
import AOS from "aos";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | {
    title: string;
  }>(null);
  const [orderForm, setOrderForm] = useState({
    quantity: 1,
    name: "",
    mobile: "",
    address: "",
    paymentMethod: "cod" as "upi" | "cod",
    utr: "",
  });
  const [orderStatus, setOrderStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Image Slider Data
  const sliderImages = [
    { id: 1, src: "Farm_image.png", alt: "Farm landscape" },
    { id: 2, src: "front_gate.png", alt: "Farm animals" },
    { id: 3, src: "chins.png", alt: "Farm produce" },
    { id: 4, src: "goat.png", alt: "Farm sunset" },
    { id: 5, src: "punju.png", alt: "Farm morning" },
  ];

  // Products Data
  const products = [
    {
      id: 1,
      emoji: "🥚",
      title: "Fresh Eggs",
      badge: "Daily Fresh",
      description:
        "Free‑range eggs with rich yolks and higher nutrition. Collected each morning.",
      cta: "Order now",
      bgGradient: "from-green-50 to-white",
      borderColor: "border-green-100",
      badgeBg: "bg-green-100",
      badgeText: "text-green-700",
      glowFrom: "from-green-400/20",
      glowTo: "to-emerald-300/20",
      iconBg: "bg-white",
      ctaColor: "text-green-700",
      delay: "50",
    },
    {
      id: 2,
      emoji: "🐔",
      title: "Farm Hens",
      badge: "Healthy Stock",
      description:
        "Organically raised hens for backyard flocks or small farms. Strong and disease‑resistant.",
      cta: "Buy now",
      bgGradient: "from-orange-50 to-white",
      borderColor: "border-orange-100",
      badgeBg: "bg-orange-100",
      badgeText: "text-orange-700",
      glowFrom: "from-orange-400/20",
      glowTo: "to-yellow-300/20",
      iconBg: "bg-white",
      ctaColor: "text-orange-700",
      delay: "150",
    },
    {
      id: 3,
      emoji: "🥛",
      title: "Cow Milk",
      badge: "Pure & Creamy",
      description:
        "Grass‑fed, naturally sweet milk with no additives. Available for delivery or pickup.",
      cta: "Get milk",
      bgGradient: "from-blue-50 to-white",
      borderColor: "border-blue-100",
      badgeBg: "bg-blue-100",
      badgeText: "text-blue-700",
      glowFrom: "from-blue-400/20",
      glowTo: "to-cyan-300/20",
      iconBg: "bg-white",
      ctaColor: "text-blue-700",
      delay: "250",
    },
    {
      id: 4,
      emoji: "🥩",
      title: "Quality Meat",
      badge: "Premium Cuts",
      description:
        "Ethically raised, tender, and flavorful cuts. Freshly prepared to order.",
      cta: "Shop meat",
      bgGradient: "from-red-50 to-white",
      borderColor: "border-red-100",
      badgeBg: "bg-red-100",
      badgeText: "text-red-700",
      glowFrom: "from-red-400/20",
      glowTo: "to-pink-300/20",
      iconBg: "bg-white",
      ctaColor: "text-red-700",
      delay: "350",
    },
  ];

  // Why Choose Us Data
  const features = [
    {
      id: 1,
      emoji: "🌾",
      title: "Natural Feed",
      description:
        "Our animals eat a clean, nutrient‑dense diet for healthier, tastier products.",
      bgGradient: "from-green-50 to-white",
      borderColor: "border-green-100",
      glowFrom: "from-green-300/20",
      glowTo: "to-emerald-200/20",
      delay: "50",
    },
    {
      id: 2,
      emoji: "💚",
      title: "Sustainable Farming",
      description:
        "We conserve water, protect soil health, and nurture local biodiversity.",
      bgGradient: "from-emerald-50 to-white",
      borderColor: "border-emerald-100",
      glowFrom: "from-emerald-300/20",
      glowTo: "to-teal-200/20",
      delay: "150",
    },
    {
      id: 3,
      emoji: "🏆",
      title: "Quality Guaranteed",
      description:
        "Every batch is checked for freshness, flavor, and safety before delivery.",
      bgGradient: "from-yellow-50 to-white",
      borderColor: "border-yellow-100",
      glowFrom: "from-yellow-300/20",
      glowTo: "to-amber-200/20",
      delay: "250",
    },
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: "Hemanth ",
      avatar: "👨",
      avatarBg: "from-green-100 to-green-50",
      accentColor: "from-green-500",
      glowFrom: "from-green-100/40",
      quote:
        "The freshest eggs I've ever had. You can taste the difference in every bite.",
      delay: "50",
    },
    {
      id: 2,
      name: "B V N Laskhmi",
      avatar: "👩",
      avatarBg: "from-pink-100 to-pink-50",
      accentColor: "from-pink-500",
      glowFrom: "from-pink-100/40",
      quote:
        "Creamy, pure milk and friendly service. It feels great to support a local farm.",
      delay: "150",
    },
    {
      id: 3,
      name: "Balaji",
      avatar: "👨",
      avatarBg: "from-blue-100 to-blue-50",
      accentColor: "from-blue-500",
      glowFrom: "from-blue-100/40",
      quote:
        "Outstanding meat quality — always tender, flavorful, and delivered fresh.",
      delay: "250",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      offset: 80,
    });
  }, []);

  useEffect(() => {
    const target = videoRef.current;
    if (!target || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            target.play().catch(() => null);
          } else {
            target.pause();
          }
        });
      },
      { threshold: [0.5] },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Auto-slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleMobileNav = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === sliderImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? sliderImages.length - 1 : prevIndex - 1,
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  const openOrder = (product: { title: string }) => {
    setSelectedProduct(product);
    setOrderForm((prev) => ({
      ...prev,
      quantity: 1,
      paymentMethod: "cod",
      utr: "",
    }));
    setOrderStatus("idle");
    setIsOrderOpen(true);
  };

  const closeOrder = () => {
    setIsOrderOpen(false);
  };

  const handleOrderChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setOrderForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus("idle");

    try {
      if (orderForm.paymentMethod === "upi" && !orderForm.utr.trim()) {
        setOrderStatus("error");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Order submitted:", {
        product: selectedProduct,
        ...orderForm,
      });

      setOrderStatus("success");
      setTimeout(() => {
        setIsOrderOpen(false);
      }, 1200);
    } catch (error) {
      console.error("Order submission failed:", error);
      setOrderStatus("error");
    }
  };

  return (
    <div className="min-h-screen    bg-[#f8fbf7] text-gray-900">
      {/* Header/Navigation */}
      <nav
        className="bg-white/80 backdrop-blur-md border-b border-green-100 py-4  px-6 sticky top-0 z-50"
        data-aos="fade-down"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="logo.svg" alt="" className="w-15" />
            <h1 className="text-2xl font-extrabold text-green-900">
              Sujatha Farm
            </h1>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <li>
              <a
                href="#home"
                className="hover:text-green-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav("home");
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-green-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav("services");
                }}
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="hover:text-green-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav("about");
                }}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-green-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav("testimonials");
                }}
              >
                Testimonials
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="hover:text-green-700"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNav("contact");
                }}
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+917702274599" className="text-sm text-green-800 font-medium">
              Call: +91 7702274599
            </a>
            <a
              href="#contact"
              className="bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition"
              onClick={(e) => {
                e.preventDefault();
                handleMobileNav("contact");
              }}
            >
              Get Quote
            </a>
          </div>
          <button
            className="md:hidden text-2xl focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={closeMobileMenu}
        >
          <div
            className={`fixed right-0 top-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-green-100">
              <h2 className="text-lg font-bold text-green-900">Menu</h2>
              <button
                onClick={closeMobileMenu}
                className="text-2xl text-gray-600 focus:outline-none"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <nav className="p-6 bg-white/80">
              <ul className="space-y-4">
                <li>
                  <a
                    href="#home"
                    className="block text-gray-700 font-semibold py-2 hover:text-green-700 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNav("home");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="block text-gray-700 font-semibold py-2 hover:text-green-700 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNav("services");
                    }}
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="block text-gray-700 font-semibold py-2 hover:text-green-700 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNav("about");
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="block text-gray-700 font-semibold py-2 hover:text-green-700 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNav("testimonials");
                    }}
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="block text-gray-700 font-semibold py-2 hover:text-green-700 transition"
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNav("contact");
                    }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
              <div className="mt-8 pt-6 border-t border-green-100">
                <a href="tel:+917702274599" className="text-sm text-green-800 font-medium mb-4">
                  📞 Call: +91 7702274599
                </a>
                <a
                  href="#contact"
                  className="block text-center bg-green-700 text-white px-4 py-3 rounded-full text-sm font-semibold hover:bg-green-800 transition"
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNav("contact");
                  }}
                >
                  Get Quote
                </a>
              </div>
            </nav>
          </div>
        </div>
      </nav>

      <div className="max-w-svw overflow-hidden">
        {/* Hero Section */}
        <section id="home" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-green-800 via-emerald-800 to-green-900" />
          <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-green-500/20 blur-3xl" />
          <div className="absolute -left-40 -bottom-40 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
          <div className="relative container mx-auto px-6 py-28 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white" data-aos="fade-right">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs tracking-wide mb-6">
                  <span className="h-2 w-2 rounded-full bg-lime-300" />
                  Farm‑fresh goodness • Daily harvests
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                  Farmhouse delights for a healthier table
                </h2>
                <p className="text-base sm:text-lg text-green-100 mb-8 max-w-xl">
                  We provide hens, eggs, cow milk, and quality meat from
                  ethically raised animals. Pure, nutritious, and always fresh.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#services"
                    className="bg-white text-green-800 px-8 py-3 rounded-full font-semibold hover:bg-green-100 transition"
                  >
                    Explore Products
                  </a>
                  <a
                    href="#contact"
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-green-800 transition"
                  >
                    Contact Us
                  </a>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-6 max-w-md">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">50+</div>
                    <div className="text-green-200 text-xs sm:text-sm">
                      Years farming
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">100%</div>
                    <div className="text-green-200 text-xs sm:text-sm">
                      Natural feed
                    </div>
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-bold">1.2k</div>
                    <div className="text-green-200 text-xs sm:text-sm">
                      Happy families
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative" data-aos="zoom-in">
                <div className="bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl">
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="rounded-xl sm:rounded-2xl bg-white/10 p-4 sm:p-6 text-white">
                      <div className="text-4xl mb-3">🥚</div>
                      <div className="font-bold">Daily Eggs</div>
                      <div className="text-green-200 text-sm">
                        Collected every morning
                      </div>
                    </div>
                    <div className="rounded-xl sm:rounded-2xl bg-white/10 p-4 sm:p-6 text-white">
                      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                        🥛
                      </div>
                      <div className="font-bold text-sm sm:text-base">
                        Cow Milk
                      </div>
                      <div className="text-green-200 text-xs sm:text-sm">
                        Pure & creamy
                      </div>
                    </div>
                    <div className="rounded-xl sm:rounded-2xl bg-white/10 p-4 sm:p-6 text-white">
                      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                        🐔
                      </div>
                      <div className="font-bold text-sm sm:text-base">
                        Healthy Hens
                      </div>
                      <div className="text-green-200 text-xs sm:text-sm">
                        Free‑range raised
                      </div>
                    </div>
                    <div className="rounded-xl sm:rounded-2xl bg-white/10 p-4 sm:p-6 text-white">
                      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                        🥩
                      </div>
                      <div className="font-bold text-sm sm:text-base">
                        Quality Meat
                      </div>
                      <div className="text-green-200 text-xs sm:text-sm">
                        Ethically sourced
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white text-green-900 px-3 py-2 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl shadow-xl text-xs sm:text-sm font-semibold">
                  <span className="hidden sm:inline">
                    Open daily • Farm pickup & delivery
                  </span>
                  <span className="sm:hidden">Daily pickup</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services/Products Section */}
        <section id="services" className="py-20 px-6" data-aos="fade-up">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <h3 className="text-xs uppercase tracking-[0.3em] text-green-700 font-semibold mb-3">
                Our Products
              </h3>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-green-950">
                Fresh farm goods, beautifully raised
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto">
                From sunrise to sunset, we harvest, care, and deliver products
                that are cleaner, tastier, and better for your family.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`group relative overflow-hidden bg-linear-to-br ${product.bgGradient} p-6 sm:p-8 rounded-2xl sm:rounded-3xl border ${product.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3`}
                  data-aos="fade-up"
                  data-aos-delay={product.delay}
                >
                  <div
                    className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br ${product.glowFrom} ${product.glowTo} rounded-full blur-2xl -mr-8 -mt-8`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`text-5xl sm:text-6xl mb-4 sm:mb-6 inline-block p-3 sm:p-4 ${product.iconBg} rounded-xl sm:rounded-2xl shadow-md`}
                    >
                      {product.emoji}
                    </div>
                    <span
                      className={`text-xs font-bold ${product.badgeText} ${product.badgeBg} px-3 py-1 rounded-full inline-block`}
                    >
                      {product.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-5 mb-2 sm:mb-3 text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-5">
                      {product.description}
                    </p>
                    <a
                      href="tel:+917702274599"

                      type="button"
                      onClick={() => {
                        window.location.href = `tel:+917702274599`
                        // openOrder({ title: product.title })
                      }

                      }
                      className={`mt-6 ${product.ctaColor} font-bold text-sm group-hover:translate-x-2 transition inline-flex items-center gap-1`}
                    >
                      <span>{product.cta}</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h3 className="text-xs uppercase tracking-[0.3em] text-green-700 font-semibold mb-3">
                  About us
                </h3>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-green-950 mb-4 sm:mb-6">
                  Rooted in tradition, refined by care
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">
                  Our farmhouse has served the community for over five decades.
                  We grow with nature, not against it — ensuring our animals
                  thrive and our products remain pure and nourishing.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">🌿</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">
                        Organic & Natural
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">
                        No synthetic additives, no shortcuts — just clean
                        nutrition.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">🚜</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">
                        Farm Fresh Daily
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">
                        Harvested and delivered on the same day.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">🧡</span>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1 text-sm sm:text-base">
                        Ethical Practices
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">
                        Open pasture, gentle handling, and stress‑free care.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative" data-aos="fade-left">
                <div className="rounded-3xl h-96 relative overflow-hidden group">
                  {/* Main Slider Container */}
                  <div className="relative w-full h-full">
                    {sliderImages.map((image, index) => (
                      <div
                        key={image.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${index === currentImageIndex
                          ? "opacity-100"
                          : "opacity-0"
                          }`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover rounded-3xl shadow-lg"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Previous Button */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Previous image"
                  >
                    <span className="text-lg sm:text-xl">‹</span>
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-900 rounded-full p-2 sm:p-3 shadow-lg transition-all opacity-0 group-hover:opacity-100"
                    aria-label="Next image"
                  >
                    <span className="text-lg sm:text-xl">›</span>
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                    {sliderImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`h-2 rounded-full transition-all ${index === currentImageIndex
                          ? "bg-white w-8"
                          : "bg-white/50 w-2 hover:bg-white/75"
                          }`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Info Badges */}
                <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white shadow-lg rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="text-xs sm:text-sm text-green-700 font-semibold">
                    Farm-to-table
                  </div>
                  <div className="text-lg sm:text-2xl font-extrabold text-green-950">
                    Always fresh
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 bg-white shadow-lg rounded-xl sm:rounded-2xl p-3 sm:p-5">
                  <div className="text-xs sm:text-sm text-green-700 font-semibold">
                    Daily pickups
                  </div>
                  <div className="text-lg sm:text-2xl font-extrabold text-green-950">
                    7 AM – 6 PM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 px-6 bg-white" data-aos="fade-up">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-xs uppercase tracking-[0.3em] text-green-700 font-semibold mb-3">
                Farm videos
              </h3>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-green-950">
                See the farm in action
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mt-4 max-w-2xl mx-auto">
                Take a quick tour of our fields, barns, and daily care routines.
              </p>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* Main Video - Larger on desktop */}
              <div className="lg:col-span-2" data-aos="fade-right" data-aos-delay="50">
                <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl border border-green-100 hover:shadow-green-200/50 transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-linear-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover aspect-video"
                    muted
                    playsInline
                    loop
                    preload="metadata"
                    poster="Farm_image.png"
                  >
                    <source src="farm-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl z-20">
                    <p className="text-sm font-bold text-green-900">Farm Overview</p>
                  </div>
                </div>
              </div>

              {/* Side Videos */}
              <div className="lg:col-span-1 flex flex-col gap-6 lg:gap-8">
                {/* Video 2 */}
                <div data-aos="fade-left" data-aos-delay="150">
                  <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-green-100 hover:shadow-green-200/50 transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-linear-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                    <video
                      className="w-full h-full object-cover aspect-video"
                      // ref={videoRef}
                      muted
                      playsInline
                      loop
                      autoPlay
                      preload="metadata"
                      // poster="chins.png"
                      // onMouseEnter={(e) => e.currentTarget.play()}
                      // onMouseLeave={(e) => e.currentTarget.pause()}
                    >
                      <source src="chins.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg z-20">
                      <p className="text-xs font-bold text-green-900">Chiks Care</p>
                    </div>
                  </div>
                </div>

                {/* Video 3 */}
                <div data-aos="fade-left" data-aos-delay="250">
                  <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-green-100 hover:shadow-green-200/50 transition-all duration-300 hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-linear-to-t from-green-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />
                    <video
                      className="w-full h-full object-cover aspect-video"
                      // ref={videoRef}
                      muted
                      playsInline
                      loop
                      autoPlay
                      preload="metadata"
                      // poster="punju.png"
                      // onMouseEnter={(e) => e.currentTarget.play()}
                      // onMouseLeave={(e) => e.currentTarget.pause()}
                    >
                      <source src="punju.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg z-20">
                      <p className="text-xs font-bold text-green-900">Hens care</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          className="py-20 px-6 bg-linear-to-b from-white to-green-50"
          data-aos="fade-up"
        >
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-xs uppercase tracking-[0.3em] text-green-700 font-semibold mb-3">
                Why choose us
              </h3>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-green-950">
                The farmhouse difference
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature) => (
                <div
                  key={feature.id}
                  className={`group relative overflow-hidden bg-linear-to-br ${feature.bgGradient} p-6 sm:p-8 rounded-2xl sm:rounded-3xl border ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3`}
                  data-aos="fade-up"
                  data-aos-delay={feature.delay}
                >
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br ${feature.glowFrom} ${feature.glowTo} rounded-full blur-2xl -mr-8 -mt-8`}
                  />
                  <div className="relative z-10">
                    <div className="text-5xl sm:text-6xl mb-3 sm:mb-4 inline-block">
                      {feature.emoji}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="py-24 px-6 bg-linear-to-b from-white via-green-50 to-white"
          data-aos="fade-up"
        >
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h3 className="text-xs uppercase tracking-[0.3em] text-green-700 font-semibold mb-3">
                  Testimonials
                </h3>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-green-950 mb-4 sm:mb-6">
                  Real stories from real families
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-lg">
                  Neighbors choose us for clean feed, gentle care, and products
                  that taste like home. Here’s what they say after their first
                  delivery.
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-sm">
                  <div className="rounded-xl sm:rounded-2xl bg-white border border-green-100 p-3 sm:p-5 shadow-sm">
                    <div className="text-xl sm:text-2xl font-extrabold text-green-900">
                      4.9
                    </div>
                    <div className="text-xs sm:text-sm text-green-700 font-semibold">
                      Average rating
                    </div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white border border-green-100 p-3 sm:p-5 shadow-sm">
                    <div className="text-xl sm:text-2xl font-extrabold text-green-900">
                      1.2k
                    </div>
                    <div className="text-xs sm:text-sm text-green-700 font-semibold">
                      Happy families
                    </div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white border border-green-100 p-3 sm:p-5 shadow-sm">
                    <div className="text-xl sm:text-2xl font-extrabold text-green-900">
                      24h
                    </div>
                    <div className="text-xs sm:text-sm text-green-700 font-semibold">
                      Fresh delivery
                    </div>
                  </div>
                  <div className="rounded-xl sm:rounded-2xl bg-white border border-green-100 p-3 sm:p-5 shadow-sm">
                    <div className="text-xl sm:text-2xl font-extrabold text-green-900">
                      100%
                    </div>
                    <div className="text-xs sm:text-sm text-green-700 font-semibold">
                      Natural feed
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6" data-aos="fade-left">
                {testimonials.map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className={`group relative overflow-hidden bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${index === 1 ? "md:ml-6" : ""
                      } ${index === 2 ? "md:ml-12" : ""}`}
                    data-aos="fade-up"
                    data-aos-delay={testimonial.delay}
                  >
                    <div
                      className={`absolute top-0 left-0 w-1.5 h-full bg-linear-to-b ${testimonial.accentColor} to-transparent`}
                    />
                    <div
                      className={`absolute -top-10 -right-10 w-28 h-28 bg-linear-to-br ${testimonial.glowFrom} to-transparent rounded-full blur-2xl`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4 sm:mb-5">
                        <div className="flex items-center">
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br ${testimonial.avatarBg} rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-2xl mr-3 sm:mr-4 shadow-sm`}
                          >
                            {testimonial.avatar}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                              {testimonial.name}
                            </h4>
                            <div className="text-yellow-400 text-xs sm:text-sm">
                              ★★★★★
                            </div>
                          </div>
                        </div>
                        <div className="text-[0.65rem] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-green-700 font-semibold">
                          Verified
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        “{testimonial.quote}”
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-xs uppercase tracking-[0.3em] text-green-700 font-semibold mb-3">
                Get in touch
              </h3>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-green-950">
                Let’s talk fresh deliveries
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                  Visit Our Farm
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">📍</span>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                        Address
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">
                        Jarravari Palle, Tarigonda Road
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">📞</span>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                        Phone
                      </h4>
                      <a href="tel:+917702274599" className="text-sm sm:text-base text-gray-600">
                        +91 7702274599
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">✉️</span>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                        Email
                      </h4>
                      <a href="mailto:sujathafarms114@gmail.com" className="text-sm sm:text-base text-gray-600">
                        sujathafarms114@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="text-xl sm:text-2xl">⏰</span>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm sm:text-base">
                        Hours
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600">
                        Morning 5:00 AM to Evening 8:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-aos="fade-left"
                className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-green-100 shadow-sm"
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
                  Send us a Message
                </h3>
                <form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  suppressHydrationWarning
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    suppressHydrationWarning
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    suppressHydrationWarning
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your Message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                    suppressHydrationWarning
                  ></textarea>

                  {submitStatus === "success" && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm">
                      ✓ Message sent successfully! We'll get back to you soon.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl text-sm">
                      ✗ Something went wrong. Please try again.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    suppressHydrationWarning
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Order Modal */}
      {isOrderOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={closeOrder}
        >
          <div
            className="w-full max-h-screen overflow-auto max-w-2xl rounded-3xl bg-white shadow-2xl border border-green-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-green-100">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-green-950">
                  Complete your order
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Product: {selectedProduct?.title}
                </p>
              </div>
              <button
                onClick={closeOrder}
                className="text-2xl text-gray-500 hover:text-gray-700"
                aria-label="Close order form"
              >
                ✕
              </button>
            </div>

            <form className="px-6 py-6 space-y-4" onSubmit={handleOrderSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min={1}
                    value={orderForm.quantity}
                    onChange={handleOrderChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment method
                  </label>
                  <select
                    name="paymentMethod"
                    value={orderForm.paymentMethod}
                    onChange={handleOrderChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-500"
                    required
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="upi">UPI</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={orderForm.name}
                    onChange={handleOrderChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={orderForm.mobile}
                    onChange={handleOrderChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={orderForm.address}
                  onChange={handleOrderChange}
                  rows={3}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              {orderForm.paymentMethod === "upi" && (
                <div className="rounded-2xl border border-green-100 bg-green-50/50 p-4">
                  <div className="text-sm font-semibold text-green-800 mb-3">
                    Scan to pay (UPI)
                  </div>
                  <div className="flex  flex-col gap-4 items-start">
                    <img
                      src="upi-qr.png"
                      alt="UPI QR code"
                      className="h-40 w-40 rounded-xl border border-green-100 bg-white object-contain"
                    />
                    <div className="  w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        UTR number
                      </label>
                      <input
                        type="text"
                        name="utr"
                        value={orderForm.utr}
                        onChange={handleOrderChange}
                        className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:border-green-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {orderStatus === "success" && (
                <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  ✓ Order placed successfully!
                </div>
              )}

              {orderStatus === "error" && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  ✗ Please complete all required fields.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={closeOrder}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-green-700 px-6 py-3 text-sm font-semibold text-white hover:bg-green-800"
                >
                  Submit order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-950 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src="logo.svg" alt="Fresh Farm Logo" className="w-15" />
              <p className="text-green-200">
                Sujatha Farm
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-green-200">
                <li>
                  <a href="#home" className="hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white">
                    Products
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Our Products</h4>
              <ul className="space-y-2 text-green-200">
                <li>
                  <button
                    onClick={() => {
                      window.location.href = `tel:+917702274599`
                      // openOrder({ title: "Fresh Eggs" })
                    }}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Fresh Eggs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.location.href = `tel:+917702274599`
                      // openOrder({ title: "Farm Hens" })
                    }}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Farm Hens
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.location.href = `tel:+917702274599`
                      // openOrder({ title: "Cow Milk" })
                    }}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Cow Milk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      window.location.href = `tel:+917702274599`
                      // openOrder({ title: "Quality Meat" })
                    }}
                    className="hover:text-white transition cursor-pointer"
                  >
                    Quality Meat
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-green-200 mb-4">
                Subscribe to get updates on fresh products and special offers.
              </p>

              <button
                className="w-full bg-green-700 px-4 py-2 rounded hover:bg-green-600 transition"
                suppressHydrationWarning
                onClick={() => {
                  window.location.href = "https://www.youtube.com/@SujathaFarms-Official";
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
          <div className="border-t border-green-800 pt-8 text-center text-green-200">
            <p>© {new Date().getFullYear()} Fresh Farm. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

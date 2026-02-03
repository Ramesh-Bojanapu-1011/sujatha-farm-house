"use client";

import { useEffect, useState } from "react";
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
      name: "John Smith",
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
      name: "Sarah Johnson",
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
      name: "Michael Brown",
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

  if (typeof window != "undefined") {
    return null;
  }

  return (
    <div className="min-h-screen max-w-svw overflow-hidden bg-[#f8fbf7] text-gray-900">
      {/* Header/Navigation */}
      <nav
        className="bg-white/80 backdrop-blur-md border-b border-green-100 py-4 px-6 sticky top-0 z-50"
        data-aos="fade-down"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-green-600 to-emerald-700 text-white flex items-center justify-center font-bold">
              FF
            </div>
            <h1 className="text-2xl font-extrabold text-green-900">
              Fresh Farm
            </h1>
          </div>
          <ul className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <li>
              <a href="#home" className="hover:text-green-700">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-green-700">
                Products
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-green-700">
                About
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-green-700">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-green-700">
                Contact
              </a>
            </li>
          </ul>
          <div className="hidden md:flex items-center gap-3">
            <span className="text-sm text-green-800 font-medium">
              Call: +1 (555) 123‑4567
            </span>
            <a
              href="#contact"
              className="bg-green-700 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-green-800 transition"
            >
              Get Quote
            </a>
          </div>
          <button className="md:hidden text-2xl">☰</button>
        </div>
      </nav>

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
              <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Farmhouse delights for a healthier table
              </h2>
              <p className="text-lg text-green-100 mb-8 max-w-xl">
                We provide hens, eggs, cow milk, and quality meat from ethically
                raised animals. Pure, nutritious, and always fresh.
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
              <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-green-200 text-sm">Years farming</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">100%</div>
                  <div className="text-green-200 text-sm">Natural feed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">1.2k</div>
                  <div className="text-green-200 text-sm">Happy families</div>
                </div>
              </div>
            </div>
            <div className="relative" data-aos="zoom-in">
              <div className="bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white/10 p-6 text-white">
                    <div className="text-4xl mb-3">🥚</div>
                    <div className="font-bold">Daily Eggs</div>
                    <div className="text-green-200 text-sm">
                      Collected every morning
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6 text-white">
                    <div className="text-4xl mb-3">🥛</div>
                    <div className="font-bold">Cow Milk</div>
                    <div className="text-green-200 text-sm">Pure & creamy</div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6 text-white">
                    <div className="text-4xl mb-3">🐔</div>
                    <div className="font-bold">Healthy Hens</div>
                    <div className="text-green-200 text-sm">
                      Free‑range raised
                    </div>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-6 text-white">
                    <div className="text-4xl mb-3">🥩</div>
                    <div className="font-bold">Quality Meat</div>
                    <div className="text-green-200 text-sm">
                      Ethically sourced
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white text-green-900 px-5 py-3 rounded-2xl shadow-xl text-sm font-semibold">
                Open daily • Farm pickup & delivery
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
            <h2 className="text-4xl font-extrabold text-green-950">
              Fresh farm goods, beautifully raised
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              From sunrise to sunset, we harvest, care, and deliver products
              that are cleaner, tastier, and better for your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className={`group relative overflow-hidden bg-linear-to-br ${product.bgGradient} p-8 rounded-3xl border ${product.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3`}
                data-aos="fade-up"
                data-aos-delay={product.delay}
              >
                <div
                  className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-br ${product.glowFrom} ${product.glowTo} rounded-full blur-2xl -mr-8 -mt-8`}
                />
                <div className="relative z-10">
                  <div
                    className={`text-6xl mb-6 inline-block p-4 ${product.iconBg} rounded-2xl shadow-md`}
                  >
                    {product.emoji}
                  </div>
                  <span
                    className={`text-xs font-bold ${product.badgeText} ${product.badgeBg} px-3 py-1 rounded-full inline-block`}
                  >
                    {product.badge}
                  </span>
                  <h3 className="text-2xl font-bold mt-5 mb-3 text-gray-900">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <div
                    className={`mt-6 ${product.ctaColor} font-bold text-sm group-hover:translate-x-2 transition inline-flex items-center gap-1`}
                  >
                    <span>{product.cta}</span>
                    <span>→</span>
                  </div>
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
              <h2 className="text-4xl font-extrabold text-green-950 mb-6">
                Rooted in tradition, refined by care
              </h2>
              <p className="text-gray-600 mb-6">
                Our farmhouse has served the community for over five decades. We
                grow with nature, not against it — ensuring our animals thrive
                and our products remain pure and nourishing.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      Organic & Natural
                    </h4>
                    <p className="text-gray-600">
                      No synthetic additives, no shortcuts — just clean
                      nutrition.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🚜</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      Farm Fresh Daily
                    </h4>
                    <p className="text-gray-600">
                      Harvested and delivered on the same day.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">🧡</span>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">
                      Ethical Practices
                    </h4>
                    <p className="text-gray-600">
                      Open pasture, gentle handling, and stress‑free care.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="rounded-3xl h-96">
                <img
                  src="Farm_image.png"
                  alt="Farm Image"
                  className="w-full h-full object-cover rounded-3xl shadow-lg"
                />
              </div>
              <div className="absolute top-8 left-8 bg-white shadow-lg rounded-2xl p-5">
                <div className="text-sm text-green-700 font-semibold">
                  Farm-to-table
                </div>
                <div className="text-2xl font-extrabold text-green-950">
                  Always fresh
                </div>
              </div>
              <div className="absolute bottom-8 right-8 bg-white shadow-lg rounded-2xl p-5">
                <div className="text-sm text-green-700 font-semibold">
                  Daily pickups
                </div>
                <div className="text-2xl font-extrabold text-green-950">
                  7 AM – 6 PM
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
            <h2 className="text-4xl font-extrabold text-green-950">
              The farmhouse difference
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`group relative overflow-hidden bg-linear-to-br ${feature.bgGradient} p-8 rounded-3xl border ${feature.borderColor} shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3`}
                data-aos="fade-up"
                data-aos-delay={feature.delay}
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-linear-to-br ${feature.glowFrom} ${feature.glowTo} rounded-full blur-2xl -mr-8 -mt-8`}
                />
                <div className="relative z-10">
                  <div className="text-6xl mb-4 inline-block">
                    {feature.emoji}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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
              <h2 className="text-4xl font-extrabold text-green-950 mb-6">
                Real stories from real families
              </h2>
              <p className="text-gray-600 mb-8 max-w-lg">
                Neighbors choose us for clean feed, gentle care, and products
                that taste like home. Here’s what they say after their first
                delivery.
              </p>
              <div className="grid grid-cols-2 gap-6 max-w-sm">
                <div className="rounded-2xl bg-white border border-green-100 p-5 shadow-sm">
                  <div className="text-2xl font-extrabold text-green-900">
                    4.9
                  </div>
                  <div className="text-sm text-green-700 font-semibold">
                    Average rating
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-green-100 p-5 shadow-sm">
                  <div className="text-2xl font-extrabold text-green-900">
                    1.2k
                  </div>
                  <div className="text-sm text-green-700 font-semibold">
                    Happy families
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-green-100 p-5 shadow-sm">
                  <div className="text-2xl font-extrabold text-green-900">
                    24h
                  </div>
                  <div className="text-sm text-green-700 font-semibold">
                    Fresh delivery
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-green-100 p-5 shadow-sm">
                  <div className="text-2xl font-extrabold text-green-900">
                    100%
                  </div>
                  <div className="text-sm text-green-700 font-semibold">
                    Natural feed
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6" data-aos="fade-left">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`group relative overflow-hidden bg-white p-7 sm:p-8 rounded-3xl border border-gray-100 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${index === 1 ? "sm:ml-6" : ""
                    } ${index === 2 ? "sm:ml-12" : ""}`}
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
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center">
                        <div
                          className={`w-14 h-14 bg-linear-to-br ${testimonial.avatarBg} rounded-2xl flex items-center justify-center text-2xl mr-4 shadow-sm`}
                        >
                          {testimonial.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {testimonial.name}
                          </h4>
                          <div className="text-yellow-400 text-sm">★★★★★</div>
                        </div>
                      </div>
                      <div className="text-xs uppercase tracking-[0.2em] text-green-700 font-semibold">
                        Verified
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
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
            <h2 className="text-4xl font-extrabold text-green-950">
              Let’s talk fresh deliveries
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Visit Our Farm
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-bold text-gray-800">Address</h4>
                    <p className="text-gray-600">
                      Jarravari Palli, Pattanmitter Mandal.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h4 className="font-bold text-gray-800">Phone</h4>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <h4 className="font-bold text-gray-800">Email</h4>
                    <p className="text-gray-600">info@freshfarm.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <h4 className="font-bold text-gray-800">Hours</h4>
                    <p className="text-gray-600">
                      Mon-Sat: 7:00 AM - 6:00 PM
                      <br />
                      Sunday: 8:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              data-aos="fade-left"
              className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Send us a Message
              </h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
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
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Fresh Farm</h3>
              <p className="text-green-200">
                Providing farmhouse‑fresh products to our community since 1970.
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
                <li>Fresh Eggs</li>
                <li>Farm Hens</li>
                <li>Cow Milk</li>
                <li>Quality Meat</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-green-200 mb-4">
                Subscribe to get updates on fresh products and special offers.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded text-gray-800 mb-2"
              />
              <button className="w-full bg-green-700 px-4 py-2 rounded hover:bg-green-600 transition">
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

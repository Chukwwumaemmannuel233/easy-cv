"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Moon,
  Sun,
  Github,
  Twitter,
  ExternalLink,
  Layout,
  Palette,
  Check,
} from "lucide-react"
import html2canvas from "html2canvas"
import { QRCodeSVG } from "qrcode.react"

// Define design themes
const designThemes = [
  {
    id: "modern",
    name: "Modern Professional",
    colors: {
      primary: "#2563eb",
      secondary: "#7c3aed",
      accent: "#f472b6",
      bgLight: "#ffffff",
      bgDark: "#1a1a1a",
      headerGradient: "from-blue-600 via-purple-500 to-pink-500",
      cardBgLight: "bg-gray-50",
      cardBgDark: "bg-gray-800/80",
    },
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    colors: {
      primary: "#0ea5e9",
      secondary: "#14b8a6",
      accent: "#22d3ee",
      bgLight: "#f8fafc",
      bgDark: "#0f172a",
      headerGradient: "from-cyan-500 to-blue-500",
      cardBgLight: "bg-white",
      cardBgDark: "bg-slate-800/90",
    },
  },
  {
    id: "bold",
    name: "Bold Creative",
    colors: {
      primary: "#f97316",
      secondary: "#ec4899",
      accent: "#eab308",
      bgLight: "#fffbeb",
      bgDark: "#27272a",
      headerGradient: "from-orange-500 via-pink-500 to-yellow-500",
      cardBgLight: "bg-amber-50",
      cardBgDark: "bg-zinc-800/80",
    },
  },
  {
    id: "elegant",
    name: "Elegant Dark",
    colors: {
      primary: "#6d28d9",
      secondary: "#db2777",
      accent: "#8b5cf6",
      bgLight: "#f5f3ff",
      bgDark: "#18181b",
      headerGradient: "from-violet-600 via-purple-600 to-fuchsia-600",
      cardBgLight: "bg-violet-50",
      cardBgDark: "bg-zinc-900/90",
    },
  },
  {
    id: "nature",
    name: "Natural Green",
    colors: {
      primary: "#16a34a",
      secondary: "#0d9488",
      accent: "#84cc16",
      bgLight: "#f0fdf4",
      bgDark: "#1c1917",
      headerGradient: "from-green-600 via-emerald-500 to-lime-500",
      cardBgLight: "bg-green-50",
      cardBgDark: "bg-stone-800/80",
    },
  },
  {
    id: "corporate",
    name: "Corporate Blue",
    colors: {
      primary: "#0369a1",
      secondary: "#1e40af",
      accent: "#0284c7",
      bgLight: "#f0f9ff",
      bgDark: "#0f172a",
      headerGradient: "from-sky-600 via-blue-700 to-sky-500",
      cardBgLight: "bg-sky-50",
      cardBgDark: "bg-slate-900/90",
    },
  },
]

// Define layout variations
const layoutVariations = [
  {
    id: "standard",
    name: "Standard",
    icon: "Layout",
  },
  {
    id: "centered",
    name: "Centered",
    icon: "LayoutTemplate",
  },
  {
    id: "grid",
    name: "Grid",
    icon: "LayoutGrid",
  },
  {
    id: "sidebar",
    name: "Sidebar",
    icon: "PanelLeft",
  },
  {
    id: "cards",
    name: "Cards",
    icon: "LayoutDashboard",
  },
  {
    id: "compact",
    name: "Compact",
    icon: "LayoutList",
  },
]

export default function PortfolioFlyer() {
  const [flyerData, setFlyerData] = useState({
    name: "Ugwu Chukwuma Emmanuel",
    title: "Front-End Developer",
    bio: "Passionate Front-End Developer with expertise in creating responsive, user-centric web applications. Specializing in React and TypeScript, I combine technical excellence with an eye for design to deliver exceptional digital experiences.",
    services: [
      "Modern Frontend Development (React, TypeScript)",
      "Responsive Web Design & Implementation",
      "UI/UX Development with Tailwind CSS",
      "Web Application Architecture & Optimization",
      "Version Control & Collaborative Development",
    ],
    phone: "+234 816 177 0490",
    email: "echukwuma561@gmail.com",
    location: "Enugu, Nigeria",
    instagram: "emmanuel23670",
    twitter: "CEmmanuel25543",
    github: "github.com/Chukwwumaemmannuel233",
    cta: "Ready to bring your web project to life? Let's create something extraordinary together!",
  })

  const [darkMode, setDarkMode] = useState(false)
  const [selectedDesign, setSelectedDesign] = useState("modern")
  const [selectedLayout, setSelectedLayout] = useState("standard")
  const flyerRef = useRef<HTMLDivElement>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [imageFiles, setImageFiles] = useState({
    profile: null as File | null,
    work1: null as File | null,
    work2: null as File | null,
    work3: null as File | null,
  })
  const [imagePreviews, setImagePreviews] = useState({
    profile: "",
    work1: "",
    work2: "",
    work3: "",
  })

  // For project preview modal
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  // Get current theme
  const currentTheme = designThemes.find((theme) => theme.id === selectedDesign) || designThemes[0]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFlyerData((prev) => ({ ...prev, [name]: value }))
  }

  const handleServiceChange = (index: number, value: string) => {
    const updatedServices = [...flyerData.services]
    updatedServices[index] = value
    setFlyerData((prev) => ({ ...prev, services: updatedServices }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof imageFiles) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFiles((prev) => ({ ...prev, [type]: file }))

      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreviews((prev) => ({ ...prev, [type]: event.target?.result as string }))
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const downloadFlyer = async () => {
    if (!flyerRef.current) return

    try {
      const canvas = await html2canvas(flyerRef.current, {
        scale: 3, // Increase scale for better quality
        logging: false,
        backgroundColor: darkMode ? currentTheme.colors.bgDark : currentTheme.colors.bgLight,
        useCORS: true, // Enable CORS for images
      })

      const image = canvas.toDataURL("image/png", 1.0) // Use maximum quality
      const link = document.createElement("a")
      link.href = image
      link.download = `${flyerData.name.replace(/\s+/g, "-").toLowerCase()}-portfolio.png`
      link.click()
    } catch (error) {
      console.error("Error generating flyer:", error)
    }
  }

  const projectImages = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/localhost_3000_-268t4U7vl5qfidb3aSrwqMQdiLH4sW.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/localhost_3001_-iEak6nlNGH5XKpkj6kUxMdX4E5LdAB.png",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-09%20at%2020-55-01%20Vite%20React-dmaqvSX52BwO6kc7dGT5cIf7prghSD.png",
  ]

  const projectTitles = [
    "SecureMatch - Dating Platform UI",
    "GreenLife - Eco E-commerce",
    "CoinShares - Crypto Dashboard",
  ]

  // GitHub profile URL for QR codes
  const githubProfileUrl = `https://${flyerData.github}`

  // Render the appropriate flyer based on selected design and layout
  const renderFlyer = () => {
    // Common elements
    const profileImage = (
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20240707-WA0020.jpg-348qhUn22gjHlSbGRoqukh4lP1u6Ic.jpeg"
        alt={flyerData.name}
        className="w-full h-full object-cover"
        crossOrigin="anonymous"
      />
    )

    const contactInfo = (
      <div className="space-y-3">
        <h3 className={`font-semibold border-b pb-2 flex items-center text-base`}>
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2`}
            style={{ backgroundColor: currentTheme.colors.primary }}
          ></span>
          Contact Information
        </h3>
        <div className="space-y-3 text-base pl-2">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Phone className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
            </div>
            <span>{flyerData.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Mail className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
            </div>
            <span>{flyerData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <MapPin className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
            </div>
            <span>{flyerData.location}</span>
          </div>
        </div>
      </div>
    )

    const socialMedia = (
      <div className="space-y-3">
        <h3 className={`font-semibold border-b pb-2 flex items-center text-base`}>
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2`}
            style={{ backgroundColor: currentTheme.colors.secondary }}
          ></span>
          Social Media
        </h3>
        <div className="space-y-3 text-base pl-2">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Instagram className="h-5 w-5" style={{ color: currentTheme.colors.secondary }} />
            </div>
            <span>@{flyerData.instagram}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Twitter className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
            </div>
            <span>@{flyerData.twitter}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Github className="h-5 w-5" style={{ color: darkMode ? "#e5e7eb" : "#374151" }} />
            </div>
            <span>{flyerData.github.replace("github.com/", "")}</span>
          </div>
        </div>
      </div>
    )

    const githubQR = (
      <div className="flex flex-col items-center pt-2">
        <p className="text-sm font-medium mb-2">Scan to view my GitHub</p>
        <div className={`p-2 rounded-lg bg-white`}>
          <QRCodeSVG
            value={githubProfileUrl}
            size={100}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
            includeMargin={false}
          />
        </div>
      </div>
    )

    const featuredProjects = (
      <div>
        <h2 className="text-xl font-bold mb-4 pb-2 border-b flex items-center">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom right, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
            }}
          >
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="ml-2">Featured Projects</span>
        </h2>

        <div
          className="mb-2 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: darkMode ? `${currentTheme.colors.primary}30` : `${currentTheme.colors.primary}10`,
          }}
        >
          <p className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" />
            <span>
              View all projects at:{" "}
              <a
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: currentTheme.colors.primary }}
              >
                {githubProfileUrl}
              </a>
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="group relative aspect-video rounded-lg overflow-hidden border shadow-md cursor-pointer"
              style={{ borderColor: darkMode ? "#374151" : "#e5e7eb" }}
              onClick={() => setSelectedProject(index)}
            >
              <img
                src={projectImages[index] || "/placeholder.svg"}
                alt={projectTitles[index]}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-3">
                <div className="text-white text-center">
                  <p className="text-sm font-medium">{projectTitles[index]}</p>
                  <p className="text-xs mt-1 opacity-80">View at: myportfolio.com</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )

    const technicalExpertise = (
      <div>
        <h2 className="text-xl font-bold mb-4 pb-2 border-b flex items-center">
          <div
            className="w-6 h-6 rounded flex items-center justify-center"
            style={{
              background: `linear-gradient(to bottom right, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
            }}
          >
            <span className="text-white text-xs">✓</span>
          </div>
          <span className="ml-2">Technical Expertise</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div
            className={`p-4 rounded-lg border-l-4 shadow-md`}
            style={{
              backgroundColor: darkMode ? `${currentTheme.colors.primary}20` : `${currentTheme.colors.primary}05`,
              borderLeftColor: currentTheme.colors.primary,
            }}
          >
            <h3 className="font-semibold mb-2 text-base" style={{ color: currentTheme.colors.primary }}>
              Core Technologies
            </h3>
            <ul className="space-y-1 text-base">
              <li className="flex items-center">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: currentTheme.colors.primary }}
                ></span>
                <span>HTML5, CSS3, JavaScript (ES6+)</span>
              </li>
              <li className="flex items-center">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: currentTheme.colors.primary }}
                ></span>
                <span>React.js & TypeScript</span>
              </li>
              <li className="flex items-center">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: currentTheme.colors.primary }}
                ></span>
                <span>Tailwind CSS</span>
              </li>
            </ul>
          </div>
          <div
            className={`p-4 rounded-lg border-l-4 shadow-md`}
            style={{
              backgroundColor: darkMode ? `${currentTheme.colors.secondary}20` : `${currentTheme.colors.secondary}05`,
              borderLeftColor: currentTheme.colors.secondary,
            }}
          >
            <h3 className="font-semibold mb-2 text-base" style={{ color: currentTheme.colors.secondary }}>
              Development Tools
            </h3>
            <ul className="space-y-1 text-base">
              <li className="flex items-center">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: currentTheme.colors.secondary }}
                ></span>
                <span>Git & GitHub</span>
              </li>
              <li className="flex items-center">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: currentTheme.colors.secondary }}
                ></span>
                <span>Scrum & Jira</span>
              </li>
              <li className="flex items-center">
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: currentTheme.colors.secondary }}
                ></span>
                <span>UI/UX Development</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )

    const callToAction = (
      <div
        className={`mt-4 p-5 rounded-lg text-center relative overflow-hidden shadow-md`}
        style={{
          background: darkMode
            ? `linear-gradient(to right, ${currentTheme.colors.primary}30, ${currentTheme.colors.secondary}30)`
            : `linear-gradient(to right, ${currentTheme.colors.primary}10, ${currentTheme.colors.secondary}10)`,
        }}
      >
        {/* Decorative elements */}
        <div
          className="absolute top-0 right-0 w-16 h-16 rounded-full -translate-y-1/2 translate-x-1/2 opacity-20"
          style={{ backgroundColor: currentTheme.colors.primary }}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-12 h-12 rounded-full translate-y-1/2 -translate-x-1/2 opacity-20"
          style={{ backgroundColor: currentTheme.colors.secondary }}
        ></div>

        <h3
          className="text-xl font-bold mb-2 relative z-10"
          style={{
            background: `linear-gradient(to right, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {flyerData.cta}
        </h3>
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-3 relative z-10">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Mail className="h-5 w-5" style={{ color: currentTheme.colors.primary }} />
            </div>
            <span className="font-medium text-base">{flyerData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <Github className="h-5 w-5" style={{ color: currentTheme.colors.secondary }} />
            </div>
            <a
              href={githubProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-base hover:underline"
              style={{ color: "inherit" }}
            >
              {flyerData.github}
            </a>
          </div>
        </div>
      </div>
    )

    const footer = (
      <>
        <div
          className={`py-4 px-6 text-center border-t`}
          style={{
            backgroundColor: darkMode ? `${currentTheme.colors.primary}30` : `${currentTheme.colors.primary}10`,
            borderColor: darkMode ? `${currentTheme.colors.primary}50` : `${currentTheme.colors.primary}30`,
          }}
        >
          <p className="font-bold text-base mb-1">View Interactive Portfolio:</p>
          <p
            className="text-lg font-mono py-2 px-4 rounded-md inline-block border"
            style={{
              backgroundColor: darkMode ? "#1f2937" : "#ffffff",
              borderColor: darkMode ? `${currentTheme.colors.primary}50` : `${currentTheme.colors.primary}30`,
            }}
          >
            myportfolio.com
          </p>
          <p className="text-sm mt-2" style={{ color: darkMode ? "#9ca3af" : "#4b5563" }}>
            Visit the URL above to see my interactive portfolio with project demos
          </p>
        </div>
        <div
          className={`py-3 px-8 text-center text-sm`}
          style={{
            background: `linear-gradient(to right, ${currentTheme.colors.primary}20, ${currentTheme.colors.secondary}20)`,
          }}
        >
          <p className="font-medium">
            © {new Date().getFullYear()} {flyerData.name} | Professional {flyerData.title}
          </p>
        </div>
      </>
    )

    // Different layouts
    switch (selectedLayout) {
      case "standard":
        return (
          <>
            {/* Decorative header */}
            <div className={`h-10 bg-gradient-to-r ${currentTheme.colors.headerGradient}`}></div>

            <div className="grid md:grid-cols-3 gap-6 p-6 relative">
              {/* Decorative elements */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-20"
                style={{ backgroundColor: currentTheme.colors.primary }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl opacity-20"
                style={{ backgroundColor: currentTheme.colors.secondary }}
              ></div>

              {/* Left Column - Profile */}
              <div className="space-y-6 relative">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 relative z-10 shadow-lg"
                    style={{ borderColor: currentTheme.colors.primary }}
                  >
                    {profileImage}
                    {/* Decorative ring */}
                    <div
                      className="absolute inset-0 border-4 rounded-full scale-110 opacity-50"
                      style={{ borderColor: currentTheme.colors.secondary }}
                    ></div>
                  </div>

                  <h1 className="text-2xl font-bold relative z-10 mb-1">{flyerData.name}</h1>
                  <div className="relative">
                    <p className="text-lg font-medium relative z-10" style={{ color: currentTheme.colors.primary }}>
                      {flyerData.title}
                    </p>
                    <div
                      className="absolute -bottom-1 left-0 right-0 h-3 -skew-y-1 -z-0 opacity-20"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div
                    className={`p-4 rounded-lg border-l-4 shadow-md`}
                    style={{
                      backgroundColor: darkMode
                        ? `${currentTheme.colors.primary}10`
                        : `${currentTheme.colors.primary}05`,
                      borderLeftColor: currentTheme.colors.primary,
                    }}
                  >
                    <p className="text-base leading-relaxed">{flyerData.bio}</p>
                  </div>

                  {contactInfo}
                  {socialMedia}
                  {githubQR}
                </div>
              </div>

              {/* Right Column - Work & Services */}
              <div className="md:col-span-2 space-y-6">
                {featuredProjects}
                {technicalExpertise}
                {callToAction}
              </div>
            </div>

            {footer}
          </>
        )

      case "centered":
        return (
          <>
            {/* Centered header with profile */}
            <div className={`py-8 bg-gradient-to-r ${currentTheme.colors.headerGradient} relative overflow-hidden`}>
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white blur-2xl"></div>
              </div>

              <div className="flex flex-col items-center justify-center relative z-10 px-6">
                <div
                  className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 shadow-lg bg-white"
                  style={{ borderColor: currentTheme.colors.primary }}
                >
                  {profileImage}
                </div>

                <h1 className="text-3xl font-bold text-white mb-1 text-center">{flyerData.name}</h1>
                <p className="text-xl font-medium text-white mb-4 text-center">{flyerData.title}</p>

                <p className="max-w-2xl text-center text-white/90 mb-6">{flyerData.bio}</p>

                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:${flyerData.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
                  >
                    <Mail className="h-4 w-4" />
                    <span>{flyerData.email}</span>
                  </a>
                  <a
                    href={`tel:${flyerData.phone}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
                  >
                    <Phone className="h-4 w-4" />
                    <span>{flyerData.phone}</span>
                  </a>
                  <a
                    href={`https://github.com/${flyerData.github.replace("github.com/", "")}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition"
                  >
                    <Github className="h-4 w-4" />
                    <span>{flyerData.github.replace("github.com/", "")}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-8">
              {/* Featured Projects */}
              <div className="max-w-4xl mx-auto">{featuredProjects}</div>

              {/* Technical Expertise */}
              <div className="max-w-4xl mx-auto">{technicalExpertise}</div>

              {/* Contact & Social */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                <div className="space-y-4">
                  <h2 className="text-xl font-bold pb-2 border-b flex items-center">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom right, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="ml-2">Contact Me</span>
                  </h2>
                  {contactInfo}
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold pb-2 border-b flex items-center">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center"
                      style={{
                        background: `linear-gradient(to bottom right, ${currentTheme.colors.primary}, ${currentTheme.colors.secondary})`,
                      }}
                    >
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <span className="ml-2">Social Media</span>
                  </h2>
                  {socialMedia}
                  <div className="flex justify-center mt-4">{githubQR}</div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="max-w-4xl mx-auto">{callToAction}</div>
            </div>

            {footer}
          </>
        )

      case "grid":
        return (
          <>
            {/* Header */}
            <div className={`p-6 bg-gradient-to-r ${currentTheme.colors.headerGradient} text-white`}>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-lg flex-shrink-0"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  {profileImage}
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{flyerData.name}</h1>
                  <p className="text-lg md:text-xl opacity-90">{flyerData.title}</p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                      <Mail className="h-3 w-3" />
                      <span>{flyerData.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                      <Phone className="h-3 w-3" />
                      <span>{flyerData.phone}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                      <Github className="h-3 w-3" />
                      <span>{flyerData.github.replace("github.com/", "")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main content in grid */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bio */}
              <div className="md:col-span-3">
                <div
                  className="p-4 rounded-lg shadow-md"
                  style={{
                    backgroundColor: darkMode ? `${currentTheme.colors.primary}10` : `${currentTheme.colors.primary}05`,
                    borderLeft: `4px solid ${currentTheme.colors.primary}`,
                  }}
                >
                  <p className="text-base leading-relaxed">{flyerData.bio}</p>
                </div>
              </div>

              {/* Featured Projects */}
              <div className="md:col-span-2">{featuredProjects}</div>

              {/* Contact & Social */}
              <div className="space-y-6">
                {contactInfo}
                {socialMedia}
                {githubQR}
              </div>

              {/* Technical Expertise */}
              <div className="md:col-span-3">{technicalExpertise}</div>

              {/* Call to Action */}
              <div className="md:col-span-3">{callToAction}</div>
            </div>

            {footer}
          </>
        )

      case "sidebar":
        return (
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div
              className="md:w-1/3 p-6 space-y-6"
              style={{
                backgroundColor: darkMode ? `${currentTheme.colors.primary}15` : `${currentTheme.colors.primary}05`,
              }}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 shadow-lg"
                  style={{ borderColor: currentTheme.colors.primary }}
                >
                  {profileImage}
                </div>

                <h1 className="text-2xl font-bold mb-1">{flyerData.name}</h1>
                <p className="text-lg font-medium mb-4" style={{ color: currentTheme.colors.primary }}>
                  {flyerData.title}
                </p>

                <div
                  className="w-full p-4 rounded-lg shadow-md mb-6"
                  style={{
                    backgroundColor: darkMode ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.8)",
                  }}
                >
                  <p className="text-sm leading-relaxed">{flyerData.bio}</p>
                </div>
              </div>

              {contactInfo}
              {socialMedia}
              {githubQR}
            </div>

            {/* Main content */}
            <div className="md:w-2/3 p-6 space-y-8">
              <div className={`h-8 bg-gradient-to-r ${currentTheme.colors.headerGradient} rounded-md mb-6`}></div>

              {featuredProjects}
              {technicalExpertise}
              {callToAction}

              <div
                className="pt-4 mt-8 border-t"
                style={{ borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
              >
                <p className="font-bold text-base mb-1">View Interactive Portfolio:</p>
                <p
                  className="text-lg font-mono py-2 px-4 rounded-md inline-block border"
                  style={{
                    backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                    borderColor: darkMode ? `${currentTheme.colors.primary}50` : `${currentTheme.colors.primary}30`,
                  }}
                >
                  myportfolio.com
                </p>
                <p className="text-sm mt-2" style={{ color: darkMode ? "#9ca3af" : "#4b5563" }}>
                  Visit the URL above to see my interactive portfolio with project demos
                </p>
              </div>
            </div>
          </div>
        )

      case "cards":
        return (
          <>
            {/* Header */}
            <div className={`p-8 bg-gradient-to-r ${currentTheme.colors.headerGradient} text-white text-center`}>
              <div className="max-w-3xl mx-auto">
                <div
                  className="w-28 h-28 rounded-full overflow-hidden border-4 shadow-lg mx-auto mb-4"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  {profileImage}
                </div>

                <h1 className="text-3xl font-bold mb-2">{flyerData.name}</h1>
                <p className="text-xl opacity-90 mb-4">{flyerData.title}</p>
                <p className="mb-6 max-w-2xl mx-auto">{flyerData.bio}</p>

                <div className="flex flex-wrap justify-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20">
                    <Mail className="h-4 w-4" />
                    <span>{flyerData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20">
                    <Phone className="h-4 w-4" />
                    <span>{flyerData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20">
                    <MapPin className="h-4 w-4" />
                    <span>{flyerData.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards layout */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Projects Card */}
              <div
                className="rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                <div className="p-4 text-white" style={{ backgroundColor: currentTheme.colors.primary }}>
                  <h2 className="text-xl font-bold">Featured Projects</h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 gap-4">
                    {[0, 1, 2].map((index) => (
                      <div
                        key={index}
                        className="group relative rounded-lg overflow-hidden border shadow-md cursor-pointer flex"
                        style={{ borderColor: darkMode ? "#374151" : "#e5e7eb" }}
                        onClick={() => setSelectedProject(index)}
                      >
                        <div className="w-1/3 aspect-video">
                          <img
                            src={projectImages[index] || "/placeholder.svg"}
                            alt={projectTitles[index]}
                            className="w-full h-full object-cover"
                            crossOrigin="anonymous"
                          />
                        </div>
                        <div className="w-2/3 p-3">
                          <h3 className="font-medium text-base" style={{ color: currentTheme.colors.primary }}>
                            {projectTitles[index]}
                          </h3>
                          <p className="text-xs mt-1 opacity-80">View at: myportfolio.com</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Expertise Card */}
              <div
                className="rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                <div className="p-4 text-white" style={{ backgroundColor: currentTheme.colors.secondary }}>
                  <h2 className="text-xl font-bold">Technical Expertise</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2 text-base" style={{ color: currentTheme.colors.primary }}>
                        Core Technologies
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.primary }}
                          ></span>
                          <span>HTML5, CSS3, JavaScript (ES6+)</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.primary }}
                          ></span>
                          <span>React.js & TypeScript</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.primary }}
                          ></span>
                          <span>Tailwind CSS</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2 text-base" style={{ color: currentTheme.colors.secondary }}>
                        Development Tools
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.secondary }}
                          ></span>
                          <span>Git & GitHub</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.secondary }}
                          ></span>
                          <span>Scrum & Jira</span>
                        </li>
                        <li className="flex items-center">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2 flex-shrink-0"
                            style={{ backgroundColor: currentTheme.colors.secondary }}
                          ></span>
                          <span>UI/UX Development</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div
                className="rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                <div className="p-4 text-white" style={{ backgroundColor: currentTheme.colors.primary }}>
                  <h2 className="text-xl font-bold">Connect With Me</h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>{socialMedia}</div>
                    <div className="flex items-center justify-center">{githubQR}</div>
                  </div>
                </div>
              </div>

              {/* Call to Action Card */}
              <div
                className="rounded-lg shadow-lg overflow-hidden"
                style={{
                  backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                  border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                }}
              >
                <div className="p-4 text-white" style={{ backgroundColor: currentTheme.colors.secondary }}>
                  <h2 className="text-xl font-bold">Let's Work Together</h2>
                </div>
                <div className="p-4">
                  <p
                    className="text-base mb-4"
                    style={{ color: darkMode ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)" }}
                  >
                    {flyerData.cta}
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${flyerData.email}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-white"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email Me</span>
                    </a>
                    <a
                      href={githubProfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-md text-white"
                      style={{ backgroundColor: currentTheme.colors.secondary }}
                    >
                      <Github className="h-4 w-4" />
                      <span>View GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {footer}
          </>
        )

      case "compact":
        return (
          <>
            {/* Compact header */}
            <div className={`p-4 bg-gradient-to-r ${currentTheme.colors.headerGradient}`}>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden border-2 shadow-md flex-shrink-0"
                  style={{ borderColor: "rgba(255,255,255,0.3)" }}
                >
                  {profileImage}
                </div>

                <div className="text-white">
                  <h1 className="text-xl font-bold">{flyerData.name}</h1>
                  <p className="text-sm opacity-90">{flyerData.title}</p>
                </div>

                <div className="ml-auto flex gap-2">
                  <a
                    href={`mailto:${flyerData.email}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
                  >
                    <Mail className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href={`tel:${flyerData.phone}`}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
                  >
                    <Phone className="h-4 w-4 text-white" />
                  </a>
                  <a
                    href={githubProfileUrl}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20"
                  >
                    <Github className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Compact bio */}
            <div
              className="p-4 border-b"
              style={{ borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
            >
              <p className="text-sm">{flyerData.bio}</p>
            </div>

            {/* Compact content */}
            <div className="p-4 space-y-6">
              {/* Projects */}
              <div>
                <h2 className="text-lg font-bold mb-3 flex items-center">
                  <span
                    className="w-4 h-4 rounded mr-2"
                    style={{ backgroundColor: currentTheme.colors.primary }}
                  ></span>
                  Featured Projects
                </h2>

                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded overflow-hidden cursor-pointer"
                      onClick={() => setSelectedProject(index)}
                    >
                      <img
                        src={projectImages[index] || "/placeholder.svg"}
                        alt={projectTitles[index]}
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <p className="text-xs text-white text-center px-1">{projectTitles[index]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h2 className="text-lg font-bold mb-3 flex items-center">
                  <span
                    className="w-4 h-4 rounded mr-2"
                    style={{ backgroundColor: currentTheme.colors.secondary }}
                  ></span>
                  Technical Skills
                </h2>

                <div className="flex flex-wrap gap-2">
                  {["HTML5", "CSS3", "JavaScript", "React", "TypeScript", "Tailwind CSS", "Git", "GitHub", "UI/UX"].map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: darkMode
                            ? `${currentTheme.colors.primary}30`
                            : `${currentTheme.colors.primary}10`,
                          color: darkMode ? "white" : "inherit",
                        }}
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* Contact & QR */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold mb-2">Contact Details</h2>
                  <div className="space-y-1 text-sm">
                    <p className="flex items-center gap-1">
                      <Mail className="h-3 w-3" style={{ color: currentTheme.colors.primary }} />
                      <span>{flyerData.email}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <Phone className="h-3 w-3" style={{ color: currentTheme.colors.primary }} />
                      <span>{flyerData.phone}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" style={{ color: currentTheme.colors.primary }} />
                      <span>{flyerData.location}</span>
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0">{githubQR}</div>
              </div>
            </div>

            {/* Compact footer */}
            <div
              className="p-4 text-center border-t"
              style={{ borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
            >
              <p className="text-sm font-medium mb-2">
                View Interactive Portfolio: <span className="font-mono">myportfolio.com</span>
              </p>
              <p className="text-xs" style={{ color: darkMode ? "#9ca3af" : "#4b5563" }}>
                © {new Date().getFullYear()} {flyerData.name} | {flyerData.title}
              </p>
            </div>
          </>
        )

      default:
        return (
          <>
            {/* Decorative header */}
            <div className={`h-10 bg-gradient-to-r ${currentTheme.colors.headerGradient}`}></div>

            <div className="grid md:grid-cols-3 gap-6 p-6 relative">
              {/* Decorative elements */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl opacity-20"
                style={{ backgroundColor: currentTheme.colors.primary }}
              ></div>
              <div
                className="absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl opacity-20"
                style={{ backgroundColor: currentTheme.colors.secondary }}
              ></div>

              {/* Left Column - Profile */}
              <div className="space-y-6 relative">
                <div className="flex flex-col items-center text-center">
                  <div
                    className="w-36 h-36 rounded-full overflow-hidden mb-4 border-4 relative z-10 shadow-lg"
                    style={{ borderColor: currentTheme.colors.primary }}
                  >
                    {profileImage}
                    {/* Decorative ring */}
                    <div
                      className="absolute inset-0 border-4 rounded-full scale-110 opacity-50"
                      style={{ borderColor: currentTheme.colors.secondary }}
                    ></div>
                  </div>

                  <h1 className="text-2xl font-bold relative z-10 mb-1">{flyerData.name}</h1>
                  <div className="relative">
                    <p className="text-lg font-medium relative z-10" style={{ color: currentTheme.colors.primary }}>
                      {flyerData.title}
                    </p>
                    <div
                      className="absolute -bottom-1 left-0 right-0 h-3 -skew-y-1 -z-0 opacity-20"
                      style={{ backgroundColor: currentTheme.colors.primary }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div
                    className={`p-4 rounded-lg border-l-4 shadow-md`}
                    style={{
                      backgroundColor: darkMode
                        ? `${currentTheme.colors.primary}10`
                        : `${currentTheme.colors.primary}05`,
                      borderLeftColor: currentTheme.colors.primary,
                    }}
                  >
                    <p className="text-base leading-relaxed">{flyerData.bio}</p>
                  </div>

                  {contactInfo}
                  {socialMedia}
                  {githubQR}
                </div>
              </div>

              {/* Right Column - Work & Services */}
              <div className="md:col-span-2 space-y-6">
                {featuredProjects}
                {technicalExpertise}
                {callToAction}
              </div>
            </div>

            {footer}
          </>
        )
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8 max-w-5xl mx-auto">
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Edit Portfolio Flyer</h2>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch checked={darkMode} onCheckedChange={setDarkMode} id="dark-mode" />
              <Moon className="h-4 w-4" />
            </div>
          </div>

          <Tabs defaultValue="content" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <Input id="name" name="name" value={flyerData.name} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Professional Title
                  </label>
                  <Input id="title" name="title" value={flyerData.title} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">
                  Professional Bio
                </label>
                <Textarea id="bio" name="bio" value={flyerData.bio} onChange={handleChange} rows={3} />
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium">Services Offered</label>
                {flyerData.services.map((service, index) => (
                  <Input
                    key={index}
                    value={service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                    placeholder={`Service ${index + 1}`}
                  />
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone
                  </label>
                  <Input id="phone" name="phone" value={flyerData.phone} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input id="email" name="email" value={flyerData.email} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="text-sm font-medium">
                    Location
                  </label>
                  <Input id="location" name="location" value={flyerData.location} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="instagram" className="text-sm font-medium">
                    Instagram
                  </label>
                  <Input id="instagram" name="instagram" value={flyerData.instagram} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="twitter" className="text-sm font-medium">
                    Twitter
                  </label>
                  <Input id="twitter" name="twitter" value={flyerData.twitter} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="github" className="text-sm font-medium">
                    GitHub
                  </label>
                  <Input id="github" name="github" value={flyerData.github} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="cta" className="text-sm font-medium">
                  Call to Action
                </label>
                <Input id="cta" name="cta" value={flyerData.cta} onChange={handleChange} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Photo</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "profile")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Sample 1</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "work1")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Sample 2</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "work2")} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Sample 3</label>
                  <Input type="file" accept="image/*" onChange={(e) => handleImageChange(e, "work3")} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="design" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Choose Design Theme
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {designThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative rounded-lg p-4 cursor-pointer transition-all ${
                        selectedDesign === theme.id
                          ? "ring-2 ring-offset-2"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      style={{
                        ringColor: theme.colors.primary,
                        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                      }}
                      onClick={() => setSelectedDesign(theme.id)}
                    >
                      {selectedDesign === theme.id && (
                        <div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: theme.colors.primary }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}

                      <div
                        className="h-8 rounded mb-2 bg-gradient-to-r"
                        style={{
                          backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                        }}
                      ></div>

                      <h4 className="text-sm font-medium">{theme.name}</h4>

                      <div className="flex gap-1 mt-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.primary }}></div>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.secondary }}></div>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: theme.colors.accent }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm font-medium">Dark Mode</span>
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  <Switch checked={darkMode} onCheckedChange={setDarkMode} id="dark-mode-design" />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Choose Layout Style
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {layoutVariations.map((layout) => (
                    <div
                      key={layout.id}
                      className={`relative rounded-lg p-4 cursor-pointer transition-all ${
                        selectedLayout === layout.id
                          ? "ring-2 ring-offset-2"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      style={{
                        ringColor: currentTheme.colors.primary,
                        backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
                      }}
                      onClick={() => setSelectedLayout(layout.id)}
                    >
                      {selectedLayout === layout.id && (
                        <div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: currentTheme.colors.primary }}
                        >
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}

                      <div
                        className="h-16 rounded mb-2 border flex items-center justify-center"
                        style={{ borderColor: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                      >
                        <Layout className="h-8 w-8 opacity-50" />
                      </div>

                      <h4 className="text-sm font-medium text-center">{layout.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Preview Flyer
            </Button>
          </div>
        </Card>
        ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Portfolio Flyer Preview</h2>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-2 mr-4">
                <Sun className="h-4 w-4" />
                <Switch checked={darkMode} onCheckedChange={setDarkMode} id="dark-mode-preview" />
                <Moon className="h-4 w-4" />
              </div>
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Content
              </Button>
              <Button onClick={downloadFlyer}>
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
            </div>
          </div>

          <div
            ref={flyerRef}
            className={`border rounded-lg overflow-hidden shadow-lg`}
            style={{
              width: "100%",
              maxWidth: "800px",
              margin: "0 auto",
              backgroundColor: darkMode ? currentTheme.colors.bgDark : currentTheme.colors.bgLight,
              color: darkMode ? "white" : "black",
            }}
          >
            {renderFlyer()}
          </div>

          {/* Project Preview Modal */}
          {selectedProject !== null && (
            <div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedProject(null)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b flex justify-between items-center">
                  <h3 className="font-bold text-lg">{projectTitles[selectedProject]}</h3>
                  <button
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setSelectedProject(null)}
                  >
                    ✕
                  </button>
                </div>
                <div className="overflow-auto flex-1 p-2">
                  <img
                    src={projectImages[selectedProject] || "/placeholder.svg"}
                    alt={projectTitles[selectedProject]}
                    className="w-full h-auto object-contain"
                    crossOrigin="anonymous"
                  />
                </div>
                <div className="p-4 border-t">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Note: This preview is only available in the web interface. When you download the flyer as an image,
                    viewers will need to scan the QR code or visit your GitHub to see the full projects.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}


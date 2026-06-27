"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineCheckCircle,
  AiOutlineMessage,
  AiOutlineRocket,
} from "react-icons/ai";
import { BiAdjust } from "react-icons/bi";
import { BsStarFill, BsStar } from "react-icons/bs";

/* ─── Data ─────────────────────────────────────── */
const SUBJECTS = [
  { emoji: "📐", name: "Mathematics", count: "1,240 tutors", bg: "#eff6ff" },
  { emoji: "⚗️", name: "Science",     count: "980 tutors",  bg: "#f0fdf4" },
  { emoji: "📖", name: "English",     count: "760 tutors",  bg: "#fdf4ff" },
  { emoji: "🏛️", name: "History",     count: "420 tutors",  bg: "#fff7ed" },
  { emoji: "💻", name: "Coding",      count: "610 tutors",  bg: "#f0f9ff" },
  { emoji: "🎵", name: "Music",       count: "290 tutors",  bg: "#fefce8" },
  { emoji: "📊", name: "Accountancy", count: "380 tutors",  bg: "#f5f3ff" },
  { emoji: "🎨", name: "Drawing",     count: "180 tutors",  bg: "#fdf2f8" },
];

const TEACHERS = [
  { initials: "PS", name: "Priya Sharma",  subject: "Maths",    exp: 8, rating: 4.9, reviews: 84,  tags: ["Algebra","Calculus","JEE"], price: "₹600", dist: "1.8 km", available: true,  bg: "#dbeafe", color: "#1d4ed8" },
  { initials: "RK", name: "Rahul Kumar",   subject: "Physics",  exp: 5, rating: 4.6, reviews: 61,  tags: ["Mechanics","NEET","Class 12"], price: "₹500", dist: "3.2 km", available: true,  bg: "#dcfce7", color: "#15803d" },
  { initials: "AM", name: "Anjali Mishra", subject: "English",  exp: 10,rating: 5.0, reviews: 102, tags: ["Grammar","IELTS","Writing"],  price: "₹750", dist: "Online",  available: false, bg: "#fae8ff", color: "#86198f" },
  { initials: "VS", name: "Vikram Singh",  subject: "Chemistry",exp: 6, rating: 4.7, reviews: 48,  tags: ["Organic","JEE Adv","Class 11"],price: "₹550", dist: "2.5 km", available: true,  bg: "#fef9c3", color: "#a16207" },
];

const STATS = [
  { value: "50,000+", label: "Students enrolled" },
  { value: "8,200+",  label: "Verified teachers"  },
  { value: "200+",    label: "Subjects covered"   },
  { value: "4.8 ★",  label: "Average rating"     },
];

/* ─── Sub-components ─────────────────────────────── */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        i <= Math.floor(rating)
          ? <BsStarFill key={i} className="w-3 h-3 text-amber-400" />
          : <BsStar    key={i} className="w-3 h-3 text-gray-200" />
      ))}
    </span>
  );
}

function TeacherCard({ t }: { t: typeof TEACHERS[0] }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold shrink-0"
          style={{ background: t.bg, color: t.color }}>
          {t.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-900 truncate">{t.name}</span>
            <AiOutlineCheckCircle className="w-4 h-4 text-green-500 shrink-0" />
          </div>
          <div className="text-xs text-gray-500">{t.subject} · {t.exp} yrs exp</div>
          <div className="flex items-center gap-1.5 mt-1">
            <Stars rating={t.rating} />
            <span className="text-xs text-gray-400">{t.rating} ({t.reviews})</span>
          </div>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
          t.available ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}`}>
          {t.available ? "Available" : "Busy today"}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {t.tags.map(tag => (
          <span key={tag} className="text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-100">{tag}</span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold text-blue-600">{t.price}/hr</div>
          <div className="text-xs text-gray-400 flex items-center gap-0.5">
            <AiOutlineEnvironment className="w-3 h-3" /> {t.dist}
          </div>
        </div>
        <button className="px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-full text-xs font-medium hover:bg-blue-600 hover:text-white transition-all duration-150">
          Contact
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────── */
export default function HomeGuestPage() {
  const [cookieDismissed, setCookieDismissed] = useState(false);
  const [city, setCity] = useState("Varanasi");
  const [mode, setMode] = useState("Any mode");

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">TutorNear</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm text-gray-500">
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Find Tutors</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">Become a Teacher</span>
            <span className="hover:text-gray-900 cursor-pointer transition-colors">How it works</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login"
              className="px-4 py-2 rounded-full text-sm font-medium text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors">
              Login
            </Link>
            <Link href="/register"
              className="px-4 py-2 rounded-full text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors">
              Register
            </Link>
            <span className="hidden lg:block text-sm text-gray-400 cursor-pointer hover:text-gray-600">For Teachers ›</span>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-blue-50 via-sky-50 to-violet-50 py-14 px-6 text-center">
        <h1 className="text-4xl font-semibold text-gray-900 leading-tight mb-3">
          Find the Best Tutors <span className="text-blue-600">Near You</span>
        </h1>
        <p className="text-base text-gray-500 mb-8">
          Search from 8,000+ verified teachers for every subject · Kanpur, Lucknow, Varanasi & more
        </p>

        {/* Search bar */}
        <div className="bg-white rounded-full border border-gray-200 flex items-center max-w-3xl mx-auto mb-4 overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 flex-1 px-4 py-3 border-r border-gray-100">
            <AiOutlineSearch className="w-4 h-4 text-gray-400 shrink-0" />
            <input type="text" placeholder="Subject, e.g. Mathematics, Physics…"
              className="bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400 w-full" />
          </div>
          <div className="flex items-center gap-1.5 px-4 py-3 border-r border-gray-100 min-w-[130px]">
            <AiOutlineEnvironment className="w-4 h-4 text-gray-400 shrink-0" />
            <select value={city} onChange={e => setCity(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 cursor-pointer">
              <option>Varanasi</option><option>Kanpur</option><option>Lucknow</option><option>Delhi NCR</option>
            </select>
          </div>
          <div className="flex items-center gap-1.5 px-4 py-3 border-r border-gray-100 min-w-[120px]">
            <BiAdjust className="w-4 h-4 text-gray-400 shrink-0" />
            <select value={mode} onChange={e => setMode(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-600 cursor-pointer">
              <option>Any mode</option><option>Online</option><option>Offline</option>
            </select>
          </div>
          <button className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors shrink-0">
            Search
          </button>
        </div>

        {/* Recent searches */}
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="text-xs text-gray-400">Recent:</span>
          {["Maths, Varanasi, Offline", "Physics, Online", "Class 10 Science"].map(s => (
            <span key={s} className="text-xs text-gray-500 flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
              <AiOutlineClockCircle className="w-3.5 h-3.5" /> {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── Browse subjects ── */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Browse by subject</h2>
          <a className="text-sm text-blue-600 cursor-pointer hover:underline">View all →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {SUBJECTS.map(s => (
            <div key={s.name} className="bg-white border border-gray-100 rounded-2xl p-3.5 cursor-pointer
              hover:border-blue-200 hover:bg-blue-50 transition-all duration-150 text-center">
              <div className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-xl"
                style={{ background: s.bg }}>{s.emoji}</div>
              <div className="text-xs font-semibold text-gray-800">{s.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">{s.count}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured teachers ── */}
      <section className="bg-white border-t border-gray-100 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-900">Top-rated tutors near you</h2>
            <a className="text-sm text-blue-600 cursor-pointer hover:underline">See all →</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEACHERS.map(t => <TeacherCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-lg font-semibold text-gray-900 mb-8 text-center">How TutorNear works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <AiOutlineSearch className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50", title: "Search nearby tutors", desc: "Filter by subject, location, mode, and budget to find your perfect match" },
            { icon: <AiOutlineMessage className="w-6 h-6 text-green-600" />, bg: "bg-green-50", title: "Connect & verify", desc: "Chat directly, check reviews, and book a free demo class before committing" },
            { icon: <AiOutlineRocket className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50", title: "Start learning", desc: "Attend sessions online or at home, track progress, and achieve your goals" },
          ].map(s => (
            <div key={s.title} className="text-center px-6">
              <div className={`w-14 h-14 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                {s.icon}
              </div>
              <div className="text-sm font-semibold text-gray-900 mb-2">{s.title}</div>
              <div className="text-sm text-gray-500 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats bar ── */}
      <div className="bg-blue-800 py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map(s => (
            <div key={s.label}>
              <div className="text-2xl font-semibold text-white">{s.value}</div>
              <div className="text-sm text-blue-300 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-100 py-5 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
              </svg>
            </div>
            <span className="font-semibold text-gray-900">TutorNear</span>
          </div>
          <div className="text-xs text-gray-400">© {new Date().getFullYear()} TutorNear · Privacy · Terms · Help</div>
        </div>
      </footer>

      {/* ── Cookie bar ── */}
      {!cookieDismissed && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-gray-100 px-6 py-3 flex items-center justify-center gap-3 text-xs flex-wrap z-50">
          We use cookies to improve your experience. By continuing you agree to our{" "}
          <a className="text-blue-300 hover:underline cursor-pointer">Privacy Policy</a> &amp;{" "}
          <a className="text-blue-300 hover:underline cursor-pointer">Cookie Policy</a>
          <button onClick={() => setCookieDismissed(true)}
            className="px-4 py-1.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors ml-2">
            Got it
          </button>
        </div>
      )}
    </div>
  );
}
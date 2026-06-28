"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineArrowLeft,
  AiOutlineEnvironment,
  AiOutlineGlobal,
  AiOutlineMessage,
  AiOutlineUserAdd,
  AiOutlineShareAlt,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import {
  BsShieldCheck,
  BsStarFill,
  BsHeart,
  BsHeartFill,
  BsGrid3X3,
  BsCameraVideo,
  BsThreeDots,
} from "react-icons/bs";
import { FiUsers, FiBookOpen, FiAward, FiGlobe } from "react-icons/fi";

/* ─── Extended teacher profile data ──────────────── */
const PROFILES: Record<number, {
  id: number; initials: string; name: string; tagline: string;
  subjects: string[]; experience: string; expYears: number;
  mode: string; city: string; rate: number; rating: number; reviews: number;
  verified: boolean; available: boolean;
  bio: string; languages: string[]; tags: string[];
  bg: string; color: string;
  quote: string; posts: number; followers: string; following: number;
  summary: string;
  highlights: { label: string; emoji: string; bg: string; color: string }[];
  photoCards: { label: string; sub: string; emoji: string; bg: string; textColor: string }[];
  videoCards: { title: string; views: string; duration: string; bg: string; emoji: string }[];
  statsBar: { icon: string; label: string; value: string; sub: string }[];
  footerQuote: string;
}> = {
  1: {
    id: 1, initials: "PS", name: "Priya Sharma",
    tagline: "Mathematics Teacher · JEE Specialist · Lifelong Educator",
    subjects: ["Mathematics", "Physics"], experience: "8 years", expYears: 8,
    mode: "Both", city: "Varanasi", rate: 600, rating: 4.9, reviews: 84,
    verified: true, available: true,
    bio: "Dedicated mathematics and physics teacher with 8+ years helping students crack JEE. My approach focuses on conceptual clarity and systematic problem-solving shortcuts.",
    languages: ["Hindi", "English"],
    tags: ["JEE Advanced", "Calculus", "Mechanics", "Algebra"],
    bg: "#DBEAFE", color: "#1D4ED8",
    quote: "Mathematics is not\nabout numbers —\nit's about understanding.",
    posts: 52, followers: "12.4K", following: 318,
    summary: "Dedicated mathematics and physics educator with 8+ years of experience delivering engaging lessons and fostering high-performance results. Specialist in JEE Advanced preparation, conceptual problem-solving, and building long-term academic confidence in students.",
    highlights: [
      { label: "Teaching", emoji: "📚", bg: "#DBEAFE", color: "#1D4ED8" },
      { label: "Maths Tips", emoji: "📐", bg: "#FEF3C7", color: "#92400E" },
      { label: "Students", emoji: "👥", bg: "#D1FAE5", color: "#065F46" },
      { label: "Methods", emoji: "💡", bg: "#F3E8FF", color: "#7C3AED" },
      { label: "Reviews", emoji: "⭐", bg: "#FEF9C3", color: "#B45309" },
      { label: "Results", emoji: "🏆", bg: "#FFEDD5", color: "#C2410C" },
      { label: "About Me", emoji: "😊", bg: "#FCE7F3", color: "#9D174D" },
    ],
    photoCards: [
      { label: "Believe", sub: "Achieve · Succeed", emoji: "✏️", bg: "#0F172A", textColor: "#F8FAFC" },
      { label: "JEE Class", sub: "Batch of 2025", emoji: "📖", bg: "#1D4ED8", textColor: "#DBEAFE" },
      { label: "100% Results", sub: "Board 2024", emoji: "🎉", bg: "#065F46", textColor: "#D1FAE5" },
      { label: "Workshop", sub: "IIT Preparation", emoji: "🔬", bg: "#7C3AED", textColor: "#F3E8FF" },
      { label: "Online Class", sub: "Via Google Meet", emoji: "💻", bg: "#0369A1", textColor: "#E0F2FE" },
      { label: "Chalk & Board", sub: "Old School ♥", emoji: "🖊️", bg: "#14532D", textColor: "#DCFCE7" },
      { label: "Study Session", sub: "One-on-one", emoji: "🧮", bg: "#4C1D95", textColor: "#EDE9FE" },
      { label: "JEE Adv '24", sub: "3 AIR < 1000", emoji: "🏅", bg: "#7C2D12", textColor: "#FFEDD5" },
    ],
    videoCards: [
      { title: "Calculus Made Easy!", views: "3.2K", duration: "4:15", bg: "#1E3A5F", emoji: "∫" },
      { title: "JEE Tips & Tricks", views: "5.1K", duration: "6:30", bg: "#064E3B", emoji: "💡" },
      { title: "Score 100 in Maths", views: "8.4K", duration: "3:45", bg: "#4C1D95", emoji: "💯" },
      { title: "Study Schedule Guide", views: "2.8K", duration: "2:55", bg: "#7C2D12", emoji: "📅" },
    ],
    statsBar: [
      { icon: "🎓", label: "Experience", value: "8+ Years", sub: "Teaching Maths & Physics" },
      { icon: "📚", label: "Subjects", value: "Maths, Physics", sub: "JEE · NEET · Boards" },
      { icon: "👥", label: "Students Impacted", value: "500+", sub: "Across Varanasi & Online" },
      { icon: "🌐", label: "Teaching Mode", value: "Online & Offline", sub: "Flexible Scheduling" },
    ],
    footerQuote: "Every student has the potential to excel. My mission is to unlock it.",
  },
  2: {
    id: 2, initials: "RK", name: "Rahul Kumar",
    tagline: "Physics & Chemistry Tutor · NEET & JEE Coach",
    subjects: ["Physics", "Chemistry"], experience: "5 years", expYears: 5,
    mode: "Both", city: "Varanasi", rate: 500, rating: 4.6, reviews: 61,
    verified: true, available: true,
    bio: "Physics and Chemistry expert with 5 years coaching JEE and NEET aspirants. Known for making complex concepts simple.",
    languages: ["Hindi", "English"],
    tags: ["NEET", "JEE Mains", "Organic Chemistry", "Electrostatics"],
    bg: "#D1FAE5", color: "#065F46",
    quote: "Science is not facts —\nit's curiosity,\nit's discovery.",
    posts: 38, followers: "9.1K", following: 241,
    summary: "Passionate science educator with 5 years preparing students for NEET and JEE. Specialist in Physical Chemistry and Electrostatics. Known for his analogy-based teaching that makes abstract concepts feel real and intuitive.",
    highlights: [
      { label: "Chemistry", emoji: "⚗️", bg: "#D1FAE5", color: "#065F46" },
      { label: "Physics", emoji: "⚡", bg: "#DBEAFE", color: "#1D4ED8" },
      { label: "Students", emoji: "👥", bg: "#FEF3C7", color: "#92400E" },
      { label: "Lab Work", emoji: "🔬", bg: "#F3E8FF", color: "#7C3AED" },
      { label: "Reviews", emoji: "⭐", bg: "#FEF9C3", color: "#B45309" },
      { label: "Results", emoji: "🏆", bg: "#FFEDD5", color: "#C2410C" },
      { label: "About Me", emoji: "😊", bg: "#FCE7F3", color: "#9D174D" },
    ],
    photoCards: [
      { label: "Learn by Doing", sub: "Lab Sessions", emoji: "⚗️", bg: "#064E3B", textColor: "#D1FAE5" },
      { label: "NEET Batch", sub: "Class of 2025", emoji: "📖", bg: "#065F46", textColor: "#A7F3D0" },
      { label: "Chemistry Lab", sub: "Organic Reactions", emoji: "🔬", bg: "#1E3A5F", textColor: "#BFDBFE" },
      { label: "Workshop", sub: "NEET Strategies", emoji: "📝", bg: "#7C3AED", textColor: "#EDE9FE" },
      { label: "Online Demo", sub: "Free Class", emoji: "💻", bg: "#0369A1", textColor: "#E0F2FE" },
      { label: "Periodic Table", sub: "Memory Tricks", emoji: "🧪", bg: "#14532D", textColor: "#DCFCE7" },
      { label: "Study Circle", sub: "Group Learning", emoji: "🧲", bg: "#4C1D95", textColor: "#EDE9FE" },
      { label: "NEET '24 Results", sub: "95% Pass Rate", emoji: "🏅", bg: "#7C2D12", textColor: "#FFEDD5" },
    ],
    videoCards: [
      { title: "Organic Chemistry Basics", views: "4.5K", duration: "5:20", bg: "#064E3B", emoji: "⚗️" },
      { title: "NEET Physics Shortcuts", views: "6.8K", duration: "7:15", bg: "#1E3A5F", emoji: "⚡" },
      { title: "Electrostatics Deep Dive", views: "3.1K", duration: "4:45", bg: "#4C1D95", emoji: "🔋" },
      { title: "How I Cleared JEE", views: "9.2K", duration: "8:00", bg: "#7C2D12", emoji: "🎯" },
    ],
    statsBar: [
      { icon: "🎓", label: "Experience", value: "5+ Years", sub: "Teaching Physics & Chemistry" },
      { icon: "📚", label: "Subjects", value: "Physics, Chemistry", sub: "JEE · NEET · Boards" },
      { icon: "👥", label: "Students Impacted", value: "350+", sub: "Varanasi & Online" },
      { icon: "🌐", label: "Teaching Mode", value: "Online & Offline", sub: "Flexible Slots" },
    ],
    footerQuote: "Science is not a subject — it's a way of thinking about the world.",
  },
  3: {
    id: 3, initials: "AM", name: "Anjali Mishra",
    tagline: "English Language Expert · IELTS Coach · Communication Trainer",
    subjects: ["English"], experience: "10 years", expYears: 10,
    mode: "Online", city: "Online", rate: 750, rating: 5.0, reviews: 102,
    verified: true, available: false,
    bio: "English communication and grammar specialist with 10 years of experience. Expert in IELTS preparation, creative writing, and board exam scoring.",
    languages: ["English", "Hindi"],
    tags: ["IELTS", "Grammar", "Writing", "Board Exams"],
    bg: "#FAE8FF", color: "#86198F",
    quote: "Language is the road\nmap of a culture —\nteach it with love.",
    posts: 84, followers: "18.6K", following: 1245,
    summary: "Dedicated and student-focused English educator with 10+ years of experience in delivering engaging lessons and fostering inclusive learning environments. Skilled in curriculum design, digital teaching tools, and competency-based education aligned with international standards.",
    highlights: [
      { label: "English Tips", emoji: "📝", bg: "#FAE8FF", color: "#86198F" },
      { label: "IELTS Prep", emoji: "🌍", bg: "#DBEAFE", color: "#1D4ED8" },
      { label: "Writing", emoji: "✍️", bg: "#D1FAE5", color: "#065F46" },
      { label: "Grammar", emoji: "📖", bg: "#FEF3C7", color: "#92400E" },
      { label: "Reviews", emoji: "⭐", bg: "#FEF9C3", color: "#B45309" },
      { label: "Results", emoji: "🏆", bg: "#FFEDD5", color: "#C2410C" },
      { label: "About Me", emoji: "😊", bg: "#FCE7F3", color: "#9D174D" },
    ],
    photoCards: [
      { label: "Words Matter", sub: "English for Life", emoji: "📚", bg: "#581C87", textColor: "#FAE8FF" },
      { label: "IELTS Band 8", sub: "My Students", emoji: "🌟", bg: "#86198F", textColor: "#FDF4FF" },
      { label: "Writing Workshop", sub: "Essay Mastery", emoji: "✍️", bg: "#1E3A5F", textColor: "#BFDBFE" },
      { label: "Grammar Clinic", sub: "Zero Errors", emoji: "📝", bg: "#065F46", textColor: "#D1FAE5" },
      { label: "Live Online", sub: "Zoom Classes", emoji: "💻", bg: "#0369A1", textColor: "#E0F2FE" },
      { label: "Story Writing", sub: "Creative Edge", emoji: "📖", bg: "#14532D", textColor: "#DCFCE7" },
      { label: "Public Speaking", sub: "Confidence", emoji: "🎤", bg: "#4C1D95", textColor: "#EDE9FE" },
      { label: "IELTS '24 Results", sub: "Avg Band 7.5", emoji: "🏅", bg: "#7C2D12", textColor: "#FFEDD5" },
    ],
    videoCards: [
      { title: "IELTS Writing Task 2", views: "7.2K", duration: "6:45", bg: "#581C87", emoji: "✍️" },
      { title: "Grammar Masterclass", views: "5.4K", duration: "5:30", bg: "#065F46", emoji: "📖" },
      { title: "Speak English Fluently", views: "11.8K", duration: "8:10", bg: "#1E3A5F", emoji: "🎤" },
      { title: "IELTS Listening Hacks", views: "4.3K", duration: "4:20", bg: "#7C2D12", emoji: "👂" },
    ],
    statsBar: [
      { icon: "🎓", label: "Experience", value: "10+ Years", sub: "English Language Teaching" },
      { icon: "📚", label: "Subjects", value: "English", sub: "IELTS · TOEFL · Boards" },
      { icon: "👥", label: "Students Impacted", value: "600+", sub: "Globally Online" },
      { icon: "🌐", label: "Global Outlook", value: "International Standards", sub: "IELTS · Cambridge" },
    ],
    footerQuote: "Teaching is not just a profession — it's a commitment to impact lives every day.",
  },
};

/* Fill remaining teachers with generated data */
const BASE_TEACHERS = [
  { id: 4, initials: "VS", name: "Vikram Singh", tagline: "Chemistry Expert · JEE & NEET Coach", subjects: ["Chemistry"], experience: "6 years", expYears: 6, mode: "Offline", city: "Varanasi", rate: 550, rating: 4.7, reviews: 48, verified: true, available: true, bio: "Chemistry teacher specialising in Organic Chemistry for JEE Advanced and NEET.", languages: ["Hindi"], tags: ["Organic Chemistry", "JEE Advanced"], bg: "#FEF9C3", color: "#92400E", quote: "Chemistry is the\npoetry of\nthe universe." },
  { id: 5, initials: "NV", name: "Neha Verma", tagline: "Biology Teacher · NEET Specialist", subjects: ["Biology"], experience: "4 years", expYears: 4, mode: "Both", city: "Varanasi", rate: 450, rating: 4.5, reviews: 29, verified: false, available: true, bio: "Biology teacher with 4 years of experience focused on NEET preparation.", languages: ["Hindi", "English"], tags: ["NEET", "Botany", "Zoology"], bg: "#ECFDF5", color: "#047857", quote: "Life is the\ngreatest subject\nof all." },
  { id: 6, initials: "AJ", name: "Amit Joshi", tagline: "Computer Science Educator · Python & C++ Expert", subjects: ["Computer Science"], experience: "7 years", expYears: 7, mode: "Online", city: "Online", rate: 800, rating: 4.8, reviews: 67, verified: true, available: true, bio: "Software engineer turned educator teaching CS, Python, C++, and competitive programming.", languages: ["Hindi", "English"], tags: ["Python", "C++", "DSA"], bg: "#E0F2FE", color: "#0369A1", quote: "Code is the\nnew literacy of\nthe modern world." },
  { id: 7, initials: "SY", name: "Sunita Yadav", tagline: "Senior Maths & Physics Tutor · 12 Years Experience", subjects: ["Mathematics", "Physics"], experience: "12 years", expYears: 12, mode: "Both", city: "Varanasi", rate: 700, rating: 4.9, reviews: 118, verified: true, available: true, bio: "Veteran Maths and Physics teacher ranked among top-rated tutors in Varanasi.", languages: ["Hindi", "English"], tags: ["Trigonometry", "Mechanics", "JEE Mains"], bg: "#F3E8FF", color: "#7E22CE", quote: "Teaching is not\nfilling a bucket —\nit's lighting a fire." },
  { id: 8, initials: "DG", name: "Deepak Gupta", tagline: "History & Geography Specialist · Board Exams", subjects: ["History", "Geography"], experience: "9 years", expYears: 9, mode: "Offline", city: "Varanasi", rate: 400, rating: 4.4, reviews: 35, verified: false, available: false, bio: "Experienced History and Geography teacher using maps, timelines, and storytelling.", languages: ["Hindi"], tags: ["CBSE", "Board Exams", "Map Work"], bg: "#FEF3C7", color: "#B45309", quote: "History doesn't repeat\nitself — but it\nrhymes." },
  { id: 9, initials: "KP", name: "Kavita Pandey", tagline: "English & Hindi Teacher · Lucknow", subjects: ["English", "Hindi"], experience: "6 years", expYears: 6, mode: "Both", city: "Lucknow", rate: 500, rating: 4.6, reviews: 52, verified: true, available: true, bio: "Bilingual English and Hindi teacher specialising in grammar and board exam preparation.", languages: ["Hindi", "English", "Urdu"], tags: ["Grammar", "Literature", "Board Exams"], bg: "#FCE7F3", color: "#9D174D", quote: "Words have the\npower to change\nthe world." },
  { id: 10, initials: "RS", name: "Ranjit Singh", tagline: "Maths Tutor · Class 1–10 Specialist", subjects: ["Mathematics"], experience: "3 years", expYears: 3, mode: "Offline", city: "Varanasi", rate: 350, rating: 4.2, reviews: 18, verified: false, available: true, bio: "Young and enthusiastic maths teacher making maths fun through games and puzzles.", languages: ["Hindi"], tags: ["Basic Maths", "Class 9-10", "Algebra"], bg: "#DBEAFE", color: "#1E40AF", quote: "Every expert was\nonce a beginner.\nStart today." },
  { id: 11, initials: "MD", name: "Meera Dubey", tagline: "Music Teacher · Hindustani Vocal · Guitar · Keyboard", subjects: ["Music"], experience: "8 years", expYears: 8, mode: "Online", city: "Online", rate: 600, rating: 4.7, reviews: 43, verified: true, available: true, bio: "Classical and contemporary music teacher with BHU training. Teaches vocal, guitar, and keyboard.", languages: ["Hindi", "English"], tags: ["Hindustani Vocal", "Guitar", "Keyboard"], bg: "#FDE68A", color: "#92400E", quote: "Music gives soul\nto the universe\nand wings to the mind." },
  { id: 12, initials: "AT", name: "Arun Tiwari", tagline: "Commerce Teacher · Economics & Accountancy Expert", subjects: ["Economics", "Accountancy"], experience: "5 years", expYears: 5, mode: "Both", city: "Varanasi", rate: 450, rating: 4.5, reviews: 31, verified: true, available: false, bio: "Commerce specialist teaching Economics and Accountancy for Class 11-12 and CA Foundation.", languages: ["Hindi", "English"], tags: ["Micro Economics", "Accountancy", "CA Foundation"], bg: "#D1FAE5", color: "#065F46", quote: "Accounting is the\nlanguage of\nbusiness." },
];

/* Generate a default profile for teachers 4–12 */
const DEFAULT_HIGHLIGHTS = [
  { label: "Teaching", emoji: "📚", bg: "#DBEAFE", color: "#1D4ED8" },
  { label: "My Subject", emoji: "📐", bg: "#FEF3C7", color: "#92400E" },
  { label: "Students", emoji: "👥", bg: "#D1FAE5", color: "#065F46" },
  { label: "Methods", emoji: "💡", bg: "#F3E8FF", color: "#7C3AED" },
  { label: "Reviews", emoji: "⭐", bg: "#FEF9C3", color: "#B45309" },
  { label: "Results", emoji: "🏆", bg: "#FFEDD5", color: "#C2410C" },
  { label: "About Me", emoji: "😊", bg: "#FCE7F3", color: "#9D174D" },
];

BASE_TEACHERS.forEach((t) => {
  if (PROFILES[t.id]) return;
  PROFILES[t.id] = {
    ...t,
    posts: Math.floor(t.reviews * 0.6) + 10,
    followers: `${((t.reviews * 1.6) / 10).toFixed(1)}K`,
    following: Math.floor(t.reviews * 3.5),
    summary: `${t.bio} With a passion for student success and ${t.experience} of dedicated teaching, known for making every session count and building lasting academic confidence.`,
    highlights: DEFAULT_HIGHLIGHTS,
    photoCards: [
      { label: "Teach. Inspire.", sub: "Every day", emoji: "📚", bg: "#0F172A", textColor: "#F8FAFC" },
      { label: t.subjects[0], sub: "My speciality", emoji: "📖", bg: t.color, textColor: t.bg },
      { label: "Class Results", sub: "2024 Batch", emoji: "🎉", bg: "#065F46", textColor: "#D1FAE5" },
      { label: "Workshop", sub: "Exam Prep", emoji: "📝", bg: "#7C3AED", textColor: "#EDE9FE" },
      { label: "Online Class", sub: "Live sessions", emoji: "💻", bg: "#0369A1", textColor: "#E0F2FE" },
      { label: "Study Time", sub: "Focus & Flow", emoji: "🖊️", bg: "#14532D", textColor: "#DCFCE7" },
      { label: "One-on-One", sub: "Personal care", emoji: "🤝", bg: "#4C1D95", textColor: "#EDE9FE" },
      { label: "Top Results", sub: `${t.reviews * 5}+ students`, emoji: "🏅", bg: "#7C2D12", textColor: "#FFEDD5" },
    ],
    videoCards: [
      { title: `${t.subjects[0]} Masterclass`, views: `${(t.reviews * 0.5).toFixed(1)}K`, duration: "5:20", bg: "#1E3A5F", emoji: "📚" },
      { title: "Exam Preparation Tips", views: `${(t.reviews * 0.8).toFixed(1)}K`, duration: "4:15", bg: "#064E3B", emoji: "💡" },
      { title: "How to Score Full Marks", views: `${(t.reviews * 1.2).toFixed(1)}K`, duration: "6:30", bg: "#4C1D95", emoji: "💯" },
      { title: "Study Smart, Not Hard", views: `${(t.reviews * 0.6).toFixed(1)}K`, duration: "3:45", bg: "#7C2D12", emoji: "📅" },
    ],
    statsBar: [
      { icon: "🎓", label: "Experience", value: t.experience, sub: `Teaching ${t.subjects[0]}` },
      { icon: "📚", label: "Subjects", value: t.subjects.join(", "), sub: "Boards · Competitive" },
      { icon: "👥", label: "Students Impacted", value: `${t.reviews * 5}+`, sub: t.city === "Online" ? "Across India" : t.city },
      { icon: "🌐", label: "Teaching Mode", value: t.mode === "Both" ? "Online & Offline" : t.mode, sub: "Flexible Scheduling" },
    ],
    footerQuote: `Teaching is not just a profession — it's a commitment to impact lives every day. ❤️`,
  };
});

/* ─── Sub-components ─────────────────────────────── */

function StarRow({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <BsStarFill key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? "text-amber-400" : "text-gray-200"}`} />
      ))}
      <span className="text-sm font-semibold text-gray-800 ml-1">{rating}</span>
      <span className="text-xs text-gray-400">({reviews} reviews)</span>
    </div>
  );
}

/* ─── Main component ─────────────────────────────── */
export default function TeacherPublicProfile({ teacherId }: { teacherId: number }) {
  const teacher = PROFILES[teacherId] ?? PROFILES[1];

  const [followed, setFollowed] = useState(false);
  const [saved, setSaved] = useState(false);
  const [photoTab, setPhotoTab] = useState<"photos" | "videos">("photos");

  return (
    <div className="min-h-screen bg-gray-100 font-sans">

      {/* ── Topbar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <Link
            href="/student"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
          >
            <AiOutlineArrowLeft className="w-4 h-4" />
            Back to tutors
          </Link>
          <div className="flex-1" />
          <button
            onClick={() => setSaved((s) => !s)}
            className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 transition-all"
          >
            {saved ? <BsHeartFill className="w-4 h-4 text-red-500" /> : <BsHeart className="w-4 h-4" />}
          </button>
          <button className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all">
            <AiOutlineShareAlt className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all">
            <BsThreeDots className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col gap-4">

        {/* ── Cover + Profile card ── */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">

          {/* Cover banner */}
          <div
            className="relative h-48 flex items-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, #0A1628 0%, #1A2F5E 55%, #0D1F45 100%)" }}
          >
            {/* Decorative dots */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full opacity-10"
                style={{
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  left: `${(i * 13) % 100}%`,
                  top: `${(i * 17) % 100}%`,
                  background: i % 3 === 0 ? "#F59E0B" : "#60A5FA",
                }}
              />
            ))}

            {/* Quote left */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2 max-w-xs z-10">
              <div className="text-5xl text-amber-400 leading-none mb-1">"</div>
              <p className="text-white text-lg font-semibold leading-snug whitespace-pre-line">
                {teacher.quote}
              </p>
              <div className="w-14 h-0.5 bg-amber-400 mt-3" />
            </div>

            {/* Right side — teacher avatar illustration */}
            <div className="absolute right-0 top-0 bottom-0 w-56 flex items-end justify-center pb-0 overflow-hidden">
              <div
                className="relative w-48 h-48 rounded-full opacity-15"
                style={{ background: `radial-gradient(circle, ${teacher.bg}, transparent)` }}
              />
              <div
                className="absolute bottom-0 right-8 w-36 h-36 rounded-full flex items-center justify-center text-6xl"
                style={{ background: `${teacher.bg}40` }}
              >
                <span
                  className="text-4xl font-black"
                  style={{ color: teacher.bg }}
                >
                  {teacher.initials}
                </span>
              </div>
              {/* Light beam */}
              <div
                className="absolute inset-0 opacity-5"
                style={{ background: "linear-gradient(to left, white, transparent)" }}
              />
            </div>
          </div>

          {/* Profile info */}
          <div className="px-6 pb-6">
            {/* Avatar row */}
            <div className="flex items-end justify-between -mt-10 mb-4">
              {/* Gradient border avatar */}
              <div
                className="rounded-full shrink-0"
                style={{
                  background: "linear-gradient(135deg, #F97316, #EC4899, #8B5CF6)",
                  padding: "3px",
                }}
              >
                <div
                  className="rounded-full bg-white"
                  style={{ padding: "3px" }}
                >
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-black"
                    style={{ background: teacher.bg, color: teacher.color }}
                  >
                    {teacher.initials}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-12">
                <button
                  onClick={() => setFollowed((f) => !f)}
                  className="px-5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: followed ? "#6B7280" : "#2563EB" }}
                >
                  {followed ? "Following ✓" : "Follow"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
                  <AiOutlineMessage className="w-4 h-4" />
                  Message
                </button>
                <button
                  className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-all"
                >
                  <AiOutlineUserAdd className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Name + info + summary row */}
            <div className="flex gap-6 flex-col lg:flex-row">

              {/* Left: name, stats, location */}
              <div className="flex-1 min-w-0">
                {/* Online status */}
                {teacher.available && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    <span className="text-xs text-green-600 font-medium">Online</span>
                  </div>
                )}

                {/* Name */}
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-gray-900">{teacher.name}</h1>
                  {teacher.verified && (
                    <BsShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{teacher.tagline}</p>

                {/* Social stats */}
                <div className="flex items-center gap-5 mt-3 pb-3 border-b border-gray-100">
                  {[
                    { label: "Posts", value: teacher.posts },
                    { label: "Students", value: teacher.followers },
                    { label: "Following", value: teacher.following },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <div className="text-base font-bold text-gray-900">{s.value}</div>
                      <div className="text-xs text-gray-400">{s.label}</div>
                    </div>
                  ))}
                  <div className="ml-4">
                    <StarRow rating={teacher.rating} reviews={teacher.reviews} />
                  </div>
                </div>

                {/* Location + language */}
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <AiOutlineEnvironment className="w-4 h-4 text-gray-400" />
                    {teacher.city === "Online" ? "India (Online)" : `${teacher.city}, India`}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <AiOutlineGlobal className="w-4 h-4 text-gray-400" />
                    {teacher.languages.join(", ")}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {teacher.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Professional Summary card */}
              <div
                className="lg:w-72 shrink-0 rounded-xl border border-blue-100 p-4"
                style={{ background: "#F0F7FF" }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiBookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold text-blue-800">Professional Summary</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{teacher.summary}</p>
                <div className="mt-3 pt-3 border-t border-blue-100">
                  <div className="text-xs text-gray-500 font-medium mb-1">Rate</div>
                  <div className="text-lg font-bold text-orange-600">₹{teacher.rate}/hr</div>
                  <div className="flex gap-2 mt-2.5">
                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{ background: "#E8621A" }}
                    >
                      Send Inquiry
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg text-sm font-medium border border-blue-200 text-blue-700 hover:bg-blue-50 transition-all"
                    >
                      Book Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Highlights / Stories row ── */}
        <div className="bg-white rounded-2xl shadow-sm px-5 py-4">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-1">
            {teacher.highlights.map((h) => (
              <div key={h.label} className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-transparent group-hover:border-orange-400 transition-all"
                  style={{
                    background: `linear-gradient(white, white) padding-box, linear-gradient(135deg, #F97316, #EC4899, #8B5CF6) border-box`,
                    borderWidth: "2.5px",
                    borderStyle: "solid",
                    borderColor: "transparent",
                    backgroundClip: "padding-box, border-box",
                    backgroundOrigin: "padding-box, border-box",
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center text-2xl"
                    style={{ background: h.bg }}
                  >
                    {h.emoji}
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium text-center whitespace-nowrap">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Photos / Videos ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {(["photos", "videos"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setPhotoTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold uppercase tracking-wide transition-all ${
                  photoTab === tab
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {tab === "photos" ? <BsGrid3X3 className="w-4 h-4" /> : <BsCameraVideo className="w-4 h-4" />}
                {tab}
              </button>
            ))}
          </div>

          {photoTab === "photos" ? (
            <div>
              <div className="grid grid-cols-4 gap-0.5">
                {teacher.photoCards.map((p, i) => (
                  <div
                    key={i}
                    className="aspect-square relative cursor-pointer group overflow-hidden"
                    style={{ background: p.bg }}
                  >
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-3xl mb-1.5">{p.emoji}</span>
                      <div
                        className="text-xs font-bold leading-tight"
                        style={{ color: p.textColor }}
                      >
                        {p.label}
                      </div>
                      <div
                        className="text-[10px] mt-0.5 opacity-80"
                        style={{ color: p.textColor }}
                      >
                        {p.sub}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  </div>
                ))}
              </div>
              <div className="py-3 text-center border-t border-gray-100">
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  See all photos
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {teacher.videoCards.map((v, i) => (
                  <div key={i} className="cursor-pointer group">
                    <div
                      className="aspect-video rounded-xl relative overflow-hidden flex items-center justify-center"
                      style={{ background: v.bg }}
                    >
                      <span className="text-4xl opacity-30">{v.emoji}</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all">
                          <AiOutlinePlayCircle className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                        {v.duration}
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-semibold text-gray-800 line-clamp-2">{v.title}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{v.views} views</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-3 text-center border-t border-gray-100 mt-3">
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                  See all videos
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom stats bar ── */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-gray-100">
            {teacher.statsBar.map((s, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-4 ${i >= 2 ? "border-t border-gray-100 sm:border-t-0" : ""}`}
              >
                <span className="text-2xl shrink-0">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{s.label}</div>
                  <div className="text-sm font-bold text-gray-900 truncate">{s.value}</div>
                  <div className="text-[11px] text-gray-400 truncate">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Footer quote ── */}
        <div
          className="rounded-2xl py-5 px-8 text-center shadow-sm"
          style={{ background: "#0F172A" }}
        >
          <span className="text-amber-400 text-2xl mr-2">"</span>
          <span className="text-white text-sm italic font-medium">{teacher.footerQuote}</span>
          <span className="text-amber-400 text-2xl ml-2">"</span>
        </div>

      </div>

      {/* Floating CTA (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-3 sm:hidden z-40">
        <button className="flex-1 py-3 rounded-xl text-sm font-semibold border border-gray-200 text-gray-700">
          Message
        </button>
        <button
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-white"
          style={{ background: "#E8621A" }}
        >
          Send Inquiry
        </button>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  );
}

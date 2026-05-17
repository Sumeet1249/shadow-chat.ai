/**
 * Icon.tsx — Lucide React SVG icon wrapper
 *
 * Replaces the prototype's <I n="material-symbol-name" /> pattern.
 * Maps all 35+ Material Symbols names used in the prototype to Lucide equivalents.
 * Uses named exports from lucide-react — no dynamic require, fully tree-shakeable.
 */
import {
  // Core navigation & layout
  LayoutDashboard, Settings, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  ArrowLeft, ArrowRight, ArrowDown, ArrowUp, Menu, X, Plus, Minus, Check,
  // Content & actions
  Copy, Edit, Trash2, Save, Send, Download, Upload, RefreshCw, RotateCcw,
  Search, Filter, SortAsc, MoreVertical, ExternalLink, Link,
  // Status & feedback
  AlertTriangle, CheckCircle, XCircle, Info, Loader2, Eye, EyeOff,
  // Communication
  MessageSquare, Mic, MicOff, Square, Play, Pause, Volume2,
  // Data & analytics
  BarChart2, TrendingUp, Activity, LineChart, PieChart,
  // People & team
  User, Users, UserPlus, UserCheck, Shield, ShieldOff, Lock, Unlock, Key,
  // Tech & system
  Cpu, HardDrive, Globe, Network, Radio, Wifi, Server,
  Terminal, Code, Code2, Braces, Database, Cloud, GitBranch,
  // AI & Neural
  Brain, Sparkles, Bot, Lightbulb, Stars, Wand2,
  // Files & storage
  FileText, File, Folder, Archive, BookOpen, Bookmark,
  // UI elements
  ToggleLeft, ToggleRight, Sliders, Star, Heart, Trophy, Medal, Crown,
  Rocket, Target, Crosshair, Compass, Map, MapPin, Radar,
  // Commerce (no billing/payment)
  ShoppingBag, Package, Gift, Tag,
  // Misc
  AlertCircle, Bell, BellOff, Calendar, Clock, Timer,
  Rss, Store, Gamepad2,
  AtSign, Briefcase, MessageCircle, Headphones, Mail,
  type LucideProps,
} from 'lucide-react'
import type { FC } from 'react'

// ── Material Symbols → Lucide name map ──────────────────────────
// Covers every icon used across all 30+ prototype components.
const ICON_MAP: Record<string, FC<LucideProps>> = {
  // Navigation & Shell
  dashboard:       LayoutDashboard,
  settings:        Settings,
  menu:            Menu,
  close:           X,
  add:             Plus,
  remove:          Minus,
  check:           Check,
  arrow_back:      ArrowLeft,
  arrow_forward:   ArrowRight,
  arrow_downward:  ArrowDown,
  chevron_left:    ChevronLeft,
  chevron_right:   ChevronRight,
  expand_more:     ChevronDown,
  expand_less:     ChevronUp,
  more_vert:       MoreVertical,
  open_in_new:     ExternalLink,

  // AI & Neural
  psychology:      Brain,
  auto_awesome:    Sparkles,
  smart_toy:       Bot,
  lightbulb:       Lightbulb,
  stars:           Stars,
  wand:            Wand2,

  // Communication
  chat_bubble:     MessageSquare,
  chat:            MessageSquare,
  mic:             Mic,
  mic_none:        MicOff,
  stop:            Square,
  play_arrow:      Play,
  pause:           Pause,
  volume_up:       Volume2,
  send:            Send,

  // Data & Analytics
  analytics:       BarChart2,
  monitoring:      Activity,
  trending_up:     TrendingUp,
  show_chart:      LineChart,
  pie_chart:       PieChart,
  bar_chart:       BarChart2,
  speed:           Activity,

  // Infrastructure & Tech
  hub:             Network,
  memory:          HardDrive,
  dns:             Server,
  developer_board: Cpu,
  cloud:           Cloud,
  wifi:            Wifi,
  radio:           Radio,
  terminal:        Terminal,
  code:            Code,
  data_object:     Braces,
  database:        Database,
  storage:         Archive,
  api:             Code2,
  globe:           Globe,

  // People & Security
  person:          User,
  group:           Users,
  person_add:      UserPlus,
  person_check:    UserCheck,
  shield:          Shield,
  lock:            Lock,
  lock_open:       Unlock,
  key:             Key,

  // Status & Feedback
  warning:         AlertTriangle,
  error:           XCircle,
  check_circle:    CheckCircle,
  info:            Info,
  cancel:          XCircle,
  help:            Info,
  alarm:           AlertCircle,
  notifications:   Bell,
  notifications_off: BellOff,

  // Files & Storage
  description:     FileText,
  file_copy:       File,
  folder:          Folder,
  archive:         Archive,
  book:            BookOpen,
  bookmark:        Bookmark,

  // Actions
  content_copy:    Copy,
  edit:            Edit,
  delete:          Trash2,
  save:            Save,
  download:        Download,
  upload:          Upload,
  refresh:         RefreshCw,
  restart_alt:     RotateCcw,
  replay:          RotateCcw,
  search:          Search,
  filter_list:     Filter,
  sort:            SortAsc,
  link:            Link,

  // UI Controls
  toggle_on:       ToggleRight,
  toggle_off:      ToggleLeft,
  tune:            Sliders,
  sliders:         Sliders,
  star:            Star,
  favorite:        Heart,
  emoji_events:    Trophy,
  military_tech:   Medal,
  workspace_premium: Crown,

  // Navigation (Landing)
  rocket_launch:   Rocket,
  target:          Target,
  gps_fixed:       Crosshair,
  explore:         Compass,
  map:             Map,
  location_on:     MapPin,
  radar:           Radar,

  // Time
  calendar_today:  Calendar,
  schedule:        Clock,
  timer:           Timer,

  // Loading
  autorenew:       Loader2,

  // Auth
  visibility:      Eye,
  visibility_off:  EyeOff,
  login:           ArrowRight,
  logout:          ArrowLeft,
  upgrade:         TrendingUp,
  arrow_upward:    ArrowUp,

  // Misc
  account_tree:    GitBranch,
  recommend:       Lightbulb,
  home:            LayoutDashboard,
  shopping_bag:    ShoppingBag,
  inventory_2:     Package,
  redeem:          Gift,
  label:           Tag,
  openai:          Bot,
  anthropic:       Sparkles,
  rss_feed:        Rss,
  storefront:      Store,
  sports_esports:  Gamepad2,
  alternate_email: AtSign,
  business:        Briefcase,
  forum:           MessageCircle,
  groups:          Users,
  mail:            Mail,
  gpp_bad:         ShieldOff,
  headset_mic:     Headphones,
  publish:         Upload,
}

// ── Component ───────────────────────────────────────────────────

interface IconProps {
  /** Material Symbols name OR Lucide component name (both accepted) */
  name: string
  size?: number
  color?: string
  className?: string
  strokeWidth?: number
  'aria-hidden'?: boolean
  'aria-label'?: string
  style?: React.CSSProperties
}

/**
 * Icon — Universal icon component.
 *
 * Usage:
 *   <Icon name="psychology" size={20} color="var(--cyan)" />
 *   <Icon name="auto_awesome" size={16} />
 */
export function Icon({
  name,
  size = 18,
  color,
  className,
  strokeWidth = 1.75,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
  style,
}: IconProps) {
  const Component = ICON_MAP[name]

  if (!Component) {
    // Fallback: render nothing rather than crash
    if (import.meta.env.DEV) {
      console.warn(`[Icon] No mapping found for icon name: "${name}"`)
    }
    return null
  }

  return (
    <Component
      size={size}
      color={color}
      className={className}
      strokeWidth={strokeWidth}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
      style={style}
    />
  )
}

export default Icon

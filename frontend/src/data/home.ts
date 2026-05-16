import heroImg from '../assets/images/Cybertrack.avif';
import truckImg from '../assets/images/pula-20000-sdb-46398d-preview-1.png';

export const brand = {
  tag: '[ TT ]',
  name: 'TRACKTRUCK',
  tagline: 'Fleet Operations Platform',
  headline: 'COMMAND THE FLEET',
  subhead:
    'Trip logging, live driver telemetry, and dispatch visibility in one sci-fi operations layer.',
};

export const primaryNavLinks = [
  { href: '#features', label: 'Features' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#workflow', label: 'Workflow' },
  { href: '#contact', label: 'Contact' },
] as const;

export const authLinks = {
  login: { href: '/login', label: 'Sign in' },
  register: { href: '/register', label: 'Get started' },
};

export const heroStats = [
  { value: '128', label: 'Active trips' },
  { value: '96%', label: 'On-time rate' },
  { value: '14', label: 'Vehicles online' },
  { value: '4m', label: 'Avg. sync' },
] as const;

export const tickerItems = [
  'Trip logging',
  'Live GPS',
  'Driver map',
  'Admin dashboard',
  'CSV export',
  'Role access',
  'Hex telemetry',
] as const;

export const landingFeatures = [
  {
    id: 'dash',
    eyebrow: 'Operations',
    title: 'Trip dashboard',
    desc: 'Active, delayed, and completed trips in one grid.',
    icon: '◈',
  },
  {
    id: 'trips',
    eyebrow: 'Planning',
    title: 'Add & edit trips',
    desc: 'Structured records for routes, vehicles, and costs.',
    icon: '⬡',
  },
  {
    id: 'drivers',
    eyebrow: 'Telemetry',
    title: 'Live driver map',
    desc: 'Admins see real-time driver positions on the dashboard.',
    icon: '◎',
  },
  {
    id: 'history',
    eyebrow: 'History',
    title: 'All trips view',
    desc: 'Search, paginate, and export fleet history.',
    icon: '▣',
  },
  {
    id: 'roles',
    eyebrow: 'Access',
    title: 'Role-based UI',
    desc: 'Drivers, owners, and admins get the right tools only.',
    icon: '⬢',
  },
  {
    id: 'export',
    eyebrow: 'Reporting',
    title: 'Export-ready data',
    desc: 'Clean tables for finance and monthly reconciliation.',
    icon: '◆',
  },
] as const;

export const landingSteps = [
  { n: '01', title: 'Create account', desc: 'Register your fleet workspace.' },
  { n: '02', title: 'Log trips', desc: 'Drivers capture routes from the field.' },
  { n: '03', title: 'Track live', desc: 'GPS feeds the admin command map.' },
  { n: '04', title: 'Export', desc: 'Send records to finance in one click.' },
] as const;

export const solutions = [
  {
    title: 'For drivers',
    points: ['Add trips in seconds', 'Share location on dashboard', 'Mobile-friendly forms'],
  },
  {
    title: 'For admins',
    points: ['Live driver map', 'Edit any trip', 'Download CSV reports'],
  },
] as const;

export const footerColumns = [
  {
    title: 'Product',
    links: primaryNavLinks.map((l) => ({ href: l.href, label: l.label })),
  },
  {
    title: 'Account',
    links: [
      { href: '/login', label: 'Sign in' },
      { href: '/register', label: 'Create account' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: '#contact', label: 'Contact' },
      { href: 'mailto:support@tracktruck.io', label: 'support@tracktruck.io' },
    ],
  },
] as const;

export const images = {
  hero: heroImg,
  truck: truckImg,
  map: heroImg,
};

export const sectionCopy = {
  features: {
    eyebrow: 'Platform',
    title: 'Operations Grid',
    desc: 'Modular panels for fleet visibility — built for speed and clarity.',
  },
  solutions: {
    eyebrow: 'Solutions',
    title: 'Built for every role',
    desc: 'Drivers on the road. Admins in command.',
  },
  workflow: {
    eyebrow: 'Workflow',
    title: 'Route to record',
    desc: 'From capture to export in four steps.',
  },
  cta: {
    eyebrow: 'Initialize',
    title: 'Engage fleet control',
    button: 'Start tracking',
  },
  footer: {
    blurb: 'Fleet operations platform for trip logging, live maps, and reporting.',
  },
};

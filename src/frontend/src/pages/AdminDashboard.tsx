import { generatePartnerPlans } from "@/lib/generatePartnerPlans";
import {
  type PartnerRegistration as StoredPartnerReg,
  getPartnerRegistrations,
  updatePartnerStatus,
} from "@/lib/partnerStore";
import { useNavigate } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle,
  CreditCard,
  Edit,
  Eye,
  Globe,
  LogOut,
  Megaphone,
  Menu,
  MessageSquare,
  Plus,
  Receipt,
  Search,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import CRMDashboard from "./CRMDashboard";
import DigitalMarketing from "./DigitalMarketing";

// ─── Types ───────────────────────────────────────────────────────────────────

type PartnerStatus = "Pending" | "Approved" | "Verified" | "Rejected";
type PartnerType = "Travel Agent" | "Hotel Partner" | "DMC Partner";
type LeadStatus = "Active" | "Converted" | "Archived";
type InquiryStatus = "New" | "Contacted" | "Confirmed" | "Deleted";
type PlanType = "Starter" | "Professional" | "Premium";
type PlanStatus = "Active" | "Inactive" | "Expired";

interface PartnerReg {
  id: number;
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  experience?: string;
  date: string;
  status: PartnerStatus;
  planStatus?: string;
  isNew?: boolean;
  partnerType?: PartnerType;
}

interface Lead {
  id: number;
  customer: string;
  destination: string;
  travelDate: string;
  travelers: number;
  budget: string;
  phone: string;
  assignedTo: string;
  email?: string;
  message?: string;
  leadSource?: "Website" | "WhatsApp" | "Form";
  status?: LeadStatus;
  isNew?: boolean;
}

interface BookingInquiry {
  id: number;
  customerName: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  travelers: number;
  budget: string;
  message: string;
  inquiryDate: string;
  status: InquiryStatus;
  assignedTo?: string;
}

interface PartnerPlan {
  id: number;
  partnerName: string;
  company: string;
  city?: string;
  planType: PlanType;
  price: string;
  startDate: string;
  expiryDate: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
  status: PlanStatus;
}

interface Booking {
  id: number;
  customer: string;
  destination: string;
  partner: string;
  value: string;
  date: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface HotelBooking {
  id: number;
  customerName: string;
  hotelName: string;
  city: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  bookingValue: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface DmcBooking {
  id: number;
  customerName: string;
  destination: string;
  dmcPartner: string;
  serviceType: string;
  travelDate: string;
  bookingValue: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface PaymentRequest {
  id: string;
  name: string;
  phone: string;
  plan: string;
  planLabel: string;
  amount: string;
  transactionId: string;
  screenshot: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

// ─── Sample Data ─────────────────────────────────────────────────────────────

const INITIAL_REGISTRATIONS: PartnerReg[] = [
  {
    id: 1,
    name: "Rajesh Sharma",
    company: "Horizon Travels",
    phone: "+91 98765 43210",
    email: "rajesh@horizontravels.in",
    city: "Delhi",
    date: "2026-03-01",
    status: "Pending",
    planStatus: "None",
    partnerType: "Travel Agent",
  },
  {
    id: 2,
    name: "Priya Mehta",
    company: "SkyWing Tours",
    phone: "+91 87654 32109",
    email: "priya@skywingtours.in",
    city: "Mumbai",
    date: "2026-03-03",
    status: "Approved",
    planStatus: "Professional",
    partnerType: "Hotel Partner",
  },
  {
    id: 3,
    name: "Aman Gupta",
    company: "TravelEase India",
    phone: "+91 76543 21098",
    email: "aman@travelease.in",
    city: "Bangalore",
    date: "2026-02-28",
    status: "Verified",
    planStatus: "Premium",
    partnerType: "DMC Partner",
  },
  {
    id: 4,
    name: "Sunita Verma",
    company: "Wanderlust Pvt Ltd",
    phone: "+91 65432 10987",
    email: "sunita@wanderlust.in",
    city: "Chennai",
    date: "2026-02-25",
    status: "Pending",
    planStatus: "None",
    partnerType: "Travel Agent",
  },
  {
    id: 5,
    name: "Vikram Singh",
    company: "BlueSky Holidays",
    phone: "+91 54321 09876",
    email: "vikram@bluesky.in",
    city: "Jaipur",
    date: "2026-02-20",
    status: "Approved",
    planStatus: "Starter",
    partnerType: "Hotel Partner",
  },
];

const INITIAL_LEADS: Lead[] = [
  {
    id: 1,
    customer: "Ankit Joshi",
    destination: "Dubai",
    travelDate: "2026-04-15",
    travelers: 2,
    budget: "₹1,20,000",
    phone: "+91 98111 22333",
    assignedTo: "Horizon Travels",
    leadSource: "Website",
    status: "Active",
  },
  {
    id: 2,
    customer: "Kavita Rao",
    destination: "Goa",
    travelDate: "2026-05-01",
    travelers: 4,
    budget: "₹60,000",
    phone: "+91 97222 33444",
    assignedTo: "",
    leadSource: "Form",
    status: "Active",
  },
  {
    id: 3,
    customer: "Suresh Nair",
    destination: "Thailand",
    travelDate: "2026-06-10",
    travelers: 3,
    budget: "₹90,000",
    phone: "+91 96333 44555",
    assignedTo: "SkyWing Tours",
    leadSource: "WhatsApp",
    status: "Converted",
  },
  {
    id: 4,
    customer: "Meena Patel",
    destination: "Manali",
    travelDate: "2026-03-25",
    travelers: 5,
    budget: "₹55,000",
    phone: "+91 95444 55666",
    assignedTo: "",
    leadSource: "Website",
    status: "Active",
  },
  {
    id: 5,
    customer: "Ravi Kumar",
    destination: "Kerala",
    travelDate: "2026-07-20",
    travelers: 2,
    budget: "₹70,000",
    phone: "+91 94555 66777",
    assignedTo: "BlueSky Holidays",
    leadSource: "Form",
    status: "Active",
  },
  {
    id: 6,
    customer: "Pooja Sharma",
    destination: "Singapore",
    travelDate: "2026-08-05",
    travelers: 2,
    budget: "₹1,50,000",
    phone: "+91 93666 77888",
    assignedTo: "",
    leadSource: "Website",
    status: "Archived",
  },
];

const INITIAL_INQUIRIES: BookingInquiry[] = [
  {
    id: 1,
    customerName: "Rohit Agarwal",
    phone: "+91 98001 11222",
    email: "rohit@gmail.com",
    destination: "Dubai",
    travelDate: "2026-04-20",
    travelers: 2,
    budget: "₹1,30,000",
    message: "Looking for a honeymoon package.",
    inquiryDate: "2026-03-10",
    status: "New",
  },
  {
    id: 2,
    customerName: "Sneha Jain",
    phone: "+91 97002 22333",
    email: "sneha@gmail.com",
    destination: "Maldives",
    travelDate: "2026-05-15",
    travelers: 2,
    budget: "₹2,00,000",
    message: "Beach villa preferred.",
    inquiryDate: "2026-03-09",
    status: "Contacted",
  },
  {
    id: 3,
    customerName: "Deepak Verma",
    phone: "+91 96003 33444",
    email: "deepak@gmail.com",
    destination: "Thailand",
    travelDate: "2026-06-01",
    travelers: 4,
    budget: "₹1,20,000",
    message: "Family trip with kids.",
    inquiryDate: "2026-03-08",
    status: "New",
  },
  {
    id: 4,
    customerName: "Priya Singh",
    phone: "+91 95004 44555",
    email: "priya@gmail.com",
    destination: "Goa",
    travelDate: "2026-03-28",
    travelers: 5,
    budget: "₹80,000",
    message: "Group trip, need budget hotel.",
    inquiryDate: "2026-03-07",
    status: "Confirmed",
  },
  {
    id: 5,
    customerName: "Arun Mishra",
    phone: "+91 94005 55666",
    email: "arun@gmail.com",
    destination: "Kashmir",
    travelDate: "2026-07-10",
    travelers: 3,
    budget: "₹75,000",
    message: "Adventure activities required.",
    inquiryDate: "2026-03-06",
    status: "New",
  },
  {
    id: 6,
    customerName: "Nita Bose",
    phone: "+91 93006 66777",
    email: "nita@gmail.com",
    destination: "Europe",
    travelDate: "2026-09-15",
    travelers: 2,
    budget: "₹3,50,000",
    message: "10-day Europe tour.",
    inquiryDate: "2026-03-05",
    status: "New",
  },
];

const INITIAL_PLANS: PartnerPlan[] = generatePartnerPlans();

const PARTNER_NAMES = [
  "Horizon Travels",
  "SkyWing Tours",
  "TravelEase India",
  "Wanderlust Pvt Ltd",
  "BlueSky Holidays",
  "Globe Trotters",
  "Dreamland Travels",
];

const HOTEL_BOOKINGS: HotelBooking[] = [
  {
    id: 1,
    customerName: "Rahul Mehta",
    hotelName: "Taj Palace",
    city: "Delhi",
    roomType: "Deluxe Suite",
    checkIn: "2026-04-10",
    checkOut: "2026-04-13",
    bookingValue: "₹32,000",
    status: "Confirmed",
  },
  {
    id: 2,
    customerName: "Sneha Sharma",
    hotelName: "Leela Palace",
    city: "Jaipur",
    roomType: "Heritage Room",
    checkIn: "2026-04-15",
    checkOut: "2026-04-18",
    bookingValue: "₹28,500",
    status: "Confirmed",
  },
  {
    id: 3,
    customerName: "Amit Kumar",
    hotelName: "Taj Lake Palace",
    city: "Udaipur",
    roomType: "Lake View Room",
    checkIn: "2026-05-01",
    checkOut: "2026-05-04",
    bookingValue: "₹45,000",
    status: "Pending",
  },
  {
    id: 4,
    customerName: "Pooja Singh",
    hotelName: "The Oberoi",
    city: "Mumbai",
    roomType: "Sea View Suite",
    checkIn: "2026-05-10",
    checkOut: "2026-05-12",
    bookingValue: "₹38,000",
    status: "Confirmed",
  },
  {
    id: 5,
    customerName: "Vikash Yadav",
    hotelName: "Radisson Blu",
    city: "Goa",
    roomType: "Beach Villa",
    checkIn: "2026-03-28",
    checkOut: "2026-04-01",
    bookingValue: "₹22,000",
    status: "Confirmed",
  },
  {
    id: 6,
    customerName: "Neha Gupta",
    hotelName: "ITC Grand",
    city: "Kolkata",
    roomType: "Grand Suite",
    checkIn: "2026-06-05",
    checkOut: "2026-06-08",
    bookingValue: "₹18,000",
    status: "Pending",
  },
  {
    id: 7,
    customerName: "Sanjay Patel",
    hotelName: "Hyatt Regency",
    city: "Bangalore",
    roomType: "Regency Club",
    checkIn: "2026-06-12",
    checkOut: "2026-06-14",
    bookingValue: "₹15,500",
    status: "Confirmed",
  },
  {
    id: 8,
    customerName: "Ritu Agarwal",
    hotelName: "Marriott",
    city: "Pune",
    roomType: "Deluxe Room",
    checkIn: "2026-07-01",
    checkOut: "2026-07-03",
    bookingValue: "₹12,000",
    status: "Cancelled",
  },
  {
    id: 9,
    customerName: "Deepak Verma",
    hotelName: "Sheraton",
    city: "Chennai",
    roomType: "Sea View",
    checkIn: "2026-07-10",
    checkOut: "2026-07-13",
    bookingValue: "₹14,000",
    status: "Confirmed",
  },
  {
    id: 10,
    customerName: "Kavita Joshi",
    hotelName: "JW Marriott",
    city: "Delhi",
    roomType: "Executive Suite",
    checkIn: "2026-07-20",
    checkOut: "2026-07-22",
    bookingValue: "₹25,000",
    status: "Pending",
  },
  {
    id: 11,
    customerName: "Manish Tiwari",
    hotelName: "Taj Palace",
    city: "Delhi",
    roomType: "Standard Room",
    checkIn: "2026-08-01",
    checkOut: "2026-08-03",
    bookingValue: "₹16,000",
    status: "Confirmed",
  },
  {
    id: 12,
    customerName: "Priya Nair",
    hotelName: "Leela Palace",
    city: "Jaipur",
    roomType: "Royal Suite",
    checkIn: "2026-08-10",
    checkOut: "2026-08-14",
    bookingValue: "₹42,000",
    status: "Confirmed",
  },
  {
    id: 13,
    customerName: "Arun Mishra",
    hotelName: "Radisson Blu",
    city: "Goa",
    roomType: "Garden Room",
    checkIn: "2026-08-20",
    checkOut: "2026-08-24",
    bookingValue: "₹19,000",
    status: "Pending",
  },
  {
    id: 14,
    customerName: "Sunita Reddy",
    hotelName: "The Oberoi",
    city: "Mumbai",
    roomType: "Luxury Room",
    checkIn: "2026-09-01",
    checkOut: "2026-09-03",
    bookingValue: "₹29,000",
    status: "Confirmed",
  },
  {
    id: 15,
    customerName: "Rajesh Kumar",
    hotelName: "Hyatt Regency",
    city: "Bangalore",
    roomType: "King Room",
    checkIn: "2026-09-10",
    checkOut: "2026-09-12",
    bookingValue: "₹13,500",
    status: "Cancelled",
  },
  {
    id: 16,
    customerName: "Meena Sharma",
    hotelName: "ITC Grand",
    city: "Kolkata",
    roomType: "Business Suite",
    checkIn: "2026-09-15",
    checkOut: "2026-09-17",
    bookingValue: "₹17,000",
    status: "Confirmed",
  },
  {
    id: 17,
    customerName: "Arjun Singh",
    hotelName: "Sheraton",
    city: "Chennai",
    roomType: "Deluxe Twin",
    checkIn: "2026-10-01",
    checkOut: "2026-10-04",
    bookingValue: "₹11,500",
    status: "Pending",
  },
  {
    id: 18,
    customerName: "Divya Patel",
    hotelName: "JW Marriott",
    city: "Delhi",
    roomType: "Club Room",
    checkIn: "2026-10-10",
    checkOut: "2026-10-12",
    bookingValue: "₹20,000",
    status: "Confirmed",
  },
  {
    id: 19,
    customerName: "Rohit Jain",
    hotelName: "Marriott",
    city: "Pune",
    roomType: "Suite",
    checkIn: "2026-10-20",
    checkOut: "2026-10-23",
    bookingValue: "₹8,500",
    status: "Confirmed",
  },
  {
    id: 20,
    customerName: "Ankita Roy",
    hotelName: "Taj Lake Palace",
    city: "Udaipur",
    roomType: "Heritage Suite",
    checkIn: "2026-11-01",
    checkOut: "2026-11-04",
    bookingValue: "₹44,000",
    status: "Pending",
  },
];

const DMC_BOOKINGS: DmcBooking[] = [
  {
    id: 1,
    customerName: "Rohit Agarwal",
    destination: "Kedarnath",
    dmcPartner: "Char Dham Yatra Services",
    serviceType: "Pilgrimage Tours",
    travelDate: "2026-05-10",
    bookingValue: "₹12,000",
    status: "Confirmed",
  },
  {
    id: 2,
    customerName: "Sneha Jain",
    destination: "Badrinath",
    dmcPartner: "Himalayan Adventures",
    serviceType: "Pilgrimage Tours",
    travelDate: "2026-05-20",
    bookingValue: "₹10,500",
    status: "Confirmed",
  },
  {
    id: 3,
    customerName: "Deepak Verma",
    destination: "Goa",
    dmcPartner: "Goa Ground Services",
    serviceType: "Airport Transfers",
    travelDate: "2026-04-15",
    bookingValue: "₹3,500",
    status: "Confirmed",
  },
  {
    id: 4,
    customerName: "Priya Singh",
    destination: "Kerala",
    dmcPartner: "Kerala DMC",
    serviceType: "Backwater Cruise",
    travelDate: "2026-06-01",
    bookingValue: "₹9,000",
    status: "Pending",
  },
  {
    id: 5,
    customerName: "Arun Mishra",
    destination: "Manali",
    dmcPartner: "Himachal DMC",
    serviceType: "Adventure Tours",
    travelDate: "2026-06-15",
    bookingValue: "₹15,000",
    status: "Confirmed",
  },
  {
    id: 6,
    customerName: "Nita Bose",
    destination: "Kashmir",
    dmcPartner: "Kashmir Travel Co",
    serviceType: "Local Sightseeing",
    travelDate: "2026-07-01",
    bookingValue: "₹8,500",
    status: "Confirmed",
  },
  {
    id: 7,
    customerName: "Vikash Yadav",
    destination: "Gangotri",
    dmcPartner: "Char Dham Yatra Services",
    serviceType: "Pilgrimage Tours",
    travelDate: "2026-05-25",
    bookingValue: "₹11,000",
    status: "Pending",
  },
  {
    id: 8,
    customerName: "Meena Patel",
    destination: "Rishikesh",
    dmcPartner: "Himalayan Adventures",
    serviceType: "Adventure Tours",
    travelDate: "2026-04-20",
    bookingValue: "₹7,500",
    status: "Confirmed",
  },
  {
    id: 9,
    customerName: "Ravi Kumar",
    destination: "Yamunotri",
    dmcPartner: "Char Dham Yatra Services",
    serviceType: "Pilgrimage Tours",
    travelDate: "2026-05-15",
    bookingValue: "₹13,500",
    status: "Confirmed",
  },
  {
    id: 10,
    customerName: "Pooja Sharma",
    destination: "Himachal Pradesh",
    dmcPartner: "Himachal DMC",
    serviceType: "Snow Trekking",
    travelDate: "2026-01-10",
    bookingValue: "₹18,000",
    status: "Cancelled",
  },
  {
    id: 11,
    customerName: "Sanjay Patel",
    destination: "Uttarakhand",
    dmcPartner: "Himalayan Adventures",
    serviceType: "Jungle Safari",
    travelDate: "2026-09-05",
    bookingValue: "₹6,500",
    status: "Confirmed",
  },
  {
    id: 12,
    customerName: "Kavita Joshi",
    destination: "Kerala",
    dmcPartner: "Kerala DMC",
    serviceType: "Local Sightseeing",
    travelDate: "2026-08-15",
    bookingValue: "₹5,000",
    status: "Confirmed",
  },
  {
    id: 13,
    customerName: "Manish Tiwari",
    destination: "Goa",
    dmcPartner: "Goa Ground Services",
    serviceType: "Local Sightseeing",
    travelDate: "2026-10-01",
    bookingValue: "₹4,500",
    status: "Pending",
  },
  {
    id: 14,
    customerName: "Ritu Agarwal",
    destination: "Kashmir",
    dmcPartner: "Kashmir Travel Co",
    serviceType: "Heritage Walk",
    travelDate: "2026-07-20",
    bookingValue: "₹6,000",
    status: "Confirmed",
  },
  {
    id: 15,
    customerName: "Arjun Singh",
    destination: "Manali",
    dmcPartner: "Himachal DMC",
    serviceType: "Adventure Tours",
    travelDate: "2026-07-10",
    bookingValue: "₹16,500",
    status: "Confirmed",
  },
  {
    id: 16,
    customerName: "Divya Patel",
    destination: "Rishikesh",
    dmcPartner: "Himalayan Adventures",
    serviceType: "Adventure Tours",
    travelDate: "2026-06-25",
    bookingValue: "₹8,000",
    status: "Confirmed",
  },
  {
    id: 17,
    customerName: "Sunita Reddy",
    destination: "Kerala",
    dmcPartner: "Kerala DMC",
    serviceType: "Backwater Cruise",
    travelDate: "2026-09-10",
    bookingValue: "₹9,500",
    status: "Pending",
  },
  {
    id: 18,
    customerName: "Rajesh Kumar",
    destination: "Uttarakhand",
    dmcPartner: "Himalayan Adventures",
    serviceType: "Pilgrimage Tours",
    travelDate: "2026-05-05",
    bookingValue: "₹14,000",
    status: "Confirmed",
  },
  {
    id: 19,
    customerName: "Ankita Roy",
    destination: "Goa",
    dmcPartner: "Goa Ground Services",
    serviceType: "Airport Transfers",
    travelDate: "2026-11-10",
    bookingValue: "₹3,800",
    status: "Confirmed",
  },
  {
    id: 20,
    customerName: "Neha Gupta",
    destination: "Badrinath",
    dmcPartner: "Char Dham Yatra Services",
    serviceType: "Pilgrimage Tours",
    travelDate: "2026-06-10",
    bookingValue: "₹12,500",
    status: "Pending",
  },
];

// ─── Color Maps ───────────────────────────────────────────────────────────────

const statusColors: Record<PartnerStatus, { bg: string; color: string }> = {
  Pending: { bg: "#fef9c3", color: "#854d0e" },
  Approved: { bg: "#dcfce7", color: "#166534" },
  Verified: { bg: "#dbeafe", color: "#1e3a8a" },
  Rejected: { bg: "#fee2e2", color: "#991b1b" },
};

const inquiryStatusColors: Record<
  InquiryStatus,
  { bg: string; color: string }
> = {
  New: { bg: "#dbeafe", color: "#1e3a8a" },
  Contacted: { bg: "#fef9c3", color: "#854d0e" },
  Confirmed: { bg: "#dcfce7", color: "#166534" },
  Deleted: { bg: "#fee2e2", color: "#991b1b" },
};

const leadStatusColors: Record<LeadStatus, { bg: string; color: string }> = {
  Active: { bg: "#dcfce7", color: "#166534" },
  Converted: { bg: "#dbeafe", color: "#1e3a8a" },
  Archived: { bg: "#f3f4f6", color: "#6b7280" },
};

const planStatusColors: Record<PlanStatus, { bg: string; color: string }> = {
  Active: { bg: "#dcfce7", color: "#166534" },
  Inactive: { bg: "#fef9c3", color: "#854d0e" },
  Expired: { bg: "#fee2e2", color: "#991b1b" },
};

const planTypeColors: Record<
  PlanType,
  { bg: string; color: string; border: string }
> = {
  Starter: { bg: "#f0fdf4", color: "#166534", border: "#86efac" },
  Professional: { bg: "#eff6ff", color: "#1e40af", border: "#93c5fd" },
  Premium: { bg: "#faf5ff", color: "#6b21a8", border: "#d8b4fe" },
};

function StatusBadge({
  status,
  colors,
}: { status: string; colors: { bg: string; color: string } }) {
  return (
    <span
      style={{
        background: colors.bg,
        color: colors.color,
        padding: "3px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        whiteSpace: "nowrap",
      }}
    >
      {status}
    </span>
  );
}

// ─── View Inquiry Modal ───────────────────────────────────────────────────────

function InquiryModal({
  inquiry,
  onClose,
}: { inquiry: BookingInquiry; onClose: () => void }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      data-ocid="inquiry.modal"
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "32px",
          maxWidth: "520px",
          width: "100%",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6b7280",
          }}
          data-ocid="inquiry.close_button"
        >
          <X size={20} />
        </button>
        <h3
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "20px",
            color: "#1e40af",
            marginBottom: "20px",
          }}
        >
          Booking Inquiry Details
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {[
            ["Customer", inquiry.customerName],
            ["Phone", inquiry.phone],
            ["Email", inquiry.email],
            ["Destination", inquiry.destination],
            ["Travel Date", inquiry.travelDate],
            ["Travelers", String(inquiry.travelers)],
            ["Budget", inquiry.budget],
            ["Inquiry Date", inquiry.inquiryDate],
          ].map(([label, val]) => (
            <div key={label}>
              <div
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  marginBottom: "2px",
                }}
              >
                {label}
              </div>
              <div
                style={{ fontSize: "14px", color: "#111827", fontWeight: 500 }}
              >
                {val}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              fontSize: "11px",
              color: "#9ca3af",
              fontWeight: 600,
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Message
          </div>
          <div
            style={{
              fontSize: "14px",
              color: "#374151",
              background: "#f9fafb",
              padding: "10px 14px",
              borderRadius: "8px",
              lineHeight: 1.6,
            }}
          >
            {inquiry.message || "—"}
          </div>
        </div>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <StatusBadge
            status={inquiry.status}
            colors={inquiryStatusColors[inquiry.status]}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "inquiries", label: "Booking Inquiries", icon: MessageSquare },
  { id: "leads", label: "Travel Leads", icon: TrendingUp },
  { id: "partners", label: "Partners", icon: Users },
  { id: "plans", label: "B2B Plans", icon: CreditCard },
  { id: "bookings", label: "Bookings", icon: BookOpen },
  { id: "hotel-bookings", label: "Hotel Bookings", icon: Building2 },
  { id: "dmc-bookings", label: "DMC Bookings", icon: Globe },
  { id: "crm", label: "CRM & Marketing", icon: Briefcase },
  { id: "digital-marketing", label: "Digital Marketing", icon: Megaphone },
  { id: "payment-requests", label: "Payment Requests", icon: Receipt },
];

function Sidebar({
  activeTab,
  setActiveTab,
  onClose,
  isMobile,
}: {
  activeTab: string;
  setActiveTab: (t: string) => void;
  onClose?: () => void;
  isMobile?: boolean;
}) {
  return (
    <aside
      style={{
        width: isMobile ? "100%" : "240px",
        background: "#0f172a",
        color: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div style={{ padding: "24px 20px", borderBottom: "1px solid #1e293b" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: "16px",
                color: "#fff",
              }}
            >
              Travel N World
            </div>
            <div
              style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}
            >
              Admin Dashboard
            </div>
          </div>
          {isMobile && onClose && (
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              type="button"
              key={item.id}
              data-ocid={`admin.${item.id}.tab`}
              onClick={() => {
                setActiveTab(item.id);
                onClose?.();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: isActive ? 600 : 400,
                background: isActive ? "#1e40af" : "transparent",
                color: isActive ? "#fff" : "#94a3b8",
                marginBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "16px 12px", borderTop: "1px solid #1e293b" }}>
        <div
          style={{
            fontSize: "12px",
            color: "#64748b",
            padding: "8px 12px",
            marginBottom: "4px",
          }}
        >
          admin@travelnworld.com
        </div>
      </div>
    </aside>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab({
  partners: _partners,
  leads: _leads,
  inquiries,
  plans,
}: {
  partners: PartnerReg[];
  leads: Lead[];
  inquiries: BookingInquiry[];
  plans: PartnerPlan[];
}) {
  const stats = [
    {
      label: "Total Travel Partners",
      value: "500,000+",
      icon: Users,
      color: "#1e40af",
      bg: "#dbeafe",
    },
    {
      label: "Total Leads Generated",
      value: "100,000+",
      icon: TrendingUp,
      color: "#059669",
      bg: "#d1fae5",
    },
    {
      label: "Booking Inquiries",
      value: "100,000+",
      icon: MessageSquare,
      color: "#7c3aed",
      bg: "#ede9fe",
    },
    {
      label: "Confirmed Bookings",
      value: "25,000+",
      icon: CheckCircle,
      color: "#0891b2",
      bg: "#cffafe",
    },
    {
      label: "Active B2B Members",
      value: "50,000+",
      icon: CreditCard,
      color: "#dc2626",
      bg: "#fee2e2",
    },
    {
      label: "Daily Platform Reach",
      value: "150,000+",
      icon: Globe,
      color: "#0f766e",
      bg: "#ccfbf1",
    },
    {
      label: "Total Hotel Bookings",
      value: "40,000+",
      icon: Building2,
      color: "#b45309",
      bg: "#fef3c7",
    },
    {
      label: "Travel Package Bookings",
      value: "35,000+",
      icon: BookOpen,
      color: "#0891b2",
      bg: "#cffafe",
    },
    {
      label: "DMC Service Bookings",
      value: "25,000+",
      icon: Globe,
      color: "#7c3aed",
      bg: "#ede9fe",
    },
  ];

  return (
    <div data-ocid="admin.overview.section">
      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "22px",
          color: "#111827",
          marginBottom: "24px",
        }}
      >
        Platform Overview
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "32px",
        }}
      >
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "20px",
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  background: s.bg,
                  borderRadius: "10px",
                  padding: "10px",
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color={s.color} />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 800,
                    fontSize: "28px",
                    color: s.color,
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "#6b7280",
                    marginTop: "4px",
                    lineHeight: 1.3,
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Recent Inquiries
          </h3>
          {inquiries.slice(0, 4).map((inq) => (
            <div
              key={inq.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #f3f4f6",
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "14px",
                    color: "#111827",
                  }}
                >
                  {inq.customerName}
                </div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>
                  {inq.destination} · {inq.travelDate}
                </div>
              </div>
              <StatusBadge
                status={inq.status}
                colors={inquiryStatusColors[inq.status]}
              />
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
          }}
        >
          <h3
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 700,
              fontSize: "16px",
              color: "#111827",
              marginBottom: "16px",
            }}
          >
            Plan Summary
          </h3>
          {(["Starter", "Professional", "Premium"] as PlanType[]).map((pt) => {
            const count = plans.filter((p) => p.planType === pt).length;
            const c = planTypeColors[pt];
            return (
              <div
                key={pt}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #f3f4f6",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: c.color,
                    background: c.bg,
                    padding: "3px 10px",
                    borderRadius: "20px",
                    border: `1px solid ${c.border}`,
                  }}
                >
                  {pt}
                </span>
                <span style={{ fontWeight: 700, color: "#111827" }}>
                  {count} partners
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Booking Inquiries Tab ────────────────────────────────────────────────────

function InquiriesTab({
  inquiries,
  setInquiries,
}: {
  inquiries: BookingInquiry[];
  setInquiries: (i: BookingInquiry[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [viewInquiry, setViewInquiry] = useState<BookingInquiry | null>(null);
  const [assignId, setAssignId] = useState<number | null>(null);
  const [assignValue, setAssignValue] = useState("");

  const filtered = inquiries.filter(
    (i) =>
      i.status !== "Deleted" &&
      (i.customerName.toLowerCase().includes(search.toLowerCase()) ||
        i.destination.toLowerCase().includes(search.toLowerCase())),
  );

  const updateStatus = (id: number, status: InquiryStatus) =>
    setInquiries(inquiries.map((i) => (i.id === id ? { ...i, status } : i)));

  const doAssign = (id: number) => {
    setInquiries(
      inquiries.map((i) =>
        i.id === id ? { ...i, assignedTo: assignValue } : i,
      ),
    );
    setAssignId(null);
    setAssignValue("");
  };

  return (
    <div data-ocid="admin.inquiries.section">
      {viewInquiry && (
        <InquiryModal
          inquiry={viewInquiry}
          onClose={() => setViewInquiry(null)}
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#111827",
          }}
        >
          Booking Inquiries
        </h2>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            data-ocid="inquiries.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            style={{
              paddingLeft: "34px",
              paddingRight: "12px",
              height: "38px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              width: "220px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "Customer",
                "Phone",
                "Email",
                "Destination",
                "Travel Date",
                "Travelers",
                "Budget",
                "Inquiry Date",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9ca3af",
                  }}
                  data-ocid="inquiries.empty_state"
                >
                  No inquiries found.
                </td>
              </tr>
            )}
            {filtered.map((inq, idx) => (
              <tr
                key={inq.id}
                data-ocid={`inquiries.row.${idx + 1}`}
                style={{
                  borderBottom: "1px solid #f3f4f6",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {inq.customerName}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {inq.phone}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {inq.email}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {inq.destination}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {inq.travelDate}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    textAlign: "center",
                  }}
                >
                  {inq.travelers}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {inq.budget}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {inq.inquiryDate}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge
                    status={inq.status}
                    colors={inquiryStatusColors[inq.status]}
                  />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {assignId === inq.id ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                      }}
                    >
                      <select
                        data-ocid="inquiries.assign.select"
                        value={assignValue}
                        onChange={(e) => setAssignValue(e.target.value)}
                        style={{
                          fontSize: "13px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          padding: "4px 8px",
                        }}
                      >
                        <option value="">Select Partner</option>
                        {PARTNER_NAMES.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        data-ocid="inquiries.assign.confirm_button"
                        onClick={() => doAssign(inq.id)}
                        style={{
                          background: "#1e40af",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        data-ocid="inquiries.assign.cancel_button"
                        onClick={() => setAssignId(null)}
                        style={{
                          background: "#f3f4f6",
                          color: "#374151",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                    >
                      <button
                        type="button"
                        data-ocid={`inquiries.view.button.${idx + 1}`}
                        onClick={() => setViewInquiry(inq)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          background: "#eff6ff",
                          color: "#1e40af",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        <Eye size={13} />
                        View
                      </button>
                      <button
                        type="button"
                        data-ocid={`inquiries.assign.button.${idx + 1}`}
                        onClick={() => {
                          setAssignId(inq.id);
                          setAssignValue(inq.assignedTo || "");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          background: "#f0fdf4",
                          color: "#166534",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        <Users size={13} />
                        Assign
                      </button>
                      {inq.status !== "Contacted" &&
                        inq.status !== "Confirmed" && (
                          <button
                            type="button"
                            data-ocid={`inquiries.contacted.button.${idx + 1}`}
                            onClick={() => updateStatus(inq.id, "Contacted")}
                            style={{
                              background: "#fef9c3",
                              color: "#854d0e",
                              border: "none",
                              borderRadius: "6px",
                              padding: "5px 10px",
                              fontSize: "12px",
                              cursor: "pointer",
                              fontWeight: 500,
                            }}
                          >
                            Contacted
                          </button>
                        )}
                      {inq.status !== "Confirmed" && (
                        <button
                          type="button"
                          data-ocid={`inquiries.confirm.button.${idx + 1}`}
                          onClick={() => updateStatus(inq.id, "Confirmed")}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "#d1fae5",
                            color: "#065f46",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          <CheckCircle size={13} />
                          Confirm
                        </button>
                      )}
                      <button
                        type="button"
                        data-ocid={`inquiries.delete.button.${idx + 1}`}
                        onClick={() => updateStatus(inq.id, "Deleted")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          background: "#fee2e2",
                          color: "#991b1b",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Travel Leads Tab ─────────────────────────────────────────────────────────

function LeadsTab({
  leads,
  setLeads,
}: { leads: Lead[]; setLeads: (l: Lead[]) => void }) {
  const [search, setSearch] = useState("");
  const [assignId, setAssignId] = useState<number | null>(null);
  const [assignValue, setAssignValue] = useState("");

  const filtered = leads.filter(
    (l) =>
      l.customer.toLowerCase().includes(search.toLowerCase()) ||
      l.destination.toLowerCase().includes(search.toLowerCase()),
  );

  const updateLead = (id: number, patch: Partial<Lead>) =>
    setLeads(leads.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  const doAssign = (id: number) => {
    updateLead(id, { assignedTo: assignValue });
    setAssignId(null);
    setAssignValue("");
  };

  const sourceColor: Record<string, { bg: string; color: string }> = {
    Website: { bg: "#eff6ff", color: "#1e40af" },
    WhatsApp: { bg: "#f0fdf4", color: "#166534" },
    Form: { bg: "#faf5ff", color: "#6b21a8" },
  };

  return (
    <div data-ocid="admin.leads.section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#111827",
          }}
        >
          Travel Leads
        </h2>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            data-ocid="leads.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads..."
            style={{
              paddingLeft: "34px",
              paddingRight: "12px",
              height: "38px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              width: "220px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "Customer",
                "Phone",
                "Destination",
                "Budget",
                "Travel Date",
                "Lead Source",
                "Assigned To",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9ca3af",
                  }}
                  data-ocid="leads.empty_state"
                >
                  No leads found.
                </td>
              </tr>
            )}
            {filtered.map((lead, idx) => (
              <tr
                key={lead.id}
                data-ocid={`leads.row.${idx + 1}`}
                style={{ borderBottom: "1px solid #f3f4f6" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {lead.customer}
                  {lead.isNew && (
                    <span
                      style={{
                        marginLeft: "6px",
                        background: "#dcfce7",
                        color: "#166534",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "10px",
                      }}
                    >
                      NEW
                    </span>
                  )}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {lead.phone ? (
                    <a
                      href={`tel:${lead.phone}`}
                      style={{
                        color: "#1e40af",
                        textDecoration: "none",
                        fontSize: "13px",
                      }}
                    >
                      {lead.phone}
                    </a>
                  ) : (
                    <span style={{ color: "#d1d5db" }}>—</span>
                  )}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {lead.destination}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {lead.budget}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {lead.travelDate}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {lead.leadSource && (
                    <StatusBadge
                      status={lead.leadSource}
                      colors={
                        sourceColor[lead.leadSource] || {
                          bg: "#f3f4f6",
                          color: "#374151",
                        }
                      }
                    />
                  )}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {lead.assignedTo || (
                    <span style={{ color: "#d1d5db" }}>Unassigned</span>
                  )}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge
                    status={lead.status || "Active"}
                    colors={
                      leadStatusColors[(lead.status || "Active") as LeadStatus]
                    }
                  />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {assignId === lead.id ? (
                    <div
                      style={{
                        display: "flex",
                        gap: "6px",
                        alignItems: "center",
                      }}
                    >
                      <select
                        data-ocid="leads.assign.select"
                        value={assignValue}
                        onChange={(e) => setAssignValue(e.target.value)}
                        style={{
                          fontSize: "13px",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          padding: "4px 8px",
                        }}
                      >
                        <option value="">Select Partner</option>
                        {PARTNER_NAMES.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                      <button
                        type="button"
                        data-ocid="leads.assign.confirm_button"
                        onClick={() => doAssign(lead.id)}
                        style={{
                          background: "#1e40af",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        OK
                      </button>
                      <button
                        type="button"
                        data-ocid="leads.assign.cancel_button"
                        onClick={() => setAssignId(null)}
                        style={{
                          background: "#f3f4f6",
                          color: "#374151",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                    >
                      <a
                        href={`tel:${lead.phone?.replace(/[^0-9+]/g, "") || ""}`}
                        data-ocid={`leads.call_button.${idx + 1}`}
                        style={{
                          padding: "4px 10px",
                          background: "#fef3c7",
                          color: "#92400e",
                          border: "1px solid #fcd34d",
                          borderRadius: 6,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          textDecoration: "none",
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        title={`Call ${lead.phone}`}
                      >
                        📞 Call
                      </a>
                      <button
                        type="button"
                        data-ocid={`leads.whatsapp_button.${idx + 1}`}
                        onClick={() => {
                          const msg = encodeURIComponent(
                            `Hi ${lead.customer}, this is Travel N World. We received your travel inquiry for ${lead.destination}. Our expert will contact you shortly.`,
                          );
                          window.open(
                            `https://wa.me/${lead.phone?.replace(/[^0-9]/g, "")}?text=${msg}`,
                            "_blank",
                          );
                        }}
                        style={{
                          padding: "4px 10px",
                          background: "#d1fae5",
                          color: "#065f46",
                          border: "1px solid #6ee7b7",
                          borderRadius: 6,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                          fontWeight: 500,
                        }}
                        title={`WhatsApp ${lead.customer}`}
                      >
                        💬 WhatsApp
                      </button>
                      <button
                        type="button"
                        data-ocid={`leads.assign.button.${idx + 1}`}
                        onClick={() => {
                          setAssignId(lead.id);
                          setAssignValue(lead.assignedTo || "");
                        }}
                        style={{
                          background: "#eff6ff",
                          color: "#1e40af",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Assign
                      </button>
                      {lead.status !== "Converted" && (
                        <button
                          type="button"
                          data-ocid={`leads.convert.button.${idx + 1}`}
                          onClick={() =>
                            updateLead(lead.id, { status: "Converted" })
                          }
                          style={{
                            background: "#dbeafe",
                            color: "#1e40af",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          Convert
                        </button>
                      )}
                      {lead.status !== "Archived" && (
                        <button
                          type="button"
                          data-ocid={`leads.archive.button.${idx + 1}`}
                          onClick={() =>
                            updateLead(lead.id, { status: "Archived" })
                          }
                          style={{
                            background: "#f3f4f6",
                            color: "#6b7280",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          Archive
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Partners Tab ─────────────────────────────────────────────────────────────

function PartnersTab({
  partners,
  setPartners,
}: { partners: PartnerReg[]; setPartners: (p: PartnerReg[]) => void }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<PartnerReg>>({});

  const filtered = partners.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.company.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "All" || p.partnerType === typeFilter;
    return matchesSearch && matchesType;
  });

  const update = (id: number, patch: Partial<PartnerReg>) => {
    const updated = partners.map((p) =>
      p.id === id ? { ...p, ...patch, isNew: false } : p,
    );
    setPartners(updated);
    updatePartnerStatus(
      id,
      (patch.status ||
        partners.find((p) => p.id === id)?.status) as PartnerStatus,
    );
  };

  const remove = (id: number) =>
    setPartners(partners.filter((p) => p.id !== id));

  const saveEdit = () => {
    if (editingId) {
      update(editingId, editData);
      setEditingId(null);
    }
  };

  return (
    <div data-ocid="admin.partners.section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#111827",
          }}
        >
          Partners Management
        </h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ position: "relative" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
            <input
              data-ocid="partners.search_input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search partners..."
              style={{
                paddingLeft: "34px",
                paddingRight: "12px",
                height: "38px",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                width: "220px",
              }}
            />
          </div>
          <select
            data-ocid="partners.type.select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              height: "38px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              padding: "0 12px",
              outline: "none",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="All">All Types</option>
            <option value="Travel Agent">Travel Agent</option>
            <option value="Hotel Partner">Hotel Partner</option>
            <option value="DMC Partner">DMC Partner</option>
          </select>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "Company Name",
                "City",
                "Phone",
                "Email",
                "Plan Status",
                "Join Date",
                "Partner Type",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9ca3af",
                  }}
                  data-ocid="partners.empty_state"
                >
                  No partners found.
                </td>
              </tr>
            )}
            {filtered.map((p, idx) => (
              <tr
                key={p.id}
                data-ocid={`partners.row.${idx + 1}`}
                style={{ borderBottom: "1px solid #f3f4f6" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td style={{ padding: "12px 16px" }}>
                  {editingId === p.id ? (
                    <input
                      value={editData.company ?? p.company}
                      onChange={(e) =>
                        setEditData({ ...editData, company: e.target.value })
                      }
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        width: "130px",
                        fontSize: "13px",
                      }}
                    />
                  ) : (
                    <span style={{ fontWeight: 600, color: "#111827" }}>
                      {p.company}
                      {p.isNew && (
                        <span
                          style={{
                            marginLeft: "6px",
                            background: "#dcfce7",
                            color: "#166534",
                            fontSize: "10px",
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: "10px",
                          }}
                        >
                          NEW
                        </span>
                      )}
                    </span>
                  )}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {editingId === p.id ? (
                    <input
                      value={editData.city ?? p.city}
                      onChange={(e) =>
                        setEditData({ ...editData, city: e.target.value })
                      }
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        width: "90px",
                        fontSize: "13px",
                      }}
                    />
                  ) : (
                    p.city
                  )}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {editingId === p.id ? (
                    <input
                      value={editData.phone ?? p.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "4px 8px",
                        width: "130px",
                        fontSize: "13px",
                      }}
                    />
                  ) : (
                    p.phone
                  )}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {p.email}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color:
                        p.planStatus && p.planStatus !== "None"
                          ? "#1e40af"
                          : "#9ca3af",
                    }}
                  >
                    {p.planStatus || "None"}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.date}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {p.partnerType ? (
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "3px 8px",
                        borderRadius: "20px",
                        background:
                          p.partnerType === "Travel Agent"
                            ? "#dbeafe"
                            : p.partnerType === "Hotel Partner"
                              ? "#dcfce7"
                              : "#ede9fe",
                        color:
                          p.partnerType === "Travel Agent"
                            ? "#1e3a8a"
                            : p.partnerType === "Hotel Partner"
                              ? "#166534"
                              : "#7c3aed",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {p.partnerType}
                    </span>
                  ) : (
                    <span style={{ color: "#d1d5db", fontSize: "12px" }}>
                      —
                    </span>
                  )}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge
                    status={p.status}
                    colors={statusColors[p.status]}
                  />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {editingId === p.id ? (
                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        data-ocid={`partners.save.button.${idx + 1}`}
                        onClick={saveEdit}
                        style={{
                          background: "#1e40af",
                          color: "#fff",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        data-ocid={`partners.cancel.button.${idx + 1}`}
                        onClick={() => setEditingId(null)}
                        style={{
                          background: "#f3f4f6",
                          color: "#374151",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                    >
                      {p.status === "Pending" && (
                        <button
                          type="button"
                          data-ocid={`partners.approve.button.${idx + 1}`}
                          onClick={() => update(p.id, { status: "Approved" })}
                          style={{
                            background: "#dcfce7",
                            color: "#166534",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          Approve
                        </button>
                      )}
                      {p.status !== "Rejected" && p.status !== "Verified" && (
                        <button
                          type="button"
                          data-ocid={`partners.reject.button.${idx + 1}`}
                          onClick={() => update(p.id, { status: "Rejected" })}
                          style={{
                            background: "#fee2e2",
                            color: "#991b1b",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          Reject
                        </button>
                      )}
                      {p.status === "Approved" && (
                        <button
                          type="button"
                          data-ocid={`partners.verify.button.${idx + 1}`}
                          onClick={() => update(p.id, { status: "Verified" })}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            background: "#dbeafe",
                            color: "#1e3a8a",
                            border: "none",
                            borderRadius: "6px",
                            padding: "5px 10px",
                            fontSize: "12px",
                            cursor: "pointer",
                            fontWeight: 500,
                          }}
                        >
                          <Shield size={12} />
                          Verify
                        </button>
                      )}
                      <button
                        type="button"
                        data-ocid={`partners.edit.button.${idx + 1}`}
                        onClick={() => {
                          setEditingId(p.id);
                          setEditData({});
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          background: "#f3f4f6",
                          color: "#374151",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <Edit size={12} />
                        Edit
                      </button>
                      <button
                        type="button"
                        data-ocid={`partners.delete.button.${idx + 1}`}
                        onClick={() => remove(p.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          background: "#fee2e2",
                          color: "#991b1b",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={12} />
                        Remove
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── B2B Plans Tab ────────────────────────────────────────────────────────────

const PLANS_PAGE_SIZE = 50;

function PlansTab({
  plans,
  setPlans,
}: { plans: PartnerPlan[]; setPlans: (p: PartnerPlan[]) => void }) {
  const [page, setPage] = useState(1);
  const [filterPlan, setFilterPlan] = useState<PlanType | "All">("All");
  const [filterStatus, setFilterStatus] = useState<PlanStatus | "All">("All");
  const [search, setSearch] = useState("");

  const exportToExcel = () => {
    const exportData = plans.map((p) => ({
      "Partner Name": p.partnerName,
      "Company Name": p.company,
      City: p.city || "",
      "Membership Plan": p.planType,
      "Plan Price": p.price,
      "Start Date": p.startDate,
      "Expiry Date": p.expiryDate,
      "Payment Status": p.paymentStatus,
    }));
    const headers = Object.keys(exportData[0] || {});
    const csvRows = [
      headers.join(","),
      ...exportData.map((row) =>
        headers
          .map(
            (h) =>
              `"${String((row as Record<string, string>)[h] || "").replace(/"/g, '""')}"`,
          )
          .join(","),
      ),
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "travelnworld-partners-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggle = (id: number) =>
    setPlans(
      plans.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p,
      ),
    );

  const filtered = plans.filter((p) => {
    if (filterPlan !== "All" && p.planType !== filterPlan) return false;
    if (filterStatus !== "All" && p.status !== filterStatus) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !p.partnerName.toLowerCase().includes(q) &&
        !p.company.toLowerCase().includes(q) &&
        !(p.city || "").toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PLANS_PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PLANS_PAGE_SIZE,
    safePage * PLANS_PAGE_SIZE,
  );

  return (
    <div data-ocid="admin.plans.section">
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#111827",
            marginBottom: "8px",
          }}
        >
          B2B Membership Plans
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {(["Starter", "Professional", "Premium"] as PlanType[]).map((pt) => {
            const c = planTypeColors[pt];
            const prices: Record<PlanType, string> = {
              Starter: "₹3,000 / 3 Months",
              Professional: "₹6,000 / 6 Months",
              Premium: "₹12,000 / 1 Year",
            };
            const activeCount = plans.filter(
              (p) => p.planType === pt && p.status === "Active",
            ).length;
            const totalCount = plans.filter((p) => p.planType === pt).length;
            return (
              <div
                key={pt}
                style={{
                  background: c.bg,
                  border: `2px solid ${c.border}`,
                  borderRadius: "12px",
                  padding: "16px 24px",
                  minWidth: "200px",
                }}
              >
                <div
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: c.color,
                  }}
                >
                  {pt}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: c.color,
                    marginTop: "4px",
                    opacity: 0.8,
                  }}
                >
                  {prices[pt]}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "26px",
                    color: c.color,
                    marginTop: "6px",
                  }}
                >
                  {activeCount.toLocaleString()}
                </div>
                <div style={{ fontSize: "12px", color: c.color, opacity: 0.7 }}>
                  {activeCount.toLocaleString()} active /{" "}
                  {totalCount.toLocaleString()} total
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <input
            type="text"
            placeholder="Search partner or company..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            data-ocid="plans.search_input"
            style={{
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              width: "220px",
            }}
          />
          <select
            value={filterPlan}
            onChange={(e) => {
              setFilterPlan(e.target.value as PlanType | "All");
              setPage(1);
            }}
            data-ocid="plans.plan_type.select"
            style={{
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter</option>
            <option value="Professional">Professional</option>
            <option value="Premium">Premium</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value as PlanStatus | "All");
              setPage(1);
            }}
            data-ocid="plans.status.select"
            style={{
              padding: "8px 12px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
            }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Expired">Expired</option>
          </select>
          <span style={{ fontSize: "13px", color: "#6b7280" }}>
            Showing {filtered.length.toLocaleString()} of{" "}
            {plans.length.toLocaleString()} partners
          </span>
          <button
            onClick={exportToExcel}
            type="button"
            data-ocid="plans.export.button"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 18px",
              background: "#1E40AF",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            ⬇ Export Partners
          </button>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "Partner Name",
                "Company",
                "City",
                "Plan",
                "Price",
                "Start Date",
                "Expiry Date",
                "Payment",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9ca3af",
                  }}
                  data-ocid="plans.empty_state"
                >
                  No plans found.
                </td>
              </tr>
            )}
            {paginated.map((plan, idx) => {
              const pc = planTypeColors[plan.planType];
              return (
                <tr
                  key={plan.id}
                  data-ocid={`plans.row.${idx + 1}`}
                  style={{ borderBottom: "1px solid #f3f4f6" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {plan.partnerName}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#374151" }}>
                    {plan.company}
                  </td>
                  <td style={{ padding: "12px 16px", color: "#374151" }}>
                    {plan.city || "—"}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "13px",
                        color: pc.color,
                        background: pc.bg,
                        padding: "3px 10px",
                        borderRadius: "20px",
                        border: `1px solid ${pc.border}`,
                      }}
                    >
                      {plan.planType}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      fontWeight: 600,
                      color: "#111827",
                    }}
                  >
                    {plan.price}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: "#374151",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {plan.startDate}
                  </td>
                  <td
                    style={{
                      padding: "12px 16px",
                      color: plan.status === "Expired" ? "#dc2626" : "#374151",
                      fontWeight: plan.status === "Expired" ? 600 : 400,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {plan.expiryDate}
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge
                      status={plan.paymentStatus}
                      colors={
                        plan.paymentStatus === "Paid"
                          ? { bg: "#dcfce7", color: "#166534" }
                          : plan.paymentStatus === "Pending"
                            ? { bg: "#fef9c3", color: "#854d0e" }
                            : { bg: "#fee2e2", color: "#991b1b" }
                      }
                    />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    <StatusBadge
                      status={plan.status}
                      colors={planStatusColors[plan.status]}
                    />
                  </td>
                  <td style={{ padding: "12px 16px" }}>
                    {plan.status !== "Expired" && (
                      <button
                        type="button"
                        data-ocid={`plans.toggle.button.${idx + 1}`}
                        onClick={() => toggle(plan.id)}
                        style={{
                          background:
                            plan.status === "Active" ? "#fee2e2" : "#dcfce7",
                          color:
                            plan.status === "Active" ? "#991b1b" : "#166534",
                          border: "none",
                          borderRadius: "6px",
                          padding: "5px 12px",
                          fontSize: "12px",
                          cursor: "pointer",
                          fontWeight: 500,
                        }}
                      >
                        {plan.status === "Active" ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "16px",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "13px", color: "#6b7280" }}>
          Page {safePage} of {totalPages} &nbsp;·&nbsp;{" "}
          {filtered.length.toLocaleString()} records
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            data-ocid="plans.pagination_prev"
            disabled={safePage === 1}
            onClick={() => setPage(safePage - 1)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: safePage === 1 ? "#f9fafb" : "#fff",
              color: safePage === 1 ? "#9ca3af" : "#374151",
              cursor: safePage === 1 ? "default" : "pointer",
              fontSize: "13px",
            }}
          >
            ← Prev
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let p: number;
            if (totalPages <= 5) p = i + 1;
            else if (safePage <= 3) p = i + 1;
            else if (safePage >= totalPages - 2) p = totalPages - 4 + i;
            else p = safePage - 2 + i;
            return (
              <button
                key={p}
                type="button"
                data-ocid={`plans.page.${p}.button`}
                onClick={() => setPage(p)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: `1px solid ${p === safePage ? "#1e40af" : "#e5e7eb"}`,
                  background: p === safePage ? "#1e40af" : "#fff",
                  color: p === safePage ? "#fff" : "#374151",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: p === safePage ? 700 : 400,
                }}
              >
                {p}
              </button>
            );
          })}
          <button
            type="button"
            data-ocid="plans.pagination_next"
            disabled={safePage === totalPages}
            onClick={() => setPage(safePage + 1)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: safePage === totalPages ? "#f9fafb" : "#fff",
              color: safePage === totalPages ? "#9ca3af" : "#374151",
              cursor: safePage === totalPages ? "default" : "pointer",
              fontSize: "13px",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Bookings Tab ─────────────────────────────────────────────────────────────

const SAMPLE_BOOKINGS: Booking[] = [
  {
    id: 1,
    customer: "Rohit Agarwal",
    destination: "Dubai",
    partner: "Horizon Travels",
    value: "₹1,30,000",
    date: "2026-03-10",
    status: "Confirmed",
  },
  {
    id: 2,
    customer: "Priya Singh",
    destination: "Goa",
    partner: "SkyWing Tours",
    value: "₹80,000",
    date: "2026-03-07",
    status: "Confirmed",
  },
  {
    id: 3,
    customer: "Suresh Nair",
    destination: "Thailand",
    partner: "BlueSky Holidays",
    value: "₹90,000",
    date: "2026-03-05",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Meena Kapoor",
    destination: "Manali",
    partner: "TravelEase India",
    value: "₹55,000",
    date: "2026-03-03",
    status: "Confirmed",
  },
  {
    id: 5,
    customer: "Vivek Rao",
    destination: "Singapore",
    partner: "Wanderlust Pvt Ltd",
    value: "₹1,50,000",
    date: "2026-02-28",
    status: "Cancelled",
  },
];

const bookingStatusColors: Record<string, { bg: string; color: string }> = {
  Confirmed: { bg: "#dcfce7", color: "#166534" },
  Pending: { bg: "#fef9c3", color: "#854d0e" },
  Cancelled: { bg: "#fee2e2", color: "#991b1b" },
};

function HotelBookingsTab({
  bookings,
  setBookings,
}: {
  bookings: HotelBooking[];
  setBookings: (b: HotelBooking[]) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.hotelName.toLowerCase().includes(search.toLowerCase()) ||
      b.city.toLowerCase().includes(search.toLowerCase()),
  );

  const cycleStatus = (id: number) => {
    const order: HotelBooking["status"][] = [
      "Pending",
      "Confirmed",
      "Cancelled",
    ];
    setBookings(
      bookings.map((b) =>
        b.id === id
          ? { ...b, status: order[(order.indexOf(b.status) + 1) % 3] }
          : b,
      ),
    );
  };

  return (
    <div data-ocid="admin.hotel-bookings.section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#111827",
          }}
        >
          Hotel Bookings
        </h2>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            data-ocid="hotel-bookings.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hotel bookings..."
            style={{
              paddingLeft: "34px",
              paddingRight: "12px",
              height: "38px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              width: "240px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "Customer Name",
                "Hotel Name",
                "City",
                "Room Type",
                "Check-in",
                "Check-out",
                "Booking Value",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9ca3af",
                  }}
                  data-ocid="hotel-bookings.empty_state"
                >
                  No hotel bookings found.
                </td>
              </tr>
            )}
            {filtered.map((b, idx) => (
              <tr
                key={b.id}
                data-ocid={`hotel-bookings.row.${idx + 1}`}
                style={{ borderBottom: "1px solid #f3f4f6" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {b.customerName}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.hotelName}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.city}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.roomType}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.checkIn}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.checkOut}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {b.bookingValue}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge
                    status={b.status}
                    colors={bookingStatusColors[b.status]}
                  />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    type="button"
                    data-ocid={`hotel-bookings.status.button.${idx + 1}`}
                    onClick={() => cycleStatus(b.id)}
                    style={{
                      background: "#f3f4f6",
                      color: "#374151",
                      border: "none",
                      borderRadius: "6px",
                      padding: "5px 10px",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DmcBookingsTab({
  bookings,
  setBookings,
}: {
  bookings: DmcBooking[];
  setBookings: (b: DmcBooking[]) => void;
}) {
  const [search, setSearch] = useState("");

  const filtered = bookings.filter(
    (b) =>
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.destination.toLowerCase().includes(search.toLowerCase()) ||
      b.serviceType.toLowerCase().includes(search.toLowerCase()),
  );

  const cycleStatus = (id: number) => {
    const order: DmcBooking["status"][] = ["Pending", "Confirmed", "Cancelled"];
    setBookings(
      bookings.map((b) =>
        b.id === id
          ? { ...b, status: order[(order.indexOf(b.status) + 1) % 3] }
          : b,
      ),
    );
  };

  return (
    <div data-ocid="admin.dmc-bookings.section">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h2
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontSize: "22px",
            color: "#111827",
          }}
        >
          DMC Service Bookings
        </h2>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#9ca3af",
            }}
          />
          <input
            data-ocid="dmc-bookings.search_input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search DMC bookings..."
            style={{
              paddingLeft: "34px",
              paddingRight: "12px",
              height: "38px",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              width: "240px",
            }}
          />
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "Customer Name",
                "Destination",
                "DMC Partner",
                "Service Type",
                "Travel Date",
                "Booking Value",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#9ca3af",
                  }}
                  data-ocid="dmc-bookings.empty_state"
                >
                  No DMC bookings found.
                </td>
              </tr>
            )}
            {filtered.map((b, idx) => (
              <tr
                key={b.id}
                data-ocid={`dmc-bookings.row.${idx + 1}`}
                style={{ borderBottom: "1px solid #f3f4f6" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {b.customerName}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.destination}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.dmcPartner}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.serviceType}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.travelDate}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {b.bookingValue}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge
                    status={b.status}
                    colors={bookingStatusColors[b.status]}
                  />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    type="button"
                    data-ocid={`dmc-bookings.status.button.${idx + 1}`}
                    onClick={() => cycleStatus(b.id)}
                    style={{
                      background: "#f3f4f6",
                      color: "#374151",
                      border: "none",
                      borderRadius: "6px",
                      padding: "5px 10px",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BookingsTab() {
  const [bookings, setBookings] = useState<Booking[]>(SAMPLE_BOOKINGS);

  const cycleStatus = (id: number) => {
    const order: Booking["status"][] = ["Pending", "Confirmed", "Cancelled"];
    setBookings(
      bookings.map((b) =>
        b.id === id
          ? { ...b, status: order[(order.indexOf(b.status) + 1) % 3] }
          : b,
      ),
    );
  };

  return (
    <div data-ocid="admin.bookings.section">
      <h2
        style={{
          fontFamily: "Poppins, sans-serif",
          fontWeight: 700,
          fontSize: "22px",
          color: "#111827",
          marginBottom: "20px",
        }}
      >
        Bookings
      </h2>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              {[
                "Customer",
                "Destination",
                "Travel Partner",
                "Booking Value",
                "Booking Date",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontWeight: 600,
                    color: "#374151",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, idx) => (
              <tr
                key={b.id}
                data-ocid={`bookings.row.${idx + 1}`}
                style={{ borderBottom: "1px solid #f3f4f6" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f9fafb";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {b.customer}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.destination}
                </td>
                <td style={{ padding: "12px 16px", color: "#374151" }}>
                  {b.partner}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    fontWeight: 600,
                    color: "#111827",
                  }}
                >
                  {b.value}
                </td>
                <td
                  style={{
                    padding: "12px 16px",
                    color: "#374151",
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.date}
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <StatusBadge
                    status={b.status}
                    colors={bookingStatusColors[b.status]}
                  />
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <button
                    type="button"
                    data-ocid={`bookings.status.button.${idx + 1}`}
                    onClick={() => cycleStatus(b.id)}
                    style={{
                      background: "#f3f4f6",
                      color: "#374151",
                      border: "none",
                      borderRadius: "6px",
                      padding: "5px 10px",
                      fontSize: "12px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    Change Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Payment Requests Tab ─────────────────────────────────────────────────────

function PaymentRequestsTab({
  requests,
  setRequests,
}: {
  requests: PaymentRequest[];
  setRequests: React.Dispatch<React.SetStateAction<PaymentRequest[]>>;
}) {
  const handleApprove = (req: PaymentRequest) => {
    const now = new Date();
    const expiry = new Date(now);
    if (req.plan === "starter") expiry.setMonth(expiry.getMonth() + 3);
    else if (req.plan === "professional")
      expiry.setMonth(expiry.getMonth() + 6);
    else expiry.setFullYear(expiry.getFullYear() + 1);

    localStorage.setItem(
      "tnw_partner_plan",
      JSON.stringify({
        plan: req.plan,
        planLabel: req.planLabel,
        expiry: expiry.toISOString(),
        phone: req.phone,
      }),
    );
    localStorage.setItem("tnw_partner_auth", req.phone);
    localStorage.setItem("partner_logged_in", "true");

    const updated = requests.map((r) =>
      r.id === req.id ? { ...r, status: "approved" as const } : r,
    );
    setRequests(updated);
    localStorage.setItem("tnw_payment_requests", JSON.stringify(updated));
  };

  const handleReject = (id: string) => {
    const updated = requests.map((r) =>
      r.id === id ? { ...r, status: "rejected" as const } : r,
    );
    setRequests(updated);
    localStorage.setItem("tnw_payment_requests", JSON.stringify(updated));
  };

  const pending = requests.filter((r) => r.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Requests</h2>
          <p className="text-gray-500 text-sm mt-1">
            Review and approve UPI payment submissions for B2B membership plans
          </p>
        </div>
        {pending.length > 0 && (
          <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
            {pending.length} Pending
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-16 text-center">
          <Receipt className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No payment requests yet</p>
          <p className="text-gray-400 text-sm mt-1">
            Requests will appear here when members submit payment confirmations
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Plan
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Transaction ID
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Screenshot
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr
                    key={req.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    data-ocid={`payment.requests.row.${idx + 1}`}
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {req.name}
                    </td>
                    <td className="px-4 py-3 text-gray-700">{req.phone}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {req.planLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-900">
                      {req.amount}
                    </td>
                    <td className="px-4 py-3 text-gray-600 font-mono text-xs">
                      {req.transactionId}
                    </td>
                    <td className="px-4 py-3">
                      {req.screenshot ? (
                        <a
                          href={req.screenshot}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={req.screenshot}
                            alt="Payment screenshot"
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200 hover:opacity-80 cursor-pointer"
                          />
                        </a>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          No screenshot
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">
                      {new Date(req.submittedAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      {req.status === "pending" && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                      {req.status === "approved" && (
                        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Approved
                        </span>
                      )}
                      {req.status === "rejected" && (
                        <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {req.status === "pending" && (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleApprove(req)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                            data-ocid={`payment.approve.button.${idx + 1}`}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(req.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                            data-ocid={`payment.reject.button.${idx + 1}`}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [registrations, setRegistrations] = useState<PartnerReg[]>(() => {
    const realSubmissions = getPartnerRegistrations().map(
      (r: StoredPartnerReg, idx: number): PartnerReg => ({
        id: idx + 1000,
        name: r.name,
        company: r.company,
        phone: r.phone,
        email: r.email,
        city: r.city,
        experience: r.experience,
        date: r.date,
        status: (r.status as PartnerStatus) || "Pending",
        planStatus: "None",
        isNew: r.isReal,
      }),
    );
    const realIds = new Set(realSubmissions.map((r) => r.id));
    const sampleData = INITIAL_REGISTRATIONS.filter((r) => !realIds.has(r.id));
    return [...realSubmissions, ...sampleData];
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("travel_leads") || "[]");
      const storedLeads = stored.map((l: Lead, idx: number) => ({
        ...l,
        id: idx + 2000,
        leadSource: (l.leadSource as Lead["leadSource"]) || "Form",
        status: (l.status as LeadStatus) || "Active",
        isNew: true,
      }));
      return storedLeads.length > 0
        ? [...storedLeads, ...INITIAL_LEADS]
        : INITIAL_LEADS;
    } catch {
      return INITIAL_LEADS;
    }
  });

  const [inquiries, setInquiries] =
    useState<BookingInquiry[]>(INITIAL_INQUIRIES);
  const [plans, setPlans] = useState<PartnerPlan[]>(INITIAL_PLANS);
  const [hotelBookings, setHotelBookings] =
    useState<HotelBooking[]>(HOTEL_BOOKINGS);
  const [dmcBookings, setDmcBookings] = useState<DmcBooking[]>(DMC_BOOKINGS);
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>(
    () => {
      try {
        return JSON.parse(localStorage.getItem("tnw_payment_requests") || "[]");
      } catch {
        return [];
      }
    },
  );

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("tnw_admin_auth");
    if (!isLoggedIn) navigate({ to: "/admin-login" });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("tnw_admin_auth");
    navigate({ to: "/admin-login" });
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
        background: "#f8fafc",
      }}
      data-ocid="admin.dashboard.section"
    >
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
          onClick={() => setSidebarOpen(false)}
          onKeyDown={() => setSidebarOpen(false)}
          role="button"
          tabIndex={0}
        />
      )}

      {/* Desktop sidebar */}
      <div style={{ display: "none" }} className="desktop-sidebar">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            width: "260px",
            zIndex: 50,
          }}
        >
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(t) => {
              setActiveTab(t);
              setSidebarOpen(false);
            }}
            onClose={() => setSidebarOpen(false)}
            isMobile
          />
        </div>
      )}

      {/* Sidebar (always visible on md+) */}
      <div
        style={{ width: "240px", flexShrink: 0, display: "flex" }}
        className="sidebar-wrapper"
      >
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Top bar */}
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #e5e7eb",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 30,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              type="button"
              data-ocid="admin.menu.button"
              onClick={() => setSidebarOpen(true)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#374151",
              }}
            >
              <Menu size={22} />
            </button>
            <span
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: "#111827",
              }}
            >
              {NAV_ITEMS.find((n) => n.id === activeTab)?.label || "Dashboard"}
            </span>
          </div>
          <button
            type="button"
            data-ocid="admin.logout.button"
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#fee2e2",
              color: "#991b1b",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <LogOut size={15} />
            Logout
          </button>
        </header>

        {/* Tab content */}
        <main style={{ flex: 1, padding: "28px 28px", overflowY: "auto" }}>
          {activeTab === "overview" && (
            <OverviewTab
              partners={registrations}
              leads={leads}
              inquiries={inquiries}
              plans={plans}
            />
          )}
          {activeTab === "inquiries" && (
            <InquiriesTab inquiries={inquiries} setInquiries={setInquiries} />
          )}
          {activeTab === "leads" && (
            <LeadsTab leads={leads} setLeads={setLeads} />
          )}
          {activeTab === "partners" && (
            <PartnersTab
              partners={registrations}
              setPartners={setRegistrations}
            />
          )}
          {activeTab === "plans" && (
            <PlansTab plans={plans} setPlans={setPlans} />
          )}
          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "hotel-bookings" && (
            <HotelBookingsTab
              bookings={hotelBookings}
              setBookings={setHotelBookings}
            />
          )}
          {activeTab === "dmc-bookings" && (
            <DmcBookingsTab
              bookings={dmcBookings}
              setBookings={setDmcBookings}
            />
          )}
          {activeTab === "crm" && <CRMDashboard />}
          {activeTab === "digital-marketing" && <DigitalMarketing />}
          {activeTab === "payment-requests" && (
            <PaymentRequestsTab
              requests={paymentRequests}
              setRequests={setPaymentRequests}
            />
          )}
        </main>
      </div>
    </div>
  );
}

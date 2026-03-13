import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  BookCheck,
  MapPin,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Agency {
  id: number;
  name: string;
  city: string;
  category: string;
  rating: number;
  reviews: number;
  speciality: string;
  yearsInBusiness: number;
  verified: boolean;
  phone: string;
}

const CITIES = [
  "All Cities",
  "Delhi",
  "Mumbai",
  "Jaipur",
  "Ahmedabad",
  "Bangalore",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Goa",
  "Lucknow",
];

const CATEGORIES = [
  "All",
  "Domestic",
  "International",
  "Luxury",
  "Adventure",
  "Honeymoon",
  "Corporate",
  "Group Tours",
];

const CATEGORY_COLORS: Record<string, string> = {
  Domestic: "bg-blue-100 text-blue-700",
  International: "bg-red-100 text-red-700",
  Luxury: "bg-[#FEF3C7] text-[#92400E]",
  Adventure: "bg-[#D1FAE5] text-[#065F46]",
  Honeymoon: "bg-pink-100 text-pink-700",
  Corporate: "bg-slate-100 text-slate-700",
  "Group Tours": "bg-orange-100 text-orange-700",
};

const agencyData: Agency[] = [
  {
    id: 1,
    name: "Horizon Travels",
    city: "Mumbai",
    category: "International",
    rating: 4.9,
    reviews: 312,
    speciality: "Europe & SE Asia packages",
    yearsInBusiness: 14,
    verified: true,
    phone: "+91 987654321",
  },
  {
    id: 2,
    name: "SkyWing Tours",
    city: "Delhi",
    category: "Domestic",
    rating: 4.8,
    reviews: 278,
    speciality: "North India heritage circuits",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 998768765",
  },
  {
    id: 3,
    name: "Royal Journeys",
    city: "Bangalore",
    category: "Luxury",
    rating: 5.0,
    reviews: 189,
    speciality: "Luxury villa & resort stays",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 889122109",
  },
  {
    id: 4,
    name: "Blue Ocean Trips",
    city: "Chennai",
    category: "Honeymoon",
    rating: 4.7,
    reviews: 234,
    speciality: "Maldives & Bali honeymoon",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 876546543",
  },
  {
    id: 5,
    name: "Summit Adventures",
    city: "Lucknow",
    category: "Adventure",
    rating: 4.8,
    reviews: 156,
    speciality: "Himalayan trekking & camping",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 973410987",
  },
  {
    id: 6,
    name: "Global Wings Travel",
    city: "Hyderabad",
    category: "International",
    rating: 4.9,
    reviews: 345,
    speciality: "USA, Canada & UK packages",
    yearsInBusiness: 16,
    verified: true,
    phone: "+91 968234321",
  },
  {
    id: 7,
    name: "Paradise Voyages",
    city: "Kolkata",
    category: "Honeymoon",
    rating: 4.7,
    reviews: 198,
    speciality: "Sri Lanka & Thailand romance",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 701238765",
  },
  {
    id: 8,
    name: "CityBreak Corporate",
    city: "Mumbai",
    category: "Corporate",
    rating: 4.8,
    reviews: 267,
    speciality: "MICE & corporate retreats",
    yearsInBusiness: 12,
    verified: true,
    phone: "+91 752342109",
  },
  {
    id: 9,
    name: "IndiaFirst Tours",
    city: "Jaipur",
    category: "Domestic",
    rating: 4.6,
    reviews: 221,
    speciality: "Rajasthan royal tours",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 765436543",
  },
  {
    id: 10,
    name: "Coral Reef Holidays",
    city: "Goa",
    category: "International",
    rating: 4.8,
    reviews: 183,
    speciality: "Beach & island getaways",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 778910987",
  },
  {
    id: 11,
    name: "Zest Travel Hub",
    city: "Ahmedabad",
    category: "Group Tours",
    rating: 4.7,
    reviews: 312,
    speciality: "Yatra & pilgrimage groups",
    yearsInBusiness: 13,
    verified: true,
    phone: "+91 784561234",
  },
  {
    id: 12,
    name: "Alpine Expeditions",
    city: "Delhi",
    category: "Adventure",
    rating: 4.9,
    reviews: 145,
    speciality: "Ladakh & Spiti expeditions",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 790125678",
  },
  {
    id: 13,
    name: "Prestige Global Tours",
    city: "Mumbai",
    category: "Luxury",
    rating: 5.0,
    reviews: 201,
    speciality: "Private jet & yacht charters",
    yearsInBusiness: 18,
    verified: true,
    phone: "+91 803459012",
  },
  {
    id: 14,
    name: "Swadesh Wanderers",
    city: "Bangalore",
    category: "Domestic",
    rating: 4.6,
    reviews: 289,
    speciality: "South India temple circuits",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 816783456",
  },
  {
    id: 15,
    name: "Star Executive Travel",
    city: "Chennai",
    category: "Corporate",
    rating: 4.8,
    reviews: 176,
    speciality: "Executive & VIP travel",
    yearsInBusiness: 14,
    verified: true,
    phone: "+91 829017890",
  },
  {
    id: 16,
    name: "Sahara Caravans",
    city: "Jaipur",
    category: "Group Tours",
    rating: 4.7,
    reviews: 298,
    speciality: "Desert safari group tours",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 832341234",
  },
  {
    id: 17,
    name: "Azure Horizons",
    city: "Lucknow",
    category: "International",
    rating: 4.8,
    reviews: 167,
    speciality: "Mediterranean cruises",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 845675678",
  },
  {
    id: 18,
    name: "Bliss Honeymoon Co",
    city: "Hyderabad",
    category: "Honeymoon",
    rating: 4.9,
    reviews: 223,
    speciality: "Santorini & Amalfi specials",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 858909012",
  },
  {
    id: 19,
    name: "Mountain Pulse Tours",
    city: "Kolkata",
    category: "Adventure",
    rating: 4.7,
    reviews: 134,
    speciality: "Northeast India treks",
    yearsInBusiness: 5,
    verified: true,
    phone: "+91 861233456",
  },
  {
    id: 20,
    name: "EagleEye Holidays",
    city: "Ahmedabad",
    category: "International",
    rating: 4.8,
    reviews: 256,
    speciality: "Dubai & Abu Dhabi packages",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 894567890",
  },
  {
    id: 21,
    name: "Nirvana Trails",
    city: "Goa",
    category: "Luxury",
    rating: 4.9,
    reviews: 178,
    speciality: "Bespoke luxury retreats",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 907892345",
  },
  {
    id: 22,
    name: "BharatYatra Tours",
    city: "Delhi",
    category: "Domestic",
    rating: 4.6,
    reviews: 334,
    speciality: "Char Dham & Kashi yatras",
    yearsInBusiness: 15,
    verified: true,
    phone: "+91 910126789",
  },
  {
    id: 23,
    name: "Pacific View Travels",
    city: "Mumbai",
    category: "International",
    rating: 4.7,
    reviews: 244,
    speciality: "Australia & New Zealand",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 923450123",
  },
  {
    id: 24,
    name: "WeddingWings Travel",
    city: "Bangalore",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 189,
    speciality: "Destination weddings abroad",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 936784567",
  },
  {
    id: 25,
    name: "TrailBlazer Treks",
    city: "Chennai",
    category: "Adventure",
    rating: 4.7,
    reviews: 122,
    speciality: "Western Ghats treks",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 949018901",
  },
  {
    id: 26,
    name: "NextGen Corporate Travel",
    city: "Lucknow",
    category: "Corporate",
    rating: 4.9,
    reviews: 198,
    speciality: "Tech company travel desks",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 952342345",
  },
  {
    id: 27,
    name: "Carnival Group Trips",
    city: "Hyderabad",
    category: "Group Tours",
    rating: 4.7,
    reviews: 367,
    speciality: "Family & school excursions",
    yearsInBusiness: 12,
    verified: true,
    phone: "+91 981236789",
  },
  {
    id: 28,
    name: "GoldenPath Voyages",
    city: "Jaipur",
    category: "Luxury",
    rating: 4.9,
    reviews: 156,
    speciality: "Royal Rajasthan luxury trains",
    yearsInBusiness: 14,
    verified: true,
    phone: "+91 974560123",
  },
  {
    id: 29,
    name: "TropicLeaf Tours",
    city: "Kolkata",
    category: "International",
    rating: 4.7,
    reviews: 211,
    speciality: "Southeast Asia circuits",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 882344567",
  },
  {
    id: 30,
    name: "Wanderlust India",
    city: "Mumbai",
    category: "Domestic",
    rating: 4.8,
    reviews: 289,
    speciality: "Offbeat India experiences",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 875678901",
  },
  {
    id: 31,
    name: "Sunrise Getaways",
    city: "Ahmedabad",
    category: "Honeymoon",
    rating: 4.7,
    reviews: 167,
    speciality: "Andaman & Lakshadweep",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 998903456",
  },
  {
    id: 32,
    name: "SpeedWing Airlines",
    city: "Delhi",
    category: "Corporate",
    rating: 4.8,
    reviews: 234,
    speciality: "Business class management",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 961237890",
  },
  {
    id: 33,
    name: "Heritage Circuits",
    city: "Goa",
    category: "Domestic",
    rating: 4.6,
    reviews: 198,
    speciality: "UNESCO heritage tours",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 704561234",
  },
  {
    id: 34,
    name: "SeaBreeze Holidays",
    city: "Chennai",
    category: "International",
    rating: 4.8,
    reviews: 245,
    speciality: "Caribbean cruises",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 757895678",
  },
  {
    id: 35,
    name: "Dune Riders Travel",
    city: "Jaipur",
    category: "Adventure",
    rating: 4.7,
    reviews: 143,
    speciality: "Desert adventure sports",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 760129012",
  },
  {
    id: 36,
    name: "Ivory Palace Tours",
    city: "Mumbai",
    category: "Luxury",
    rating: 5.0,
    reviews: 167,
    speciality: "5-star only luxury packages",
    yearsInBusiness: 16,
    verified: true,
    phone: "+91 773453456",
  },
  {
    id: 37,
    name: "GroupGlobe Travels",
    city: "Bangalore",
    category: "Group Tours",
    rating: 4.7,
    reviews: 412,
    speciality: "College & corporate groups",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 786787890",
  },
  {
    id: 38,
    name: "NorthStar Tours",
    city: "Delhi",
    category: "International",
    rating: 4.8,
    reviews: 267,
    speciality: "Scandinavia & Iceland",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 799011234",
  },
  {
    id: 39,
    name: "Coastal Bliss Travels",
    city: "Lucknow",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 198,
    speciality: "Konkan coast getaways",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 802345678",
  },
  {
    id: 40,
    name: "VoyageFirst Travel",
    city: "Hyderabad",
    category: "International",
    rating: 4.9,
    reviews: 289,
    speciality: "Japan & Korea circuits",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 815679012",
  },
  {
    id: 41,
    name: "AurumTravel Experts",
    city: "Kolkata",
    category: "Luxury",
    rating: 4.9,
    reviews: 134,
    speciality: "Bhutan luxury experiences",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 828904567",
  },
  {
    id: 42,
    name: "DestiNation India",
    city: "Ahmedabad",
    category: "Domestic",
    rating: 4.6,
    reviews: 312,
    speciality: "Gujarat cultural tours",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 831238901",
  },
  {
    id: 43,
    name: "BizRoute Corporate",
    city: "Mumbai",
    category: "Corporate",
    rating: 4.8,
    reviews: 223,
    speciality: "Multinational travel desk",
    yearsInBusiness: 13,
    verified: true,
    phone: "+91 844562345",
  },
  {
    id: 44,
    name: "OceanVista Cruises",
    city: "Goa",
    category: "International",
    rating: 4.7,
    reviews: 178,
    speciality: "Mediterranean & Baltic cruises",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 857896789",
  },
  {
    id: 45,
    name: "PeakQuest Adventures",
    city: "Delhi",
    category: "Adventure",
    rating: 4.9,
    reviews: 167,
    speciality: "High altitude mountaineering",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 860120123",
  },
  {
    id: 46,
    name: "Moonbeam Honeymoons",
    city: "Bangalore",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 212,
    speciality: "France & Italy romance",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 893454567",
  },
  {
    id: 47,
    name: "Sampark Group Tours",
    city: "Chennai",
    category: "Group Tours",
    rating: 4.7,
    reviews: 389,
    speciality: "Pan-India group specials",
    yearsInBusiness: 14,
    verified: true,
    phone: "+91 906788901",
  },
  {
    id: 48,
    name: "Elite Voyager Travel",
    city: "Jaipur",
    category: "Luxury",
    rating: 5.0,
    reviews: 145,
    speciality: "Exclusive palace hotel stays",
    yearsInBusiness: 12,
    verified: true,
    phone: "+91 919012345",
  },
  {
    id: 49,
    name: "EastWind Tours",
    city: "Kolkata",
    category: "Domestic",
    rating: 4.6,
    reviews: 267,
    speciality: "Bengal & Odisha tourism",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 922346789",
  },
  {
    id: 50,
    name: "SunsetHorizon Travel",
    city: "Mumbai",
    category: "International",
    rating: 4.8,
    reviews: 234,
    speciality: "South Africa safari",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 935670123",
  },
  {
    id: 51,
    name: "ThunderPass Treks",
    city: "Lucknow",
    category: "Adventure",
    rating: 4.7,
    reviews: 123,
    speciality: "Sahyadri & Konkan hikes",
    yearsInBusiness: 5,
    verified: true,
    phone: "+91 948905678",
  },
  {
    id: 52,
    name: "CorporateFly India",
    city: "Hyderabad",
    category: "Corporate",
    rating: 4.9,
    reviews: 256,
    speciality: "IT sector travel solutions",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 951239012",
  },
  {
    id: 53,
    name: "Paradise Petal Tours",
    city: "Ahmedabad",
    category: "Honeymoon",
    rating: 4.7,
    reviews: 189,
    speciality: "Kerala backwaters romance",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 984563456",
  },
  {
    id: 54,
    name: "MassTour India",
    city: "Delhi",
    category: "Group Tours",
    rating: 4.6,
    reviews: 445,
    speciality: "Budget group packages",
    yearsInBusiness: 15,
    verified: true,
    phone: "+91 977897890",
  },
  {
    id: 55,
    name: "GreenValley Travels",
    city: "Bangalore",
    category: "Domestic",
    rating: 4.7,
    reviews: 278,
    speciality: "Coorg & Munnar nature tours",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 880121234",
  },
  {
    id: 56,
    name: "BlueSky International",
    city: "Goa",
    category: "International",
    rating: 4.8,
    reviews: 212,
    speciality: "Maldives specialist",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 873455678",
  },
  {
    id: 57,
    name: "CrownLux Holidays",
    city: "Chennai",
    category: "Luxury",
    rating: 4.9,
    reviews: 156,
    speciality: "Overwater villa experiences",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 996789012",
  },
  {
    id: 58,
    name: "WildRoute Expeditions",
    city: "Jaipur",
    category: "Adventure",
    rating: 4.8,
    reviews: 134,
    speciality: "Wildlife & jungle safaris",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 969013456",
  },
  {
    id: 59,
    name: "Rosewood Honeymoons",
    city: "Kolkata",
    category: "Honeymoon",
    rating: 4.7,
    reviews: 178,
    speciality: "Phuket & Phi Phi islands",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 702347890",
  },
  {
    id: 60,
    name: "TravelSmart Corp",
    city: "Mumbai",
    category: "Corporate",
    rating: 4.8,
    reviews: 289,
    speciality: "Cost-optimization travel desk",
    yearsInBusiness: 12,
    verified: true,
    phone: "+91 755671234",
  },
  {
    id: 61,
    name: "SaffronRoute Tours",
    city: "Delhi",
    category: "Domestic",
    rating: 4.7,
    reviews: 301,
    speciality: "Spiti & Kinnaur circuits",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 768906789",
  },
  {
    id: 62,
    name: "TourVista Global",
    city: "Lucknow",
    category: "International",
    rating: 4.8,
    reviews: 223,
    speciality: "Turkey & Egypt circuits",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 771230123",
  },
  {
    id: 63,
    name: "FlightPath Travel",
    city: "Hyderabad",
    category: "Corporate",
    rating: 4.9,
    reviews: 212,
    speciality: "Airline consolidator",
    yearsInBusiness: 13,
    verified: true,
    phone: "+91 784564567",
  },
  {
    id: 64,
    name: "JourneyJoy Group",
    city: "Ahmedabad",
    category: "Group Tours",
    rating: 4.7,
    reviews: 356,
    speciality: "Senior citizen specials",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 797898901",
  },
  {
    id: 65,
    name: "VelvetTrip Luxury",
    city: "Bangalore",
    category: "Luxury",
    rating: 5.0,
    reviews: 123,
    speciality: "Seychelles & Maldives",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 800122345",
  },
  {
    id: 66,
    name: "IslandHop Travels",
    city: "Goa",
    category: "International",
    rating: 4.7,
    reviews: 189,
    speciality: "Indonesia & Philippines",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 813456789",
  },
  {
    id: 67,
    name: "RidgeTop Adventures",
    city: "Delhi",
    category: "Adventure",
    rating: 4.8,
    reviews: 145,
    speciality: "Rock climbing & rappelling",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 826780123",
  },
  {
    id: 68,
    name: "AmourTrail Honeymoon",
    city: "Chennai",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 201,
    speciality: "Switzerland & Vienna",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 839014567",
  },
  {
    id: 69,
    name: "SilverCloud Tours",
    city: "Jaipur",
    category: "Domestic",
    rating: 4.6,
    reviews: 256,
    speciality: "Rajasthan & MP circuits",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 842348901",
  },
  {
    id: 70,
    name: "ExecJet Corporate",
    city: "Mumbai",
    category: "Corporate",
    rating: 4.9,
    reviews: 178,
    speciality: "Charter & private aviation",
    yearsInBusiness: 15,
    verified: true,
    phone: "+91 855672345",
  },
  {
    id: 71,
    name: "TerraFirma Trekkers",
    city: "Kolkata",
    category: "Adventure",
    rating: 4.7,
    reviews: 119,
    speciality: "Sikkim & Darjeeling trails",
    yearsInBusiness: 5,
    verified: true,
    phone: "+91 868907890",
  },
  {
    id: 72,
    name: "FestiveFly Groups",
    city: "Lucknow",
    category: "Group Tours",
    rating: 4.7,
    reviews: 423,
    speciality: "Festival & event groups",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 891231234",
  },
  {
    id: 73,
    name: "AquaBliss Resorts",
    city: "Hyderabad",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 167,
    speciality: "Andaman couple packages",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 904565678",
  },
  {
    id: 74,
    name: "Meridian Holidays",
    city: "Ahmedabad",
    category: "International",
    rating: 4.8,
    reviews: 234,
    speciality: "Africa & Middle East",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 917899012",
  },
  {
    id: 75,
    name: "IndusExplorers",
    city: "Delhi",
    category: "Domestic",
    rating: 4.7,
    reviews: 312,
    speciality: "Ladakh & Kashmir",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 920123456",
  },
  {
    id: 76,
    name: "GlacierWing Tours",
    city: "Bangalore",
    category: "Adventure",
    rating: 4.8,
    reviews: 138,
    speciality: "Ice trekking & snowboarding",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 933457890",
  },
  {
    id: 77,
    name: "SuiteLife Luxury",
    city: "Mumbai",
    category: "Luxury",
    rating: 5.0,
    reviews: 145,
    speciality: "Butler service packages",
    yearsInBusiness: 14,
    verified: true,
    phone: "+91 946781234",
  },
  {
    id: 78,
    name: "MetroBiz Travel",
    city: "Chennai",
    category: "Corporate",
    rating: 4.8,
    reviews: 245,
    speciality: "Bank & finance sector",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 959015678",
  },
  {
    id: 79,
    name: "CircleTour Groups",
    city: "Goa",
    category: "Group Tours",
    rating: 4.7,
    reviews: 378,
    speciality: "Goa heritage group tours",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 982349012",
  },
  {
    id: 80,
    name: "BloomHoneymoon Co",
    city: "Jaipur",
    category: "Honeymoon",
    rating: 4.9,
    reviews: 156,
    speciality: "Paris & Barcelona romance",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 975673456",
  },
  {
    id: 81,
    name: "NavRatan Travels",
    city: "Kolkata",
    category: "International",
    rating: 4.7,
    reviews: 198,
    speciality: "Bhutan & Nepal specialist",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 888908901",
  },
  {
    id: 82,
    name: "TravelDesk India",
    city: "Hyderabad",
    category: "Domestic",
    rating: 4.6,
    reviews: 289,
    speciality: "Telangana & AP tourism",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 871232345",
  },
  {
    id: 83,
    name: "ZenithTravel Co",
    city: "Lucknow",
    category: "International",
    rating: 4.8,
    reviews: 212,
    speciality: "Latin America circuits",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 994566789",
  },
  {
    id: 84,
    name: "SunriseHill Tours",
    city: "Ahmedabad",
    category: "Domestic",
    rating: 4.7,
    reviews: 267,
    speciality: "Gujarat & Kutch tours",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 967890123",
  },
  {
    id: 85,
    name: "ExecutivePath Corp",
    city: "Delhi",
    category: "Corporate",
    rating: 4.9,
    reviews: 189,
    speciality: "Policy & compliance travel",
    yearsInBusiness: 12,
    verified: true,
    phone: "+91 700124567",
  },
  {
    id: 86,
    name: "WildVista Safari",
    city: "Mumbai",
    category: "Adventure",
    rating: 4.8,
    reviews: 156,
    speciality: "Ranthambore & Jim Corbett",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 753458901",
  },
  {
    id: 87,
    name: "RiverSong Holidays",
    city: "Bangalore",
    category: "Honeymoon",
    rating: 4.7,
    reviews: 178,
    speciality: "Alleppey & Kumarakom",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 766782345",
  },
  {
    id: 88,
    name: "FamilyFirst Groups",
    city: "Chennai",
    category: "Group Tours",
    rating: 4.7,
    reviews: 445,
    speciality: "Family packages India",
    yearsInBusiness: 13,
    verified: true,
    phone: "+91 779016789",
  },
  {
    id: 89,
    name: "CelestialAir Travel",
    city: "Goa",
    category: "Luxury",
    rating: 4.9,
    reviews: 134,
    speciality: "Private island bookings",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 782340123",
  },
  {
    id: 90,
    name: "TrekIndia Experts",
    city: "Jaipur",
    category: "Adventure",
    rating: 4.8,
    reviews: 143,
    speciality: "Aravalli & Rajasthan hikes",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 795674567",
  },
  {
    id: 91,
    name: "GrandTour India",
    city: "Kolkata",
    category: "International",
    rating: 4.8,
    reviews: 223,
    speciality: "China & Vietnam circuits",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 808909012",
  },
  {
    id: 92,
    name: "StellarBiz Corporate",
    city: "Mumbai",
    category: "Corporate",
    rating: 4.8,
    reviews: 267,
    speciality: "Pharma sector travel",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 811233456",
  },
  {
    id: 93,
    name: "EverestDream Tours",
    city: "Delhi",
    category: "Adventure",
    rating: 4.9,
    reviews: 167,
    speciality: "Nepal & Tibet expeditions",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 824567890",
  },
  {
    id: 94,
    name: "CoupleMoments Travel",
    city: "Hyderabad",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 212,
    speciality: "Maldives water villas",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 837891234",
  },
  {
    id: 95,
    name: "SundownerGroup Co",
    city: "Lucknow",
    category: "Group Tours",
    rating: 4.6,
    reviews: 389,
    speciality: "Pilgrimage & religious tours",
    yearsInBusiness: 14,
    verified: true,
    phone: "+91 840125678",
  },
  {
    id: 96,
    name: "JadeRoute Luxury",
    city: "Bangalore",
    category: "Luxury",
    rating: 5.0,
    reviews: 112,
    speciality: "Japan & Singapore luxury",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 853459012",
  },
  {
    id: 97,
    name: "AeroNomads Travel",
    city: "Ahmedabad",
    category: "International",
    rating: 4.7,
    reviews: 245,
    speciality: "USA & Canada specialist",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 866783456",
  },
  {
    id: 98,
    name: "SunlitPaths India",
    city: "Goa",
    category: "Domestic",
    rating: 4.7,
    reviews: 234,
    speciality: "Goa & Maharashtra tours",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 899017890",
  },
  {
    id: 99,
    name: "ProCorp TravelDesk",
    city: "Chennai",
    category: "Corporate",
    rating: 4.9,
    reviews: 198,
    speciality: "Automotive sector travel",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 902341234",
  },
  {
    id: 100,
    name: "TerrainRush Treks",
    city: "Jaipur",
    category: "Adventure",
    rating: 4.7,
    reviews: 128,
    speciality: "Mountain biking tours",
    yearsInBusiness: 5,
    verified: true,
    phone: "+91 915675678",
  },
  {
    id: 101,
    name: "AmberGlow Travels",
    city: "Kolkata",
    category: "Domestic",
    rating: 4.6,
    reviews: 278,
    speciality: "Sundarbans & NE India",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 928900123",
  },
  {
    id: 102,
    name: "IvyLeague Holidays",
    city: "Mumbai",
    category: "International",
    rating: 4.8,
    reviews: 256,
    speciality: "UK & Oxford tours",
    yearsInBusiness: 12,
    verified: true,
    phone: "+91 931234567",
  },
  {
    id: 103,
    name: "CloudNine Honeymoons",
    city: "Delhi",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 189,
    speciality: "Greece & Santorini",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 944568901",
  },
  {
    id: 104,
    name: "PillarGroup Tours",
    city: "Hyderabad",
    category: "Group Tours",
    rating: 4.7,
    reviews: 367,
    speciality: "Industrial visits",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 957892345",
  },
  {
    id: 105,
    name: "CanopyTrek India",
    city: "Bangalore",
    category: "Adventure",
    rating: 4.8,
    reviews: 134,
    speciality: "Jungle canopy & zipline",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 980126789",
  },
  {
    id: 106,
    name: "DiamondClass Travel",
    city: "Lucknow",
    category: "Luxury",
    rating: 4.9,
    reviews: 145,
    speciality: "Business class upgrades",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 973450123",
  },
  {
    id: 107,
    name: "SwiftDesk Corporate",
    city: "Ahmedabad",
    category: "Corporate",
    rating: 4.8,
    reviews: 212,
    speciality: "FMCG sector solutions",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 886784567",
  },
  {
    id: 108,
    name: "NaturePulse Tours",
    city: "Goa",
    category: "Domestic",
    rating: 4.6,
    reviews: 198,
    speciality: "Eco-tourism & farm stays",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 879018901",
  },
  {
    id: 109,
    name: "TwilightVoyage",
    city: "Chennai",
    category: "International",
    rating: 4.8,
    reviews: 223,
    speciality: "East Africa & Kenya",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 992342345",
  },
  {
    id: 110,
    name: "BreezePoint Honeymoons",
    city: "Jaipur",
    category: "Honeymoon",
    rating: 4.7,
    reviews: 167,
    speciality: "Langkawi & Coorg",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 965676789",
  },
  {
    id: 111,
    name: "SynergyGroup Tours",
    city: "Kolkata",
    category: "Group Tours",
    rating: 4.7,
    reviews: 412,
    speciality: "NRI group tours",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 708901111",
  },
  {
    id: 112,
    name: "MidnightSun Travel",
    city: "Delhi",
    category: "International",
    rating: 4.9,
    reviews: 178,
    speciality: "Norway & Finland",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 751232222",
  },
  {
    id: 113,
    name: "PureRoute Holidays",
    city: "Mumbai",
    category: "Domestic",
    rating: 4.7,
    reviews: 245,
    speciality: "Maharashtra heritage",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 764563333",
  },
  {
    id: 114,
    name: "TurboDesk Travel",
    city: "Hyderabad",
    category: "Corporate",
    rating: 4.9,
    reviews: 234,
    speciality: "Telecom sector desk",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 777894444",
  },
  {
    id: 115,
    name: "ApexSummit Treks",
    city: "Bangalore",
    category: "Adventure",
    rating: 4.8,
    reviews: 145,
    speciality: "Karnataka adventure sports",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 780125555",
  },
  {
    id: 116,
    name: "Mirage Luxury Travel",
    city: "Lucknow",
    category: "Luxury",
    rating: 5.0,
    reviews: 134,
    speciality: "Morocco & Jordan luxury",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 793456666",
  },
  {
    id: 117,
    name: "FamilyGlobe Groups",
    city: "Ahmedabad",
    category: "Group Tours",
    rating: 4.6,
    reviews: 389,
    speciality: "Family holiday packages",
    yearsInBusiness: 12,
    verified: true,
    phone: "+91 806787777",
  },
  {
    id: 118,
    name: "RomanticRoads Travel",
    city: "Goa",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 178,
    speciality: "Portugal & Spain",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 819018888",
  },
  {
    id: 119,
    name: "SkyTerrace Holidays",
    city: "Chennai",
    category: "International",
    rating: 4.7,
    reviews: 212,
    speciality: "Malaysia & Indonesia",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 822349999",
  },
  {
    id: 120,
    name: "PathFinder Travels",
    city: "Jaipur",
    category: "Domestic",
    rating: 4.6,
    reviews: 256,
    speciality: "Himalayan foothills",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 835670000",
  },
  {
    id: 121,
    name: "ChromeClass Corp",
    city: "Kolkata",
    category: "Corporate",
    rating: 4.8,
    reviews: 198,
    speciality: "Logistics sector travel",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 848901357",
  },
  {
    id: 122,
    name: "VerdantVoyage Tours",
    city: "Mumbai",
    category: "International",
    rating: 4.8,
    reviews: 234,
    speciality: "Brazil & Argentina",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 851232468",
  },
  {
    id: 123,
    name: "StarlitNights Travel",
    city: "Delhi",
    category: "Luxury",
    rating: 4.9,
    reviews: 156,
    speciality: "Overnight desert camps",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 864563579",
  },
  {
    id: 124,
    name: "WhirlwindAdventures",
    city: "Hyderabad",
    category: "Adventure",
    rating: 4.7,
    reviews: 138,
    speciality: "Paragliding & skydiving",
    yearsInBusiness: 5,
    verified: true,
    phone: "+91 897894680",
  },
  {
    id: 125,
    name: "MosaicHoneymoons",
    city: "Bangalore",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 189,
    speciality: "Turkey & Cappadocia",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 900125791",
  },
  {
    id: 126,
    name: "NationWide Groups",
    city: "Lucknow",
    category: "Group Tours",
    rating: 4.7,
    reviews: 445,
    speciality: "All-India group circuits",
    yearsInBusiness: 15,
    verified: true,
    phone: "+91 913456802",
  },
  {
    id: 127,
    name: "TopazPath Luxury",
    city: "Ahmedabad",
    category: "Luxury",
    rating: 5.0,
    reviews: 123,
    speciality: "Sri Lanka luxury trains",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 926787913",
  },
  {
    id: 128,
    name: "SilkRoute Travels",
    city: "Goa",
    category: "International",
    rating: 4.8,
    reviews: 201,
    speciality: "Central Asia & Silk Road",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 939018024",
  },
  {
    id: 129,
    name: "DeltaForce Travel",
    city: "Chennai",
    category: "Domestic",
    rating: 4.7,
    reviews: 267,
    speciality: "Tamil Nadu coastal tours",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 942349135",
  },
  {
    id: 130,
    name: "OmegaCorp Travel",
    city: "Jaipur",
    category: "Corporate",
    rating: 4.8,
    reviews: 223,
    speciality: "Real estate sector",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 955670246",
  },
  {
    id: 131,
    name: "AquaPeak Treks",
    city: "Kolkata",
    category: "Adventure",
    rating: 4.7,
    reviews: 125,
    speciality: "River rafting circuits",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 988901470",
  },
  {
    id: 132,
    name: "ChamberHouse Luxury",
    city: "Mumbai",
    category: "Luxury",
    rating: 4.9,
    reviews: 145,
    speciality: "Boutique hotel curation",
    yearsInBusiness: 13,
    verified: true,
    phone: "+91 971232581",
  },
  {
    id: 133,
    name: "TerraceTours India",
    city: "Delhi",
    category: "Domestic",
    rating: 4.6,
    reviews: 289,
    speciality: "Punjab & Himachal",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 884563692",
  },
  {
    id: 134,
    name: "LushRoute Honeymoon",
    city: "Hyderabad",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 167,
    speciality: "Bali all-inclusive",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 877894703",
  },
  {
    id: 135,
    name: "PlatinumGroup Co",
    city: "Bangalore",
    category: "Group Tours",
    rating: 4.8,
    reviews: 378,
    speciality: "Premium group experiences",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 990125814",
  },
  {
    id: 136,
    name: "AlphaGlobe Tours",
    city: "Lucknow",
    category: "International",
    rating: 4.7,
    reviews: 212,
    speciality: "Russia & Eastern Europe",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 963456925",
  },
  {
    id: 137,
    name: "ProMile Corporate",
    city: "Ahmedabad",
    category: "Corporate",
    rating: 4.9,
    reviews: 189,
    speciality: "Education sector travel",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 706787036",
  },
  {
    id: 138,
    name: "GarnetTrek Adventures",
    city: "Goa",
    category: "Adventure",
    rating: 4.7,
    reviews: 134,
    speciality: "Sea kayaking & diving",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 759018147",
  },
  {
    id: 139,
    name: "CelestialTie Honeymoon",
    city: "Chennai",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 178,
    speciality: "Mexico & Caribbean",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 762349258",
  },
  {
    id: 140,
    name: "HarvestMoon Tours",
    city: "Jaipur",
    category: "Domestic",
    rating: 4.7,
    reviews: 256,
    speciality: "Agricultural & village stays",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 775670369",
  },
  {
    id: 141,
    name: "SpireTravel Luxury",
    city: "Kolkata",
    category: "Luxury",
    rating: 4.9,
    reviews: 134,
    speciality: "Myanmar & Cambodia luxury",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 788901593",
  },
  {
    id: 142,
    name: "HubDesk Corporate",
    city: "Mumbai",
    category: "Corporate",
    rating: 4.8,
    reviews: 234,
    speciality: "Media & entertainment",
    yearsInBusiness: 10,
    verified: true,
    phone: "+91 791232604",
  },
  {
    id: 143,
    name: "EpicGrove Groups",
    city: "Delhi",
    category: "Group Tours",
    rating: 4.7,
    reviews: 412,
    speciality: "Adventure group treks",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 804563715",
  },
  {
    id: 144,
    name: "TerraceLux Voyages",
    city: "Hyderabad",
    category: "International",
    rating: 4.8,
    reviews: 223,
    speciality: "New Zealand & Fiji",
    yearsInBusiness: 8,
    verified: true,
    phone: "+91 817894826",
  },
  {
    id: 145,
    name: "GardenPath Travel",
    city: "Bangalore",
    category: "Domestic",
    rating: 4.6,
    reviews: 267,
    speciality: "Karnataka & Tamil Nadu",
    yearsInBusiness: 7,
    verified: true,
    phone: "+91 820125937",
  },
  {
    id: 146,
    name: "SilverBell Honeymoon",
    city: "Lucknow",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 189,
    speciality: "Dubai & Abu Dhabi",
    yearsInBusiness: 6,
    verified: true,
    phone: "+91 833456048",
  },
  {
    id: 147,
    name: "EliteDesk Corporate",
    city: "Ahmedabad",
    category: "Corporate",
    rating: 4.9,
    reviews: 198,
    speciality: "Healthcare sector",
    yearsInBusiness: 11,
    verified: true,
    phone: "+91 846787159",
  },
  {
    id: 148,
    name: "HighAltitude Treks",
    city: "Goa",
    category: "Adventure",
    rating: 4.7,
    reviews: 128,
    speciality: "International trail runs",
    yearsInBusiness: 5,
    verified: true,
    phone: "+91 859018260",
  },
  {
    id: 149,
    name: "LapisLazuli Travel",
    city: "Chennai",
    category: "International",
    rating: 4.8,
    reviews: 212,
    speciality: "Peru & Machu Picchu",
    yearsInBusiness: 9,
    verified: true,
    phone: "+91 862349371",
  },
  {
    id: 150,
    name: "VoyageRoyale Luxury",
    city: "Jaipur",
    category: "Luxury",
    rating: 5.0,
    reviews: 167,
    speciality: "All-inclusive luxury resorts",
    yearsInBusiness: 14,
    verified: true,
    phone: "+91 895670482",
  },
];

const PAGE_SIZE = 12;

function getPageNumbers(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const pages: (number | "ellipsis")[] = [1];
  if (currentPage > 3) pages.push("ellipsis");
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    pages.push(i);
  }
  if (currentPage < totalPages - 2) pages.push("ellipsis");
  pages.push(totalPages);
  return pages;
}

const LOGO_GRADIENTS = [
  "linear-gradient(135deg, #1E40AF 0%, #3B82F6 100%)",
  "linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)",
  "linear-gradient(135deg, #4338CA 0%, #818CF8 100%)",
  "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
  "linear-gradient(135deg, #0369A1 0%, #38BDF8 100%)",
  "linear-gradient(135deg, #065F46 0%, #34D399 100%)",
  "linear-gradient(135deg, #9D174D 0%, #F472B6 100%)",
  "linear-gradient(135deg, #92400E 0%, #FCD34D 100%)",
  "linear-gradient(135deg, #1E3A8A 0%, #60A5FA 100%)",
  "linear-gradient(135deg, #134E4A 0%, #5EEAD4 100%)",
];

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function getLogoGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % LOGO_GRADIENTS.length;
  }
  return LOGO_GRADIENTS[Math.abs(hash) % LOGO_GRADIENTS.length];
}

function VerifiedBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200">
      <ShieldCheck className="h-3 w-3 text-blue-700" />
      <span className="text-xs font-semibold text-blue-700">
        Verified Partner
      </span>
    </div>
  );
}

function getMaskedPhone(id: number): string {
  const prefixes = ["98", "88", "97", "96", "99", "87", "78", "90"];
  const prefix = prefixes[id % prefixes.length];
  const suffix = String(1000 + ((id * 137) % 9000)).slice(0, 4);
  return `+91 ${prefix}XXXX${suffix}`;
}

interface AgencyCardProps {
  agency: Agency;
  index: number;
}

function AgencyCard({ agency, index }: AgencyCardProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  return (
    <div
      data-ocid={`partners.card.${index + 1}`}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden min-h-[340px]"
    >
      {/* Blue top border reveal on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="p-5 flex flex-col h-full">
        {/* Top row: avatar + verified badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="relative flex-shrink-0">
            <div
              className="w-[72px] h-[72px] rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md ring-2 ring-white flex-shrink-0"
              style={{
                background: getLogoGradient(agency.name),
              }}
            >
              {getInitials(agency.name)}
            </div>
            {/* Travel icon accent badge */}
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-700 rounded-full border-2 border-white flex items-center justify-center">
              <Plane className="h-3 w-3 text-white" />
            </div>
          </div>
          <VerifiedBadge />
        </div>

        {/* Name */}
        <h3 className="font-bold text-[15px] text-gray-900 mb-1 group-hover:text-blue-700 transition-colors duration-200 leading-snug">
          {agency.name}
        </h3>

        {/* City */}
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-3">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
          {agency.city}
        </p>

        {/* Specialization tag */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span
            className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full ${
              CATEGORY_COLORS[agency.category] ?? "bg-gray-100 text-gray-700"
            }`}
          >
            {agency.category}
          </span>
        </div>

        {/* Speciality */}
        <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
          {agency.speciality}
        </p>

        {/* Rating + experience row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#C9A227] text-[#C9A227]" />
            <span className="font-bold text-sm text-gray-800">
              {agency.rating}
            </span>
            <span className="text-gray-400 text-xs">
              ({agency.reviews} reviews)
            </span>
          </div>
          <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
            {agency.yearsInBusiness} yrs exp
          </span>
        </div>

        {/* Masked phone */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg mb-3">
          <Phone className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
          <span className="text-gray-500 text-xs font-mono">
            {getMaskedPhone(agency.id)}
          </span>
        </div>
        {/* View Contact button — pushed to bottom */}
        <div className="mt-auto">
          <button
            type="button"
            data-ocid={`partners.card.view_profile.${index + 1}`}
            onClick={(e) => {
              e.stopPropagation();
              setShowContactModal(true);
            }}
            className="w-full py-2 px-4 rounded-xl bg-[#1E40AF] hover:bg-[#1E3A8A] text-white text-sm font-semibold transition-colors duration-200"
          >
            View Contact
          </button>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <dialog
          open
          className="fixed inset-0 bg-transparent z-50 flex items-center justify-center p-4 max-w-none m-0 w-full h-full"
          data-ocid="partners.contact_modal"
          onClick={() => setShowContactModal(false)}
          onKeyDown={(e) => e.key === "Escape" && setShowContactModal(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plane className="h-7 w-7 text-blue-700" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Partner Profile
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Register as a travel partner to access full contact details and
              partner profiles.
            </p>
            <a
              href="/register"
              className="block w-full py-3 px-6 bg-[#E53935] hover:bg-red-700 text-white font-semibold rounded-xl transition-colors duration-200 mb-3"
              data-ocid="partners.contact_modal.register_button"
            >
              Register as Travel Partner
            </a>
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
              data-ocid="partners.contact_modal.close_button"
            >
              Close
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default function Partners() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCity, setActiveCity] = useState("All Cities");
  const [currentPage, setCurrentPage] = useState(1);

  useScrollReveal();

  useEffect(() => {
    document.title = "Verified Travel Partners — Travel N World";
  }, []);

  const filtered = useMemo(() => {
    return agencyData.filter((a) => {
      const matchesCategory =
        activeCategory === "All" || a.category === activeCategory;
      const matchesCity = activeCity === "All Cities" || a.city === activeCity;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.speciality.toLowerCase().includes(q);
      return matchesCategory && matchesCity && matchesSearch;
    });
  }, [search, activeCategory, activeCity]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  // Reset to page 1 on filter/search change
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * PAGE_SIZE;
  const endIndex = Math.min(startIndex + PAGE_SIZE, filtered.length);
  const pageItems = filtered.slice(startIndex, endIndex);

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setCurrentPage(1);
  }

  function handleCityChange(city: string) {
    setActiveCity(city);
    setCurrentPage(1);
  }

  function handleSearchChange(val: string) {
    setSearch(val);
    setCurrentPage(1);
  }

  function scrollToGrid() {
    document
      .getElementById("partners-grid")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function goToPage(page: number) {
    setCurrentPage(page);
    scrollToGrid();
  }

  const pageNumbers = getPageNumbers(safePage, totalPages);

  return (
    <div>
      {/* HEADER */}
      <section
        data-ocid="partners.section"
        className="relative pt-4 pb-12 overflow-hidden"
      >
        <div className="blue-gradient absolute inset-0" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, oklch(100 0 0 / 0.15) 0%, transparent 60%), radial-gradient(circle at 80% 50%, oklch(58 0.18 20 / 0.3) 0%, transparent 50%)",
          }}
        />
        <div className="container-custom relative z-10 text-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-5 animate-fade-in"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ShieldCheck className="h-4 w-4" style={{ color: "#f59e0b" }} />
            <span className="text-sm font-semibold text-white">
              100% Verified & Background-Checked
            </span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 animate-fade-up">
            Verified Travel Partners Across India
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ color: "rgba(255,255,255,0.8)", animationDelay: "0.15s" }}
          >
            Discover 150+ thoroughly vetted travel agencies trusted by thousands
            of travelers across India
          </p>

          {/* Stats Cards Row */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {[
              {
                icon: <Users className="h-7 w-7 text-white" />,
                num: "150+",
                label: "Verified Travel Partners",
                bg: "rgba(255,255,255,0.15)",
              },
              {
                icon: <TrendingUp className="h-7 w-7 text-white" />,
                num: "12,000+",
                label: "Travel Leads Generated",
                bg: "rgba(255,255,255,0.12)",
              },
              {
                icon: <BookCheck className="h-7 w-7 text-white" />,
                num: "5,000+",
                label: "Confirmed Bookings",
                bg: "rgba(255,255,255,0.12)",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-2 px-6 py-5 rounded-2xl"
                style={{
                  background: s.bg,
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div
                  className="p-2 rounded-full"
                  style={{ background: "rgba(255,255,255,0.15)" }}
                >
                  {s.icon}
                </div>
                <span className="font-bold text-3xl text-white">{s.num}</span>
                <span className="text-white/80 text-sm font-medium">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER BAR */}
      <section className="bg-white sticky top-16 md:top-[72px] z-30 border-b border-gray-200 shadow-sm">
        <div className="container-custom py-4">
          {/* Search bar */}
          <div className="relative mb-3 max-w-2xl mx-auto md:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              data-ocid="partners.search_input"
              placeholder="Search by agency name, city, or specialization..."
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-11 pr-4 h-12 rounded-xl border-gray-200 text-sm shadow-sm focus-visible:ring-blue-700 focus-visible:border-blue-700"
            />
          </div>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid="partners.category_filter.tab"
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeCategory === cat
                    ? "text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={activeCategory === cat ? { background: "#1E40AF" } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* City filters */}
          <div className="flex flex-wrap gap-2">
            {CITIES.map((city) => (
              <button
                key={city}
                type="button"
                data-ocid="partners.city_filter.tab"
                onClick={() => handleCityChange(city)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeCity === city
                    ? "text-white shadow-sm"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
                style={activeCity === city ? { background: "#1E40AF" } : {}}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section id="partners-grid" className="py-12 bg-gray-50">
        <div className="container-custom">
          {/* Results counter */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-gray-500 text-sm">
              {filtered.length === 0 ? (
                "No agencies found"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {startIndex + 1}–{endIndex}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-800">
                    {filtered.length}
                  </span>{" "}
                  agencies
                </>
              )}
            </p>
            {filtered.length > 0 && totalPages > 1 && (
              <p className="text-gray-400 text-xs">
                Page {safePage} of {totalPages}
              </p>
            )}
          </div>

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div data-ocid="partners.empty_state" className="text-center py-20">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "#EFF6FF" }}
              >
                <Search className="h-7 w-7" style={{ color: "#1E40AF" }} />
              </div>
              <h3 className="font-semibold text-xl text-gray-800 mb-2">
                No agencies found
              </h3>
              <p className="text-gray-400 mb-5">
                Try a different search term or category filter
              </p>
              <Button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                  setCurrentPage(1);
                }}
                variant="outline"
                className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white rounded-xl"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {pageItems.map((agency, i) => (
                  <AgencyCard key={agency.id} agency={agency} index={i} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-10 flex flex-col items-center gap-3">
                  <Pagination>
                    <PaginationContent className="flex-wrap justify-center gap-1">
                      <PaginationItem>
                        <PaginationPrevious
                          data-ocid="partners.pagination_prev"
                          onClick={() => safePage > 1 && goToPage(safePage - 1)}
                          className={`cursor-pointer rounded-lg transition-colors ${
                            safePage === 1
                              ? "pointer-events-none opacity-40"
                              : "hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        />
                      </PaginationItem>

                      {pageNumbers.map((pg, idx) =>
                        pg === "ellipsis" ? (
                          <PaginationItem
                            key={`ellipsis-before-${String(pageNumbers[idx + 1])}`}
                          >
                            <PaginationEllipsis />
                          </PaginationItem>
                        ) : (
                          <PaginationItem key={pg}>
                            <PaginationLink
                              data-ocid={"partners.pagination_next"}
                              onClick={() => goToPage(pg as number)}
                              isActive={safePage === pg}
                              className={`cursor-pointer rounded-lg w-9 h-9 flex items-center justify-center text-sm font-medium transition-all ${
                                safePage === pg
                                  ? "text-white shadow-sm"
                                  : "hover:bg-blue-50 hover:text-blue-700"
                              }`}
                              style={
                                safePage === pg
                                  ? {
                                      background: "#1E40AF",
                                      borderColor: "#1E40AF",
                                    }
                                  : {}
                              }
                            >
                              {pg}
                            </PaginationLink>
                          </PaginationItem>
                        ),
                      )}

                      <PaginationItem>
                        <PaginationNext
                          data-ocid="partners.pagination_next"
                          onClick={() =>
                            safePage < totalPages && goToPage(safePage + 1)
                          }
                          className={`cursor-pointer rounded-lg transition-colors ${
                            safePage === totalPages
                              ? "pointer-events-none opacity-40"
                              : "hover:bg-blue-50 hover:text-blue-700"
                          }`}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

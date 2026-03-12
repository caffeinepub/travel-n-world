import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, Search, ShieldCheck, Star } from "lucide-react";
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
}

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
  International: "bg-purple-100 text-purple-700",
  Luxury: "bg-amber-100 text-amber-700",
  Adventure: "bg-green-100 text-green-700",
  Honeymoon: "bg-pink-100 text-pink-700",
  Corporate: "bg-slate-100 text-slate-700",
  "Group Tours": "bg-orange-100 text-orange-700",
};

const _CATEGORY_BG: Record<string, string> = {
  Domestic: "rgba(219,234,254,0.35)",
  International: "rgba(237,233,254,0.35)",
  Luxury: "rgba(254,243,199,0.35)",
  Adventure: "rgba(220,252,231,0.35)",
  Honeymoon: "rgba(252,231,243,0.35)",
  Corporate: "rgba(241,245,249,0.35)",
  "Group Tours": "rgba(255,237,213,0.35)",
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
  },
  {
    id: 5,
    name: "Summit Adventures",
    city: "Pune",
    category: "Adventure",
    rating: 4.8,
    reviews: 156,
    speciality: "Himalayan trekking & camping",
    yearsInBusiness: 8,
    verified: true,
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
  },
  {
    id: 17,
    name: "Azure Horizons",
    city: "Pune",
    category: "International",
    rating: 4.8,
    reviews: 167,
    speciality: "Mediterranean cruises",
    yearsInBusiness: 9,
    verified: true,
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
  },
  {
    id: 26,
    name: "NextGen Corporate Travel",
    city: "Pune",
    category: "Corporate",
    rating: 4.9,
    reviews: 198,
    speciality: "Tech company travel desks",
    yearsInBusiness: 8,
    verified: true,
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
  },
  {
    id: 39,
    name: "Coastal Bliss Travels",
    city: "Pune",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 198,
    speciality: "Konkan coast getaways",
    yearsInBusiness: 6,
    verified: true,
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
  },
  {
    id: 51,
    name: "ThunderPass Treks",
    city: "Pune",
    category: "Adventure",
    rating: 4.7,
    reviews: 123,
    speciality: "Sahyadri & Konkan hikes",
    yearsInBusiness: 5,
    verified: true,
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
  },
  {
    id: 62,
    name: "TourVista Global",
    city: "Pune",
    category: "International",
    rating: 4.8,
    reviews: 223,
    speciality: "Turkey & Egypt circuits",
    yearsInBusiness: 8,
    verified: true,
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
  },
  {
    id: 72,
    name: "FestiveFly Groups",
    city: "Pune",
    category: "Group Tours",
    rating: 4.7,
    reviews: 423,
    speciality: "Festival & event groups",
    yearsInBusiness: 11,
    verified: true,
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
  },
  {
    id: 83,
    name: "ZenithTravel Co",
    city: "Pune",
    category: "International",
    rating: 4.8,
    reviews: 212,
    speciality: "Latin America circuits",
    yearsInBusiness: 9,
    verified: true,
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
  },
  {
    id: 95,
    name: "SundownerGroup Co",
    city: "Pune",
    category: "Group Tours",
    rating: 4.6,
    reviews: 389,
    speciality: "Pilgrimage & religious tours",
    yearsInBusiness: 14,
    verified: true,
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
  },
  {
    id: 106,
    name: "DiamondClass Travel",
    city: "Pune",
    category: "Luxury",
    rating: 4.9,
    reviews: 145,
    speciality: "Business class upgrades",
    yearsInBusiness: 11,
    verified: true,
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
  },
  {
    id: 116,
    name: "Mirage Luxury Travel",
    city: "Pune",
    category: "Luxury",
    rating: 5.0,
    reviews: 134,
    speciality: "Morocco & Jordan luxury",
    yearsInBusiness: 10,
    verified: true,
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
  },
  {
    id: 126,
    name: "NationWide Groups",
    city: "Pune",
    category: "Group Tours",
    rating: 4.7,
    reviews: 445,
    speciality: "All-India group circuits",
    yearsInBusiness: 15,
    verified: true,
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
  },
  {
    id: 136,
    name: "AlphaGlobe Tours",
    city: "Pune",
    category: "International",
    rating: 4.7,
    reviews: 212,
    speciality: "Russia & Eastern Europe",
    yearsInBusiness: 8,
    verified: true,
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
  },
  {
    id: 146,
    name: "SilverBell Honeymoon",
    city: "Pune",
    category: "Honeymoon",
    rating: 4.8,
    reviews: 189,
    speciality: "Dubai & Abu Dhabi",
    yearsInBusiness: 6,
    verified: true,
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
  },
];

const PAGE_SIZE = 24;

function VerifiedBadge() {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200">
      <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
      <span className="text-xs font-semibold text-green-700">Verified</span>
    </div>
  );
}

export default function Partners() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useScrollReveal();

  useEffect(() => {
    document.title = "Verified Travel Partners — Travel N World";
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on filter/search change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, activeCategory]);

  const filtered = useMemo(() => {
    return agencyData.filter((a) => {
      const matchesCategory =
        activeCategory === "All" || a.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q) ||
        a.speciality.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      {/* HEADER */}
      <section
        data-ocid="partners.section"
        className="relative pt-32 pb-16 overflow-hidden"
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
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 animate-fade-in"
            style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ShieldCheck className="h-4 w-4 text-gold" />
            <span className="text-sm font-semibold text-white">
              100% Verified & Background-Checked
            </span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-5 animate-fade-up">
            Verified Travel Partners
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up"
            style={{ color: "rgba(255,255,255,0.8)", animationDelay: "0.15s" }}
          >
            Discover 150+ thoroughly vetted travel agencies trusted by thousands
            of travelers across India
          </p>
          {/* Stat Strip */}
          <div
            className="inline-flex flex-wrap items-center justify-center gap-2 md:gap-6 px-8 py-4 rounded-2xl animate-fade-up"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
              animationDelay: "0.3s",
            }}
          >
            {[
              { num: "150", label: "Verified Agencies" },
              { num: "12", label: "Cities" },
              { num: "8", label: "Categories" },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                {i > 0 && (
                  <span className="hidden md:block w-px h-6 bg-white/20" />
                )}
                <span className="font-bold text-gold text-2xl">{s.num}</span>
                <span className="text-white/80 text-sm">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH + FILTER */}
      <section className="bg-white sticky top-20 z-30 border-b border-border shadow-xs">
        <div className="container-custom py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                data-ocid="partners.search_input"
                placeholder="Search agencies by name or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 rounded-xl border-border h-11"
              />
            </div>
            {/* Filter tabs */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  data-ocid="partners.filter.tab"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white shadow-blue"
                      : "bg-royal-50 text-foreground hover:bg-royal-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="section-padding bg-royal-50">
        <div className="container-custom">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {visible.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {filtered.length}
              </span>{" "}
              agencies
            </p>
          </div>

          {filtered.length === 0 ? (
            <div data-ocid="partners.empty_state" className="text-center py-20">
              <div className="w-16 h-16 bg-royal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-xl text-foreground mb-2">
                No agencies found
              </h3>
              <p className="text-muted-foreground mb-5">
                Try a different search term or category filter
              </p>
              <Button
                onClick={() => {
                  setSearch("");
                  setActiveCategory("All");
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-xl"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {visible.map((agency, i) => (
                  <div
                    key={agency.id}
                    data-ocid={`partners.card.${i + 1}`}
                    className={`group partner-card-hover reveal reveal-delay-${(i % 3) + 1} bg-white rounded-2xl border border-border shadow-sm cursor-pointer`}
                  >
                    <div className="p-6">
                      {/* Top row */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 blue-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md flex-shrink-0">
                          {agency.name.charAt(0)}
                        </div>
                        <VerifiedBadge />
                      </div>

                      {/* Name + city */}
                      <h3 className="font-bold text-base text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                        {agency.name}
                      </h3>
                      <p className="text-muted-foreground text-sm flex items-center gap-1 mb-3">
                        <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                        {agency.city}
                      </p>

                      {/* Category badge */}
                      <span
                        className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-3 ${CATEGORY_COLORS[agency.category]}`}
                      >
                        {agency.category}
                      </span>

                      {/* Speciality */}
                      <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                        {agency.speciality}
                      </p>

                      {/* Bottom row */}
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                          <span className="font-bold text-sm text-foreground">
                            {agency.rating}
                          </span>
                          <span className="text-muted-foreground text-xs">
                            ({agency.reviews} reviews)
                          </span>
                        </div>
                        <span className="px-2.5 py-1 bg-royal-50 text-primary text-xs font-medium rounded-full">
                          {agency.yearsInBusiness} yrs
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button
                    data-ocid="partners.primary_button"
                    size="lg"
                    onClick={() => setVisibleCount((p) => p + PAGE_SIZE)}
                    className="bg-primary hover:bg-primary-light text-white font-semibold h-12 px-10 rounded-2xl border-0 shadow-blue"
                  >
                    Load More Agencies ({filtered.length - visibleCount}{" "}
                    remaining)
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

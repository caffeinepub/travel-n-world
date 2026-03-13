// Deterministic partner plan data generator for Travel N World B2B Marketplace

export type PlanType = "Starter" | "Professional" | "Premium";
export type PlanStatus = "Active" | "Inactive" | "Expired";
export type PaymentStatus = "Paid" | "Pending" | "Failed";

export interface PartnerPlan {
  id: number;
  partnerName: string;
  company: string;
  city: string;
  planType: PlanType;
  price: string;
  startDate: string;
  expiryDate: string;
  paymentStatus: PaymentStatus;
  status: PlanStatus;
}

const FIRST_NAMES = [
  "Rajesh",
  "Priya",
  "Aman",
  "Sunita",
  "Vikram",
  "Anjali",
  "Suresh",
  "Kavita",
  "Deepak",
  "Meena",
  "Rohit",
  "Nisha",
  "Arjun",
  "Pooja",
  "Sanjay",
  "Rekha",
  "Anil",
  "Geeta",
  "Mahesh",
  "Seema",
  "Ravi",
  "Neha",
  "Nitin",
  "Sona",
  "Kiran",
  "Alok",
  "Divya",
  "Rahul",
  "Swati",
  "Vijay",
  "Manisha",
  "Amit",
  "Poonam",
  "Sachin",
  "Shruti",
  "Pankaj",
  "Jyoti",
  "Vishal",
  "Ritu",
  "Gaurav",
  "Archana",
  "Hemant",
  "Usha",
  "Dinesh",
  "Lata",
  "Mukesh",
  "Varsha",
  "Naresh",
  "Sarita",
  "Bharat",
  "Indu",
  "Ramesh",
  "Kamla",
  "Girish",
  "Santosh",
  "Manju",
  "Ajay",
  "Shobha",
  "Sunil",
  "Asha",
  "Vinod",
  "Sudha",
  "Vikas",
  "Urmila",
  "Harish",
  "Pratibha",
  "Mohan",
  "Vandana",
  "Prasad",
  "Nirmala",
  "Yogesh",
  "Sushma",
  "Trilok",
  "Padma",
  "Kamlesh",
  "Veena",
  "Lalit",
  "Renu",
  "Rakesh",
  "Nalini",
];

const LAST_NAMES = [
  "Sharma",
  "Gupta",
  "Singh",
  "Patel",
  "Verma",
  "Mehta",
  "Joshi",
  "Agarwal",
  "Kumar",
  "Reddy",
  "Nair",
  "Rao",
  "Kapoor",
  "Malhotra",
  "Saxena",
  "Bose",
  "Das",
  "Chatterjee",
  "Banerjee",
  "Mukherjee",
  "Pillai",
  "Menon",
  "Iyer",
  "Srinivas",
  "Naidu",
  "Chandra",
  "Tiwari",
  "Mishra",
  "Pandey",
  "Dubey",
  "Chauhan",
  "Yadav",
  "Shah",
  "Desai",
  "Jain",
  "Bhatt",
  "Trivedi",
  "Thakur",
  "Choudhary",
  "Sinha",
  "Shukla",
  "Awasthi",
  "Srivastava",
  "Mathur",
  "Bhatia",
];

const COMPANY_PREFIXES = [
  "SkyWing",
  "Royal Journey",
  "BlueSky",
  "TravelEase",
  "Global Wings",
  "Dreamland",
  "Holiday Route",
  "Golden Globe",
  "Horizon",
  "Wanderlust",
  "Paradise",
  "Sunrise",
  "Summit",
  "Luxury",
  "Heritage",
  "Premier",
  "Elite",
  "Grand",
  "Classic",
  "Crown",
  "Star",
  "Silver",
  "Pearl",
  "Diamond",
  "Platinum",
  "Emerald",
  "Zenith",
  "Alpha",
  "Omega",
  "Apex",
  "Victory",
  "Triumph",
  "Fortune",
  "Prestige",
  "Majestic",
  "Imperial",
  "Regal",
  "Noble",
  "Supreme",
  "Pinnacle",
  "Excellence",
  "Merit",
  "Valor",
  "Bright",
  "Swift",
  "Eagle",
  "Phoenix",
  "Falcon",
  "Tiger",
  "Lion",
  "Voyage",
  "Yatra",
  "Safar",
  "Pravasi",
  "Parikrama",
  "Tirtha",
  "Discover",
];

const COMPANY_SUFFIXES = [
  "Tours",
  "Travels",
  "Holidays",
  "India",
  "Travel",
  "Adventures",
  "Expeditions",
  "Journeys",
  "Tourism",
  "Getaways",
  "Escapes",
  "Destinations",
  "Trip",
  "Globe",
  "World",
  "Asia",
  "International",
  "Services",
  "Pvt Ltd",
  "Enterprises",
  "Solutions",
  "Group",
  "Agency",
  "Network",
  "Associates",
];

const CITIES = [
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
  "Pune",
  "Chandigarh",
  "Surat",
  "Indore",
  "Bhopal",
  "Nagpur",
  "Agra",
  "Varanasi",
  "Coimbatore",
  "Kochi",
  "Mysore",
  "Vadodara",
  "Rajkot",
  "Nashik",
];

const PLAN_CONFIG: Record<PlanType, { price: string; months: number }> = {
  Starter: { price: "₹3,000", months: 3 },
  Professional: { price: "₹6,000", months: 6 },
  Premium: { price: "₹12,000", months: 12 },
};

// Simple deterministic pseudo-random using seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function addMonths(dateStr: string, months: number): string {
  const d = new Date(dateStr);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().split("T")[0];
}

function randomDateInRange(
  seed: number,
  startYear: number,
  endYear: number,
): string {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  const ts = start + Math.floor(seededRandom(seed) * (end - start));
  return new Date(ts).toISOString().split("T")[0];
}

let _cachedPlans: PartnerPlan[] | null = null;

export function generatePartnerPlans(): PartnerPlan[] {
  if (_cachedPlans) return _cachedPlans;

  const plans: PartnerPlan[] = [];

  // Distribution: 3000 Starter, 1500 Professional, 500 Premium
  const distribution: [PlanType, number][] = [
    ["Starter", 3000],
    ["Professional", 1500],
    ["Premium", 500],
  ];

  let id = 1;
  for (const [planType, count] of distribution) {
    for (let i = 0; i < count; i++) {
      const seed = id * 17 + i * 31;
      const firstName = pick(FIRST_NAMES, seed);
      const lastName = pick(LAST_NAMES, seed + 3);
      const prefix = pick(COMPANY_PREFIXES, seed + 7);
      const suffix = pick(COMPANY_SUFFIXES, seed + 11);
      const city = pick(CITIES, seed + 13);
      const cfg = PLAN_CONFIG[planType];

      // Start dates spread across 2024-2026
      const startDate = randomDateInRange(seed + 5, 2024, 2026);
      const expiryDate = addMonths(startDate, cfg.months);
      const expiry = new Date(expiryDate);
      const now = new Date("2026-03-13");

      let status: PlanStatus;
      let paymentStatus: PaymentStatus;

      const r = seededRandom(seed + 19);
      if (expiry < now) {
        status = "Expired";
        paymentStatus = "Paid";
      } else if (r < 0.03) {
        status = "Inactive";
        paymentStatus = seededRandom(seed + 23) < 0.5 ? "Pending" : "Failed";
      } else {
        status = "Active";
        paymentStatus = seededRandom(seed + 27) < 0.97 ? "Paid" : "Pending";
      }

      plans.push({
        id,
        partnerName: `${firstName} ${lastName}`,
        company: `${prefix} ${suffix}`,
        city,
        planType,
        price: cfg.price,
        startDate,
        expiryDate,
        paymentStatus,
        status,
      });
      id++;
    }
  }

  _cachedPlans = plans;
  return plans;
}

export function getPlanSummary(plans: PartnerPlan[]) {
  const summary = {
    Starter: { total: 0, active: 0 },
    Professional: { total: 0, active: 0 },
    Premium: { total: 0, active: 0 },
  };
  for (const p of plans) {
    summary[p.planType].total++;
    if (p.status === "Active") summary[p.planType].active++;
  }
  return summary;
}

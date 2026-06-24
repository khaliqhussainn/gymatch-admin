export const mockUsers = [
  { id: 1, name: "Alex Rivera", email: "alex.rivera@gmail.com", status: "active", joinDate: "2024-01-15", avatar: "AR", role: "user", gymVisits: 48 },
  { id: 2, name: "Sophia Chen", email: "sophia.chen@outlook.com", status: "active", joinDate: "2024-01-22", avatar: "SC", role: "user", gymVisits: 112 },
  { id: 3, name: "Marcus Johnson", email: "marcus.j@yahoo.com", status: "suspended", joinDate: "2024-02-03", avatar: "MJ", role: "user", gymVisits: 7 },
  { id: 4, name: "Emma Williams", email: "emma.w@gmail.com", status: "active", joinDate: "2024-02-14", avatar: "EW", role: "user", gymVisits: 89 },
  { id: 5, name: "Daniel Kim", email: "dkim@proton.me", status: "active", joinDate: "2024-02-28", avatar: "DK", role: "user", gymVisits: 203 },
  { id: 6, name: "Isabella Torres", email: "i.torres@gmail.com", status: "inactive", joinDate: "2024-03-05", avatar: "IT", role: "user", gymVisits: 2 },
  { id: 7, name: "Noah Martinez", email: "noah.m@gmail.com", status: "active", joinDate: "2024-03-12", avatar: "NM", role: "user", gymVisits: 56 },
  { id: 8, name: "Olivia Brown", email: "olivia.b@icloud.com", status: "active", joinDate: "2024-03-19", avatar: "OB", role: "user", gymVisits: 134 },
  { id: 9, name: "Liam Davis", email: "liam.davis@gmail.com", status: "suspended", joinDate: "2024-03-25", avatar: "LD", role: "user", gymVisits: 14 },
  { id: 10, name: "Ava Wilson", email: "ava.wilson@outlook.com", status: "active", joinDate: "2024-04-02", avatar: "AW", role: "user", gymVisits: 77 },
  { id: 11, name: "James Garcia", email: "j.garcia@gmail.com", status: "active", joinDate: "2024-04-10", avatar: "JG", role: "user", gymVisits: 91 },
  { id: 12, name: "Charlotte Lee", email: "c.lee@yahoo.com", status: "active", joinDate: "2024-04-18", avatar: "CL", role: "user", gymVisits: 44 },
  { id: 13, name: "Benjamin Harris", email: "ben.h@gmail.com", status: "inactive", joinDate: "2024-04-25", avatar: "BH", role: "user", gymVisits: 0 },
  { id: 14, name: "Amelia Clark", email: "amelia.c@gmail.com", status: "active", joinDate: "2024-05-01", avatar: "AC", role: "user", gymVisits: 166 },
  { id: 15, name: "Ethan Lewis", email: "ethan.l@proton.me", status: "active", joinDate: "2024-05-08", avatar: "EL", role: "user", gymVisits: 58 },
  { id: 16, name: "Mia Robinson", email: "mia.r@gmail.com", status: "active", joinDate: "2024-05-14", avatar: "MR", role: "user", gymVisits: 99 },
  { id: 17, name: "Lucas Walker", email: "l.walker@outlook.com", status: "suspended", joinDate: "2024-05-20", avatar: "LW", role: "user", gymVisits: 3 },
  { id: 18, name: "Harper Hall", email: "harper.h@gmail.com", status: "active", joinDate: "2024-05-27", avatar: "HH", role: "user", gymVisits: 71 },
  { id: 19, name: "Mason Allen", email: "mason.a@icloud.com", status: "active", joinDate: "2024-06-03", avatar: "MA", role: "user", gymVisits: 38 },
  { id: 20, name: "Evelyn Young", email: "evelyn.y@gmail.com", status: "active", joinDate: "2024-06-10", avatar: "EY", role: "user", gymVisits: 22 },
];

export const mockCategories = [
  { id: 1, name: "Gym", icon: "🏋️", description: "Traditional weight training and fitness centers", gymCount: 148, color: "#D9FF00" },
  { id: 2, name: "CrossFit", icon: "⚡", description: "High-intensity functional training boxes", gymCount: 63, color: "#FF6B35" },
  { id: 3, name: "Yoga", icon: "🧘", description: "Yoga studios, meditation and mindfulness", gymCount: 94, color: "#A855F7" },
  { id: 4, name: "MMA", icon: "🥊", description: "Mixed martial arts, boxing and combat sports", gymCount: 37, color: "#EF4444" },
  { id: 5, name: "Women Only", icon: "♀️", description: "Female-exclusive fitness environments", gymCount: 29, color: "#EC4899" },
];

export const mockStats = {
  totalGyms: 371,
  totalUsers: 20,
  activeUsers: 14,
  mostViewedGym: "Titan Fitness Hub",
  totalGymsTrend: +12.4,
  totalUsersTrend: +8.7,
  activeUsersTrend: +5.2,
  mostViewedTrend: +34.1,
  weeklySignups: [3, 5, 2, 8, 6, 11, 7],
  monthlyVisits: [820, 940, 1100, 890, 1320, 1580, 1420, 1760, 1900, 2100, 1980, 2340],
};

export const mockActivityFeed = [
  { id: 1, type: "user_join", message: "Evelyn Young joined the platform", time: "2 min ago", icon: "join" },
  { id: 2, type: "gym_view", message: "Titan Fitness Hub reached 500 views", time: "18 min ago", icon: "view" },
  { id: 3, type: "user_suspend", message: "Lucas Walker was suspended", time: "1 hr ago", icon: "suspend" },
  { id: 4, type: "category_add", message: "New category 'Women Only' was added", time: "3 hr ago", icon: "category" },
  { id: 5, type: "user_join", message: "Mason Allen joined the platform", time: "5 hr ago", icon: "join" },
  { id: 6, type: "gym_view", message: "IronCore CrossFit hit a weekly record", time: "8 hr ago", icon: "view" },
  { id: 7, type: "user_join", message: "Harper Hall joined the platform", time: "1 day ago", icon: "join" },
  { id: 8, type: "user_activate", message: "Isabella Torres was reactivated", time: "1 day ago", icon: "activate" },
];

export const mockTopGyms = [
  { id: 1, name: "Titan Fitness Hub", category: "Gym", views: 2341, rating: 4.9 },
  { id: 2, name: "IronCore CrossFit", category: "CrossFit", views: 1876, rating: 4.7 },
  { id: 3, name: "Zenith Yoga Studio", category: "Yoga", views: 1542, rating: 4.8 },
  { id: 4, name: "Combat Zone MMA", category: "MMA", views: 1203, rating: 4.6 },
  { id: 5, name: "FemFit Studio", category: "Women Only", views: 987, rating: 4.9 },
];

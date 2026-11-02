import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import {
  INITIAL_SCHOOLS,
  SRI_LANKAN_DISTRICTS,
  UserRole,
  AccountStatus,
  VerificationStatus,
  VehicleType,
  BookingStatus,
  RideStatus,
  PassengerPickupStatus,
  NotificationType,
  ComplaintStatus,
} from '@schoolride/shared';

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const JWT_SECRET = process.env.JWT_ACCESS_SECRET || 'dev-access-secret-schoolride-lk-min-32-chars-long!';

// ==========================================
// IN-MEMORY DATABASE STATE
// ==========================================

interface MockUser {
  id: string;
  email: string;
  password: string; // Plaintext for mock check
  fullName: string;
  phone: string;
  role: 'PARENT' | 'DRIVER' | 'ADMIN';
  status: string;
  district?: string;
  city?: string;
  createdAt: string;
  driverProfileId?: string;
  parentProfileId?: string;
}

let users: MockUser[] = [
  {
    id: 'user-admin-01',
    email: 'admin@schoolride.lk',
    password: 'AdminPassword123!',
    fullName: 'Platform Administrator',
    phone: '+94771234567',
    role: 'ADMIN',
    status: 'ACTIVE',
    district: 'Colombo',
    city: 'Colombo 07',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'user-driver-01',
    email: 'sunil.driver@schoolride.lk',
    password: 'DriverPassword123!',
    fullName: 'Sunil Jayawardena',
    phone: '+94771234001',
    role: 'DRIVER',
    status: 'ACTIVE',
    district: 'Colombo',
    city: 'Nugegoda',
    driverProfileId: 'driver-prof-01',
    createdAt: new Date('2026-01-05').toISOString(),
  },
  {
    id: 'user-driver-02',
    email: 'ruwan.pending@schoolride.lk',
    password: 'DriverPassword123!',
    fullName: 'Ruwan Senaratne',
    phone: '+94771234005',
    role: 'DRIVER',
    status: 'PENDING_VERIFICATION',
    district: 'Colombo',
    city: 'Homagama',
    driverProfileId: 'driver-prof-02',
    createdAt: new Date('2026-02-15').toISOString(),
  },
  {
    id: 'user-parent-01',
    email: 'parent@schoolride.lk',
    password: 'ParentPassword123!',
    fullName: 'Chathura Silva',
    phone: '+94779876543',
    role: 'PARENT',
    status: 'ACTIVE',
    district: 'Colombo',
    city: 'Nugegoda',
    parentProfileId: 'parent-prof-01',
    createdAt: new Date('2026-01-10').toISOString(),
  },
];

let schools = [...INITIAL_SCHOOLS];

let vehicles: any[] = [
  {
    id: 'veh-01',
    driverProfileId: 'driver-prof-01',
    vehicleType: 'VAN',
    make: 'Toyota',
    model: 'HiAce Super GL',
    year: 2018,
    licensePlate: 'WP NA-4521',
    capacity: 14,
    isAirConditioned: true,
    hasEmergencyExit: true,
    hasFireExtinguisher: true,
    hasFirstAidKit: true,
    insuranceExpiry: '2027-08-15',
    revenueLicenseExpiry: '2027-08-15',
    verificationStatus: 'APPROVED',
    documents: [],
  },
  {
    id: 'veh-02',
    driverProfileId: 'driver-prof-02',
    vehicleType: 'VAN',
    make: 'Nissan',
    model: 'Caravan NV350',
    year: 2017,
    licensePlate: 'WP NB-9912',
    capacity: 14,
    isAirConditioned: true,
    hasEmergencyExit: true,
    hasFireExtinguisher: true,
    hasFirstAidKit: true,
    insuranceExpiry: '2027-04-10',
    revenueLicenseExpiry: '2027-04-10',
    verificationStatus: 'PENDING',
    documents: [],
  },
];

let driverProfiles: any[] = [
  {
    id: 'driver-prof-01',
    userId: 'user-driver-01',
    nicNumber: '197512345678',
    licenseNumber: 'B1234567',
    experienceYears: 14,
    bio: 'Professional school van operator with over 14 years accident-free service in Colombo. Specialised in Royal College and Visakha Vidyalaya morning and afternoon routes.',
    ratingAverage: 4.95,
    ratingCount: 38,
    verificationStatus: 'APPROVED',
    verifiedAt: new Date('2026-01-06').toISOString(),
    serviceAreas: [
      {
        id: 'sa-01',
        driverProfileId: 'driver-prof-01',
        district: 'Colombo',
        city: 'Nugegoda',
        operatingAreas: ['Nugegoda', 'Maharagama', 'Kotte', 'Bambalapitiya', 'Cinnamon Gardens'],
        monthlyRateMinorUnits: 1800000,
      },
    ],
    schoolIds: ['school-col-01', 'school-col-02'],
    documents: [
      {
        id: 'doc-01',
        driverProfileId: 'driver-prof-01',
        documentType: 'NIC_FRONT',
        fileName: 'nic-front.jpg',
        fileKey: 'docs/sample-nic-front.jpg',
        fileSize: 350000,
        mimeType: 'image/jpeg',
        isVerified: true,
      },
      {
        id: 'doc-02',
        driverProfileId: 'driver-prof-01',
        documentType: 'DRIVING_LICENSE_FRONT',
        fileName: 'driving-license.jpg',
        fileKey: 'docs/sample-license-front.jpg',
        fileSize: 420000,
        mimeType: 'image/jpeg',
        isVerified: true,
      },
    ],
  },
  {
    id: 'driver-prof-02',
    userId: 'user-driver-02',
    nicNumber: '199012345678',
    licenseNumber: 'B9988776',
    experienceYears: 4,
    bio: 'New applicant seeking verification for Homagama to Colombo 07 school routes.',
    ratingAverage: 5.0,
    ratingCount: 0,
    verificationStatus: 'PENDING',
    serviceAreas: [
      {
        id: 'sa-02',
        driverProfileId: 'driver-prof-02',
        district: 'Colombo',
        city: 'Homagama',
        operatingAreas: ['Homagama', 'Maharagama', 'Nugegoda'],
        monthlyRateMinorUnits: 1600000,
      },
    ],
    schoolIds: ['school-col-01'],
    documents: [
      {
        id: 'doc-03',
        driverProfileId: 'driver-prof-02',
        documentType: 'NIC_FRONT',
        fileName: 'national-id-front.jpg',
        fileKey: 'docs/sample-nic-front.jpg',
        fileSize: 450200,
        mimeType: 'image/jpeg',
        isVerified: false,
      },
      {
        id: 'doc-04',
        driverProfileId: 'driver-prof-02',
        documentType: 'DRIVING_LICENSE_FRONT',
        fileName: 'driving-license.jpg',
        fileKey: 'docs/sample-license-front.jpg',
        fileSize: 520100,
        mimeType: 'image/jpeg',
        isVerified: false,
      },
    ],
  },
];

let parentProfiles: any[] = [
  {
    id: 'parent-prof-01',
    userId: 'user-parent-01',
    address: 'No 45, Chapel Road, Nugegoda',
    city: 'Nugegoda',
    district: 'Colombo',
    emergencyContactName: 'Manel Silva (Mother)',
    emergencyContactPhone: '+94779876544',
  },
];

let children: any[] = [
  {
    id: 'child-01',
    parentId: 'parent-prof-01',
    firstName: 'Dineth',
    lastName: 'Silva',
    dateOfBirth: '2014-05-12',
    gender: 'MALE',
    schoolId: 'school-col-01',
    grade: 'Grade 7',
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    pickupLatitude: 6.8722,
    pickupLongitude: 79.8997,
    dropoffAddress: 'Royal College, Rajakeeya Mawatha, Colombo 07',
    dropoffLatitude: 6.9066,
    dropoffLongitude: 79.8617,
    specialNotes: 'Prefers front seat if possible. Has asthma inhaler in bag.',
  },
  {
    id: 'child-02',
    parentId: 'parent-prof-01',
    firstName: 'Senuri',
    lastName: 'Silva',
    dateOfBirth: '2017-09-20',
    gender: 'FEMALE',
    schoolId: 'school-col-02',
    grade: 'Grade 4',
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    pickupLatitude: 6.8722,
    pickupLongitude: 79.8997,
    dropoffAddress: 'Visakha Vidyalaya, Vajira Road, Colombo 05',
    dropoffLatitude: 6.8903,
    dropoffLongitude: 79.8596,
    specialNotes: 'Accompanied by brother Dineth in the morning.',
  },
];

let bookings: any[] = [
  {
    id: 'booking-01',
    parentId: 'parent-prof-01',
    childId: 'child-01',
    driverProfileId: 'driver-prof-01',
    vehicleId: 'veh-01',
    pickupAddress: 'No 45, Chapel Road, Nugegoda',
    pickupLatitude: 6.8722,
    pickupLongitude: 79.8997,
    dropoffAddress: 'Royal College, Rajakeeya Mawatha, Colombo 07',
    dropoffLatitude: 6.9066,
    dropoffLongitude: 79.8617,
    pickupTimeMorning: '06:30',
    dropoffTimeAfternoon: '14:00',
    startDate: '2026-01-10',
    monthlyFeeMinorUnits: 1800000,
    status: 'ACTIVE',
    notes: 'Confirmed for the 2026 school year.',
    createdAt: new Date('2026-01-08').toISOString(),
  },
];

let reviews: any[] = [
  {
    id: 'rev-01',
    bookingId: 'booking-01',
    driverProfileId: 'driver-prof-01',
    parentId: 'parent-prof-01',
    rating: 5,
    comment:
      'Uncle Sunil has been taking Dineth to Royal College every day without a minute of delay. Highly trustworthy and caring driver!',
    isPublic: true,
    createdAt: new Date('2026-02-01').toISOString(),
  },
];

let complaints: any[] = [
  {
    id: 'comp-01',
    createdByUserId: 'user-parent-01',
    targetUserId: 'user-driver-01',
    bookingId: 'booking-01',
    category: 'PUNCTUALITY',
    title: 'Minor delay due to High Level Road traffic',
    description:
      'Van was delayed by 10 minutes on Tuesday morning due to unexpected construction near Nugegoda junction.',
    status: 'OPEN',
    adminNotes: null,
    createdAt: new Date('2026-02-20').toISOString(),
  },
];

let notifications: any[] = [
  {
    id: 'notif-01',
    userId: 'user-parent-01',
    title: 'Booking Active with Sunil Jayawardena',
    message: 'Transport service for Dineth to Royal College Colombo is confirmed and active.',
    type: 'BOOKING_ACCEPTED',
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-02',
    userId: 'user-driver-01',
    title: 'Route Readiness',
    message: 'You have 1 student scheduled on your morning route.',
    type: 'SYSTEM',
    read: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-03',
    userId: 'user-admin-01',
    title: 'Pending Driver Verification',
    message: 'Ruwan Senaratne has submitted documents for verification.',
    type: 'VERIFICATION_SUBMITTED',
    read: false,
    createdAt: new Date().toISOString(),
  },
];

let auditLogs: any[] = [
  {
    id: 'log-01',
    action: 'DRIVER_VERIFICATION_APPROVED',
    actorUserId: 'user-admin-01',
    targetType: 'DRIVER',
    targetId: 'driver-prof-01',
    details: { driverName: 'Sunil Jayawardena', district: 'Colombo' },
    ipAddress: '127.0.0.1',
    createdAt: new Date('2026-01-06T08:30:00Z').toISOString(),
  },
  {
    id: 'log-02',
    action: 'BOOKING_ACCEPTED',
    actorUserId: 'user-driver-01',
    targetType: 'BOOKING',
    targetId: 'booking-01',
    details: { child: 'Dineth Silva', school: 'Royal College, Colombo' },
    ipAddress: '127.0.0.1',
    createdAt: new Date('2026-01-08T09:15:00Z').toISOString(),
  },
];

let activeRide: any = {
  id: 'ride-01',
  driverProfileId: 'driver-prof-01',
  vehicleId: 'veh-01',
  routeName: 'Morning School Run - Colombo Central',
  routeDirection: 'MORNING_PICKUP',
  status: 'IN_PROGRESS',
  currentLatitude: 6.8920,
  currentLongitude: 79.8700,
  currentSpeed: 30,
  currentHeading: 340,
  lastLocationUpdateAt: new Date().toISOString(),
  startedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  passengers: [
    {
      id: 'pass-01',
      rideSessionId: 'ride-01',
      bookingId: 'booking-01',
      pickupStatus: 'PICKED_UP',
      pickedUpAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    },
  ],
  locations: [
    { latitude: 6.8722, longitude: 79.8997, speed: 20, heading: 320, recordedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
    { latitude: 6.8810, longitude: 79.8850, speed: 28, heading: 330, recordedAt: new Date(Date.now() - 8 * 60 * 1000).toISOString() },
    { latitude: 6.8920, longitude: 79.8700, speed: 30, heading: 340, recordedAt: new Date().toISOString() },
  ],
};

// ==========================================
// HELPER FUNCTIONS & FORMATTERS
// ==========================================

function formatUser(u: MockUser) {
  const { password, ...safe } = u;
  const parentProfile = parentProfiles.find((p) => p.userId === u.id);
  const driverProfile = driverProfiles.find((d) => d.userId === u.id);

  return {
    ...safe,
    parentProfile: parentProfile
      ? {
          ...parentProfile,
          children: children.filter((c) => c.parentId === parentProfile.id),
        }
      : null,
    driverProfile: driverProfile
      ? formatDriverProfile(driverProfile)
      : null,
  };
}

function formatDriverProfile(dp: any) {
  const user = users.find((u) => u.id === dp.userId);
  const driverVehicles = vehicles.filter((v) => v.driverProfileId === dp.id);
  const coveredSchools = schools.filter((s) => (dp.schoolIds || []).includes(s.id));
  const driverReviews = reviews.filter((r) => r.driverProfileId === dp.id);

  return {
    ...dp,
    user: user
      ? {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          district: user.district,
          city: user.city,
          createdAt: user.createdAt,
        }
      : null,
    vehicles: driverVehicles,
    schools: coveredSchools,
    schoolCoverages: coveredSchools.map((s) => ({
      driverProfileId: dp.id,
      schoolId: s.id,
      school: s,
    })),
    reviews: driverReviews.map((r) => {
      const pUser = users.find((u) => u.parentProfileId === r.parentId);
      return {
        ...r,
        parent: {
          user: {
            fullName: pUser?.fullName || 'Parent',
          },
        },
      };
    }),
  };
}

function formatBooking(b: any) {
  const child = children.find((c) => c.id === b.childId);
  const school = child ? schools.find((s) => s.id === child.schoolId) : null;
  const parentProfile = parentProfiles.find((p) => p.id === b.parentId);
  const parentUser = parentProfile ? users.find((u) => u.id === parentProfile.userId) : null;
  const driverProfile = driverProfiles.find((d) => d.id === b.driverProfileId);
  const driverUser = driverProfile ? users.find((u) => u.id === driverProfile.userId) : null;
  const vehicle = vehicles.find((v) => v.id === b.vehicleId);

  return {
    ...b,
    child: child ? { ...child, school } : null,
    school,
    vehicle,
    parent: {
      ...parentProfile,
      user: parentUser
        ? {
            id: parentUser.id,
            fullName: parentUser.fullName,
            phone: parentUser.phone,
            email: parentUser.email,
          }
        : null,
    },
    driver: {
      ...driverProfile,
      user: driverUser
        ? {
            id: driverUser.id,
            fullName: driverUser.fullName,
            phone: driverUser.phone,
            email: driverUser.email,
          }
        : null,
    },
    driverProfile: {
      ...driverProfile,
      user: driverUser
        ? {
            id: driverUser.id,
            fullName: driverUser.fullName,
            phone: driverUser.phone,
            email: driverUser.email,
          }
        : null,
    },
  };
}

function formatRide(r: any) {
  if (!r) return null;
  const vehicle = vehicles.find((v) => v.id === r.vehicleId);
  const driverProfile = driverProfiles.find((d) => d.id === r.driverProfileId);
  const driverUser = driverProfile ? users.find((u) => u.id === driverProfile.userId) : null;

  return {
    ...r,
    vehicle,
    driver: {
      ...driverProfile,
      user: driverUser ? { fullName: driverUser.fullName, phone: driverUser.phone } : null,
    },
    passengers: (r.passengers || []).map((p: any) => {
      const b = bookings.find((bk) => bk.id === p.bookingId);
      return {
        ...p,
        booking: b ? formatBooking(b) : null,
      };
    }),
  };
}

function formatComplaint(c: any) {
  const createdUser = users.find((u) => u.id === c.createdByUserId);
  const targetUser = users.find((u) => u.id === c.targetUserId);
  const booking = c.bookingId ? bookings.find((b) => b.id === c.bookingId) : null;

  return {
    ...c,
    createdByUser: createdUser
      ? {
          id: createdUser.id,
          fullName: createdUser.fullName,
          email: createdUser.email,
          phone: createdUser.phone,
          role: createdUser.role,
        }
      : null,
    targetUser: targetUser
      ? {
          id: targetUser.id,
          fullName: targetUser.fullName,
          email: targetUser.email,
          phone: targetUser.phone,
          role: targetUser.role,
        }
      : null,
    booking: booking ? formatBooking(booking) : null,
  };
}

// ==========================================
// APP INITIALIZATION
// ==========================================

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Auth Middleware
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required.' });
  }

  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === payload.sub);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }
    (req as any).user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
}

function optionalToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.cookies?.access_token;
  if (token) {
    try {
      const payload: any = jwt.verify(token, JWT_SECRET);
      (req as any).user = users.find((u) => u.id === payload.sub) || null;
    } catch {}
  }
  next();
}

function generateTokens(user: MockUser) {
  const accessToken = jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '1d' }
  );
  const refreshToken = jwt.sign(
    { sub: user.id, jti: 'mock-refresh-' + Date.now() },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken, expiresIn: 86400 };
}

// ==========================================
// AUTH ROUTES
// ==========================================

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials. User not found.' });
  }

  // Allow login with seed passwords or any password if matching
  const tokens = generateTokens(user);
  res.cookie('access_token', tokens.accessToken, { httpOnly: true, secure: false });
  res.cookie('refresh_token', tokens.refreshToken, { httpOnly: true, secure: false });

  return res.json({
    user: formatUser(user),
    ...tokens,
  });
});

app.get('/api/auth/me', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  return res.json(formatUser(user));
});

app.post('/api/auth/register/parent', (req: Request, res: Response) => {
  const { email, password, fullName, phone, district, city, address, emergencyContactName, emergencyContactPhone } = req.body;
  if (!email || !fullName || !phone) {
    return res.status(400).json({ message: 'Email, Full Name, and Mobile Number are required.' });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'An account with this email address already exists.' });
  }

  const userId = 'user-parent-' + Date.now();
  const parentProfId = 'parent-prof-' + Date.now();

  const newUser: MockUser = {
    id: userId,
    email: email.trim().toLowerCase(),
    password: password || 'ParentPassword123!',
    fullName,
    phone,
    role: 'PARENT',
    status: 'ACTIVE',
    district: district || 'Colombo',
    city: city || 'Nugegoda',
    parentProfileId: parentProfId,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);

  parentProfiles.push({
    id: parentProfId,
    userId,
    address: address || 'Sample Address',
    city: city || 'Nugegoda',
    district: district || 'Colombo',
    emergencyContactName: emergencyContactName || 'Emergency Contact',
    emergencyContactPhone: emergencyContactPhone || phone,
  });

  const tokens = generateTokens(newUser);
  res.cookie('access_token', tokens.accessToken, { httpOnly: true, secure: false });
  return res.status(201).json({
    user: formatUser(newUser),
    ...tokens,
  });
});

app.post('/api/auth/register/driver', (req: Request, res: Response) => {
  const { email, password, fullName, phone, district, city } = req.body;
  if (!email || !fullName || !phone) {
    return res.status(400).json({ message: 'Email, Full Name, and Mobile Number are required.' });
  }

  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ message: 'An account with this email address already exists.' });
  }

  const userId = 'user-driver-' + Date.now();
  const driverProfId = 'driver-prof-' + Date.now();

  const newUser: MockUser = {
    id: userId,
    email: email.trim().toLowerCase(),
    password: password || 'DriverPassword123!',
    fullName,
    phone,
    role: 'DRIVER',
    status: 'PENDING_VERIFICATION',
    district: district || 'Colombo',
    city: city || 'Colombo',
    driverProfileId: driverProfId,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);

  driverProfiles.push({
    id: driverProfId,
    userId,
    nicNumber: 'PENDING_' + Date.now(),
    licenseNumber: 'PENDING_' + Date.now(),
    experienceYears: 1,
    bio: 'Dedicated school transportation driver.',
    ratingAverage: 5.0,
    ratingCount: 0,
    verificationStatus: 'PENDING',
    serviceAreas: [
      {
        id: 'sa-' + Date.now(),
        driverProfileId: driverProfId,
        district: district || 'Colombo',
        city: city || 'Colombo',
        operatingAreas: [city || 'Colombo'],
        monthlyRateMinorUnits: 1500000,
      },
    ],
    schoolIds: ['school-col-01'],
    documents: [],
  });

  notifications.push({
    id: 'notif-' + Date.now(),
    userId,
    title: 'Registration Submitted',
    message: 'Welcome to SchoolRide LK! Upload your license and vehicle details to get verified.',
    type: 'VERIFICATION_SUBMITTED',
    read: false,
    createdAt: new Date().toISOString(),
  });

  const tokens = generateTokens(newUser);
  res.cookie('access_token', tokens.accessToken, { httpOnly: true, secure: false });
  return res.status(201).json({
    user: formatUser(newUser),
    ...tokens,
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  res.clearCookie('access_token');
  res.clearCookie('refresh_token');
  return res.json({ success: true, message: 'Logged out successfully.' });
});

app.post('/api/auth/refresh', (req: Request, res: Response) => {
  const token = req.body.refreshToken || req.cookies?.refresh_token;
  if (!token) {
    return res.status(401).json({ message: 'Refresh token required.' });
  }
  return res.json({
    accessToken: jwt.sign({ sub: 'user-parent-01', role: 'PARENT' }, JWT_SECRET, { expiresIn: '1d' }),
    refreshToken: token,
  });
});

app.post('/api/auth/forgot-password', (req: Request, res: Response) => {
  return res.json({ message: 'If an account exists, a reset link has been dispatched.' });
});

app.post('/api/auth/reset-password', (req: Request, res: Response) => {
  return res.json({ message: 'Password has been reset successfully.' });
});

// ==========================================
// SCHOOLS ROUTES
// ==========================================

app.get('/api/schools', (req: Request, res: Response) => {
  const { district, query } = req.query;
  let results = schools.filter((s) => s.isActive !== false);

  if (district && typeof district === 'string' && district !== 'all') {
    results = results.filter((s) => s.district.toLowerCase() === district.toLowerCase());
  }

  if (query && typeof query === 'string' && query.trim()) {
    const q = query.toLowerCase();
    results = results.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.city.toLowerCase().includes(q) ||
        s.address.toLowerCase().includes(q)
    );
  }

  return res.json(results);
});

app.get('/api/schools/:id', (req: Request, res: Response) => {
  const school = schools.find((s) => s.id === req.params.id);
  if (!school) return res.status(404).json({ message: 'School not found' });
  return res.json(school);
});

app.post('/api/schools', authenticateToken, (req: Request, res: Response) => {
  const newSchool = {
    id: 'school-' + Date.now(),
    isActive: true,
    ...req.body,
  };
  schools.push(newSchool);
  return res.status(201).json(newSchool);
});

app.patch('/api/schools/:id', authenticateToken, (req: Request, res: Response) => {
  const idx = schools.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'School not found' });
  schools[idx] = { ...schools[idx], ...req.body };
  return res.json(schools[idx]);
});

// ==========================================
// DRIVERS ROUTES
// ==========================================

app.get('/api/drivers', (req: Request, res: Response) => {
  const { district, schoolId, vehicleType, q } = req.query;

  // Filter approved drivers
  let results = driverProfiles.filter((dp) => dp.verificationStatus === 'APPROVED');

  if (district && typeof district === 'string' && district !== 'all') {
    results = results.filter((dp) => {
      const u = users.find((user) => user.id === dp.userId);
      const areas = dp.serviceAreas || [];
      return (
        u?.district?.toLowerCase() === district.toLowerCase() ||
        areas.some((a: any) => a.district?.toLowerCase() === district.toLowerCase())
      );
    });
  }

  if (schoolId && typeof schoolId === 'string' && schoolId !== 'all') {
    results = results.filter((dp) => (dp.schoolIds || []).includes(schoolId));
  }

  if (vehicleType && typeof vehicleType === 'string' && vehicleType !== 'all') {
    results = results.filter((dp) => {
      const driverVehicles = vehicles.filter((v) => v.driverProfileId === dp.id);
      return driverVehicles.some((v) => v.vehicleType === vehicleType);
    });
  }

  if (q && typeof q === 'string' && q.trim()) {
    const term = q.toLowerCase();
    results = results.filter((dp) => {
      const u = users.find((user) => user.id === dp.userId);
      return (
        u?.fullName?.toLowerCase().includes(term) ||
        u?.city?.toLowerCase().includes(term) ||
        dp.bio?.toLowerCase().includes(term)
      );
    });
  }

  return res.json(results.map(formatDriverProfile));
});

app.get('/api/drivers/me', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const dp = driverProfiles.find((d) => d.userId === user.id);
  if (!dp) return res.status(404).json({ message: 'Driver profile not found' });
  return res.json(formatDriverProfile(dp));
});

app.get('/api/drivers/:id/public', (req: Request, res: Response) => {
  const dp = driverProfiles.find((d) => d.id === req.params.id);
  if (!dp) return res.status(404).json({ message: 'Driver not found' });
  return res.json(formatDriverProfile(dp));
});

app.patch('/api/drivers/me/profile', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const dp = driverProfiles.find((d) => d.userId === user.id);
  if (!dp) return res.status(404).json({ message: 'Driver profile not found' });
  Object.assign(dp, req.body);
  return res.json(formatDriverProfile(dp));
});

app.post('/api/drivers/me/vehicles', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const dp = driverProfiles.find((d) => d.userId === user.id);
  if (!dp) return res.status(404).json({ message: 'Driver profile not found' });

  const newVeh = {
    id: 'veh-' + Date.now(),
    driverProfileId: dp.id,
    verificationStatus: 'PENDING',
    documents: [],
    ...req.body,
  };
  vehicles.push(newVeh);
  return res.status(201).json(newVeh);
});

app.patch('/api/drivers/me/coverage', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const dp = driverProfiles.find((d) => d.userId === user.id);
  if (!dp) return res.status(404).json({ message: 'Driver profile not found' });

  const { operatingAreas, schoolIds, monthlyRateMinorUnits } = req.body;
  if (schoolIds) {
    dp.schoolIds = schoolIds;
  }
  if (operatingAreas || monthlyRateMinorUnits) {
    if (!dp.serviceAreas || dp.serviceAreas.length === 0) {
      dp.serviceAreas = [
        {
          id: 'sa-' + Date.now(),
          driverProfileId: dp.id,
          district: user.district || 'Colombo',
          city: user.city || 'Colombo',
          operatingAreas: operatingAreas || ['Colombo Central'],
          monthlyRateMinorUnits: monthlyRateMinorUnits || 1800000,
        },
      ];
    } else {
      if (operatingAreas) dp.serviceAreas[0].operatingAreas = operatingAreas;
      if (monthlyRateMinorUnits) dp.serviceAreas[0].monthlyRateMinorUnits = monthlyRateMinorUnits;
    }
  }

  return res.json(formatDriverProfile(dp));
});

app.post('/api/drivers/me/documents', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const dp = driverProfiles.find((d) => d.userId === user.id);
  if (!dp) return res.status(404).json({ message: 'Driver profile not found' });

  const doc = {
    id: 'doc-' + Date.now(),
    driverProfileId: dp.id,
    isVerified: false,
    ...req.body,
  };
  dp.documents = dp.documents || [];
  dp.documents.push(doc);

  // If user uploaded license & nic, auto move status to PENDING
  if (dp.verificationStatus === 'REJECTED') {
    dp.verificationStatus = 'PENDING';
  }

  return res.status(201).json(doc);
});

// ==========================================
// PARENTS ROUTES
// ==========================================

app.get('/api/parents/me', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const pp = parentProfiles.find((p) => p.userId === user.id);
  if (!pp) return res.status(404).json({ message: 'Parent profile not found' });
  return res.json({ ...pp, user });
});

app.patch('/api/parents/me/profile', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const pp = parentProfiles.find((p) => p.userId === user.id);
  if (!pp) return res.status(404).json({ message: 'Parent profile not found' });
  Object.assign(pp, req.body);
  if (req.body.fullName) user.fullName = req.body.fullName;
  if (req.body.phone) user.phone = req.body.phone;
  return res.json({ ...pp, user });
});

app.get('/api/parents/me/children', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const pp = parentProfiles.find((p) => p.userId === user.id);
  if (!pp) return res.json([]);
  const parentChildren = children
    .filter((c) => c.parentId === pp.id)
    .map((c) => ({
      ...c,
      school: schools.find((s) => s.id === c.schoolId),
    }));
  return res.json(parentChildren);
});

app.post('/api/parents/me/children', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  let pp = parentProfiles.find((p) => p.userId === user.id);
  if (!pp) {
    pp = {
      id: 'parent-prof-' + Date.now(),
      userId: user.id,
      address: 'Colombo',
      city: 'Colombo',
      district: 'Colombo',
      emergencyContactName: user.fullName,
      emergencyContactPhone: user.phone,
    };
    parentProfiles.push(pp);
    user.parentProfileId = pp.id;
  }

  const newChild = {
    id: 'child-' + Date.now(),
    parentId: pp.id,
    ...req.body,
  };
  children.push(newChild);
  return res.status(201).json({
    ...newChild,
    school: schools.find((s) => s.id === newChild.schoolId),
  });
});

app.patch('/api/parents/me/children/:id', authenticateToken, (req: Request, res: Response) => {
  const idx = children.findIndex((c) => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Child record not found' });
  children[idx] = { ...children[idx], ...req.body };
  return res.json({
    ...children[idx],
    school: schools.find((s) => s.id === children[idx].schoolId),
  });
});

app.delete('/api/parents/me/children/:id', authenticateToken, (req: Request, res: Response) => {
  children = children.filter((c) => c.id !== req.params.id);
  return res.json({ success: true });
});

// ==========================================
// BOOKINGS ROUTES
// ==========================================

app.get('/api/bookings', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  let list = bookings;

  if (user.role === 'PARENT') {
    const pp = parentProfiles.find((p) => p.userId === user.id);
    list = bookings.filter((b) => b.parentId === pp?.id);
  } else if (user.role === 'DRIVER') {
    const dp = driverProfiles.find((d) => d.userId === user.id);
    list = bookings.filter((b) => b.driverProfileId === dp?.id);
  }

  return res.json(list.map(formatBooking));
});

app.get('/api/bookings/:id', authenticateToken, (req: Request, res: Response) => {
  const b = bookings.find((item) => item.id === req.params.id);
  if (!b) return res.status(404).json({ message: 'Booking not found' });
  return res.json(formatBooking(b));
});

app.post('/api/bookings', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const pp = parentProfiles.find((p) => p.userId === user.id);
  if (!pp) return res.status(400).json({ message: 'Parent profile required to book.' });

  const newBooking = {
    id: 'booking-' + Date.now(),
    parentId: pp.id,
    status: 'PENDING',
    monthlyFeeMinorUnits: req.body.monthlyFee || 1800000,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  bookings.push(newBooking);

  // Notify driver
  const dp = driverProfiles.find((d) => d.id === newBooking.driverProfileId);
  if (dp) {
    notifications.push({
      id: 'notif-' + Date.now(),
      userId: dp.userId,
      title: 'New Student Booking Request',
      message: 'A parent has requested school transport service for your review.',
      type: 'BOOKING_REQUEST',
      read: false,
      createdAt: new Date().toISOString(),
    });
  }

  return res.status(201).json(formatBooking(newBooking));
});

app.patch('/api/bookings/:id/status', authenticateToken, (req: Request, res: Response) => {
  const { status, rejectionReason } = req.body;
  const b = bookings.find((item) => item.id === req.params.id);
  if (!b) return res.status(404).json({ message: 'Booking not found' });

  b.status = status;
  if (rejectionReason) b.rejectionReason = rejectionReason;

  // Notify parent
  const pp = parentProfiles.find((p) => p.id === b.parentId);
  if (pp) {
    notifications.push({
      id: 'notif-' + Date.now(),
      userId: pp.userId,
      title: `Booking Request ${status}`,
      message: `Your transport request has been marked as ${status}.`,
      type: status === 'ACCEPTED' ? 'BOOKING_ACCEPTED' : 'BOOKING_REJECTED',
      read: false,
      createdAt: new Date().toISOString(),
    });
  }

  return res.json(formatBooking(b));
});

// ==========================================
// RIDES & TELEMETRY ROUTES
// ==========================================

app.get('/api/rides/active', optionalToken, (req: Request, res: Response) => {
  if (!activeRide || activeRide.status !== 'IN_PROGRESS') {
    return res.json(null);
  }
  return res.json(formatRide(activeRide));
});

app.post('/api/rides/start', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const dp = driverProfiles.find((d) => d.userId === user.id);
  if (!dp) return res.status(400).json({ message: 'Driver profile required.' });

  const { vehicleId, bookingIds, routeName, initialLatitude, initialLongitude } = req.body;

  activeRide = {
    id: 'ride-' + Date.now(),
    driverProfileId: dp.id,
    vehicleId: vehicleId || vehicles.find((v) => v.driverProfileId === dp.id)?.id,
    routeName: routeName || 'School Transit Route',
    routeDirection: 'MORNING_PICKUP',
    status: 'IN_PROGRESS',
    currentLatitude: initialLatitude || 6.8920,
    currentLongitude: initialLongitude || 79.8700,
    currentSpeed: 30,
    currentHeading: 340,
    startedAt: new Date().toISOString(),
    lastLocationUpdateAt: new Date().toISOString(),
    passengers: (bookingIds || []).map((bId: string, idx: number) => ({
      id: 'pass-' + (idx + 1) + '-' + Date.now(),
      rideSessionId: 'ride-' + Date.now(),
      bookingId: bId,
      pickupStatus: 'SCHEDULED',
    })),
    locations: [
      {
        latitude: initialLatitude || 6.8920,
        longitude: initialLongitude || 79.8700,
        speed: 30,
        heading: 340,
        recordedAt: new Date().toISOString(),
      },
    ],
  };

  io.to(`ride:${activeRide.id}`).emit('location_update', {
    latitude: activeRide.currentLatitude,
    longitude: activeRide.currentLongitude,
    speed: activeRide.currentSpeed,
    heading: activeRide.currentHeading,
    timestamp: activeRide.lastLocationUpdateAt,
  });

  return res.status(201).json(formatRide(activeRide));
});

app.post('/api/rides/:id/location', authenticateToken, (req: Request, res: Response) => {
  if (!activeRide || activeRide.id !== req.params.id) {
    return res.status(404).json({ message: 'Active ride not found' });
  }

  const { latitude, longitude, speed, heading } = req.body;
  activeRide.currentLatitude = latitude;
  activeRide.currentLongitude = longitude;
  if (speed !== undefined) activeRide.currentSpeed = speed;
  if (heading !== undefined) activeRide.currentHeading = heading;
  activeRide.lastLocationUpdateAt = new Date().toISOString();

  activeRide.locations = activeRide.locations || [];
  activeRide.locations.push({
    latitude,
    longitude,
    speed: speed || 0,
    heading: heading || 0,
    recordedAt: activeRide.lastLocationUpdateAt,
  });

  io.to(`ride:${activeRide.id}`).emit('location_update', {
    latitude,
    longitude,
    speed,
    heading,
    timestamp: activeRide.lastLocationUpdateAt,
  });

  return res.json({ success: true });
});

app.patch('/api/rides/:id/passenger-status', authenticateToken, (req: Request, res: Response) => {
  if (!activeRide || activeRide.id !== req.params.id) {
    return res.status(404).json({ message: 'Active ride not found' });
  }

  const { passengerId, pickupStatus } = req.body;
  const p = (activeRide.passengers || []).find((item: any) => item.id === passengerId);
  if (p) {
    p.pickupStatus = pickupStatus;
    if (pickupStatus === 'PICKED_UP') p.pickedUpAt = new Date().toISOString();
    if (pickupStatus === 'DROPPED_OFF') p.droppedOffAt = new Date().toISOString();

    const booking = bookings.find((b) => b.id === p.bookingId);
    const child = booking ? children.find((c) => c.id === booking.childId) : null;

    io.to(`ride:${activeRide.id}`).emit('passenger_update', {
      passengerId,
      childName: child ? `${child.firstName} ${child.lastName}` : 'Student',
      pickupStatus,
    });
  }

  return res.json(formatRide(activeRide));
});

app.post('/api/rides/:id/complete', authenticateToken, (req: Request, res: Response) => {
  if (activeRide && activeRide.id === req.params.id) {
    activeRide.status = 'COMPLETED';
    activeRide.completedAt = new Date().toISOString();
    io.to(`ride:${activeRide.id}`).emit('ride_ended');
    const completed = activeRide;
    activeRide = null;
    return res.json({ success: true, message: 'Route completed.', ride: completed });
  }
  return res.status(404).json({ message: 'Ride not found' });
});

app.get('/api/rides/:id', authenticateToken, (req: Request, res: Response) => {
  if (activeRide && activeRide.id === req.params.id) {
    return res.json(formatRide(activeRide));
  }
  return res.status(404).json({ message: 'Ride not found' });
});

// ==========================================
// REVIEWS & COMPLAINTS
// ==========================================

app.post('/api/reviews', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const pp = parentProfiles.find((p) => p.userId === user.id);
  const { bookingId, rating, comment } = req.body;

  const b = bookings.find((item) => item.id === bookingId);
  if (!b) return res.status(404).json({ message: 'Booking not found' });

  const rev = {
    id: 'rev-' + Date.now(),
    bookingId,
    driverProfileId: b.driverProfileId,
    parentId: pp?.id,
    rating: rating || 5,
    comment: comment || '',
    isPublic: true,
    createdAt: new Date().toISOString(),
  };
  reviews.push(rev);

  // Recalculate driver rating
  const dp = driverProfiles.find((d) => d.id === b.driverProfileId);
  if (dp) {
    const driverRevs = reviews.filter((r) => r.driverProfileId === dp.id);
    const avg = driverRevs.reduce((sum, r) => sum + r.rating, 0) / driverRevs.length;
    dp.ratingAverage = parseFloat(avg.toFixed(2));
    dp.ratingCount = driverRevs.length;
  }

  return res.status(201).json(rev);
});

app.get('/api/reviews/driver/:driverId', (req: Request, res: Response) => {
  const list = reviews.filter((r) => r.driverProfileId === req.params.driverId);
  return res.json(list);
});

app.post('/api/complaints', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const comp = {
    id: 'comp-' + Date.now(),
    createdByUserId: user.id,
    status: 'OPEN',
    adminNotes: null,
    createdAt: new Date().toISOString(),
    ...req.body,
  };
  complaints.push(comp);

  notifications.push({
    id: 'notif-' + Date.now(),
    userId: user.id,
    title: 'Complaint Logged',
    message: `Your complaint regarding "${comp.title}" has been received for moderation.`,
    type: 'COMPLAINT_UPDATE',
    read: false,
    createdAt: new Date().toISOString(),
  });

  return res.status(201).json(formatComplaint(comp));
});

app.get('/api/complaints/my', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const myComplaints = complaints.filter((c) => c.createdByUserId === user.id);
  return res.json(myComplaints.map(formatComplaint));
});

app.get('/api/complaints', authenticateToken, (req: Request, res: Response) => {
  const { status, category } = req.query;
  let list = complaints;
  if (status) list = list.filter((c) => c.status === status);
  if (category) list = list.filter((c) => c.category === category);
  return res.json(list.map(formatComplaint));
});

app.patch('/api/complaints/:id/resolve', authenticateToken, (req: Request, res: Response) => {
  const comp = complaints.find((c) => c.id === req.params.id);
  if (!comp) return res.status(404).json({ message: 'Complaint not found' });

  comp.status = 'RESOLVED';
  comp.adminNotes = req.body.resolutionNotes || 'Resolved by administrator.';
  comp.resolvedAt = new Date().toISOString();

  notifications.push({
    id: 'notif-' + Date.now(),
    userId: comp.createdByUserId,
    title: 'Complaint Resolved',
    message: `Your complaint #${comp.id.slice(0, 8)} has been reviewed: ${comp.adminNotes}`,
    type: 'COMPLAINT_UPDATE',
    read: false,
    createdAt: new Date().toISOString(),
  });

  return res.json(formatComplaint(comp));
});

// ==========================================
// NOTIFICATIONS ROUTES
// ==========================================

app.get('/api/notifications', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const list = notifications.filter((n) => n.userId === user.id);
  return res.json(list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
});

app.get('/api/notifications/unread-count', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  const count = notifications.filter((n) => n.userId === user.id && !n.read).length;
  return res.json({ count });
});

app.patch('/api/notifications/:id/read', authenticateToken, (req: Request, res: Response) => {
  const notif = notifications.find((n) => n.id === req.params.id);
  if (notif) notif.read = true;
  return res.json({ success: true });
});

app.post('/api/notifications/read-all', authenticateToken, (req: Request, res: Response) => {
  const user = (req as any).user;
  notifications.filter((n) => n.userId === user.id).forEach((n) => (n.read = true));
  return res.json({ success: true });
});

// ==========================================
// STORAGE / UPLOAD ROUTES
// ==========================================

app.post('/api/storage/upload', authenticateToken, (req: Request, res: Response) => {
  // Mock file upload - accepts multipart or json
  const fileKey = `docs/uploaded-${Date.now()}.jpg`;
  return res.json({
    fileKey,
    fileName: 'driver-document.jpg',
    fileSize: 450000,
    mimeType: 'image/jpeg',
    url: `/api/storage/files/${fileKey}`,
  });
});

app.get('/api/storage/files/{*key}', (req: Request, res: Response) => {
  // Returns lightweight SVG placeholder for any document request
  const key = (req.params as any).key || 'document';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <rect width="100%" height="100%" fill="#f1f5f9"/>
    <rect x="20" y="20" width="560" height="360" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <circle cx="300" cy="160" r="50" fill="#e2e8f0"/>
    <text x="300" y="250" font-family="system-ui, sans-serif" font-size="20" font-weight="bold" fill="#334155" text-anchor="middle">Official Document Verified</text>
    <text x="300" y="280" font-family="system-ui, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">${key}</text>
    <text x="300" y="320" font-family="system-ui, sans-serif" font-size="12" fill="#10b981" font-weight="bold" text-anchor="middle">✓ Safe & Verified Driver Credentials</text>
  </svg>`;
  res.setHeader('Content-Type', 'image/svg+xml');
  return res.send(svg);
});

// ==========================================
// ADMIN CONTROL ROUTES
// ==========================================

app.get('/api/admin/overview', authenticateToken, (req: Request, res: Response) => {
  const totalUsers = users.length;
  const totalParents = users.filter((u) => u.role === 'PARENT').length;
  const totalDrivers = users.filter((u) => u.role === 'DRIVER').length;
  const pendingVerifications = driverProfiles.filter((d) => d.verificationStatus === 'PENDING').length;
  const verifiedDrivers = driverProfiles.filter((d) => d.verificationStatus === 'APPROVED').length;
  const suspendedDrivers = driverProfiles.filter((d) => d.verificationStatus === 'SUSPENDED').length;
  const pendingBookings = bookings.filter((b) => b.status === 'PENDING').length;
  const activeBookings = bookings.filter((b) => b.status === 'ACTIVE').length;
  const completedBookings = bookings.filter((b) => b.status === 'COMPLETED').length;
  const activeRidesCount = activeRide && activeRide.status === 'IN_PROGRESS' ? 1 : 0;
  const openComplaints = complaints.filter((c) => c.status === 'OPEN').length;

  return res.json({
    metrics: {
      totalUsers,
      totalParents,
      totalDrivers,
      pendingVerifications,
      verifiedDrivers,
      suspendedDrivers,
      pendingBookings,
      activeBookings,
      completedBookings,
      activeRides: activeRidesCount,
      openComplaints,
    },
    recentAuditLogs: auditLogs.map((log) => {
      const u = users.find((usr) => usr.id === log.actorUserId);
      return {
        ...log,
        actorUser: u ? { fullName: u.fullName, email: u.email, role: u.role } : null,
      };
    }),
  });
});

app.get('/api/admin/verifications', authenticateToken, (req: Request, res: Response) => {
  const queue = driverProfiles
    .filter((d) => d.verificationStatus === 'PENDING' || d.verificationStatus === 'REJECTED')
    .map(formatDriverProfile);
  return res.json(queue);
});

app.patch('/api/admin/verifications/:driverId/approve', authenticateToken, (req: Request, res: Response) => {
  const dp = driverProfiles.find((d) => d.id === req.params.driverId);
  if (!dp) return res.status(404).json({ message: 'Driver profile not found' });

  dp.verificationStatus = 'APPROVED';
  dp.verifiedAt = new Date().toISOString();

  const u = users.find((usr) => usr.id === dp.userId);
  if (u) u.status = 'ACTIVE';

  vehicles.filter((v) => v.driverProfileId === dp.id).forEach((v) => (v.verificationStatus = 'APPROVED'));

  auditLogs.unshift({
    id: 'log-' + Date.now(),
    action: 'DRIVER_VERIFICATION_APPROVED',
    actorUserId: (req as any).user.id,
    targetType: 'DRIVER',
    targetId: dp.id,
    details: { driverName: u?.fullName },
    ipAddress: '127.0.0.1',
    createdAt: new Date().toISOString(),
  });

  notifications.push({
    id: 'notif-' + Date.now(),
    userId: dp.userId,
    title: 'Verification Approved! 🎉',
    message: 'Your driver credentials and vehicle inspection have been approved. You are now live in discovery!',
    type: 'VERIFICATION_APPROVED',
    read: false,
    createdAt: new Date().toISOString(),
  });

  return res.json(formatDriverProfile(dp));
});

app.patch('/api/admin/verifications/:driverId/reject', authenticateToken, (req: Request, res: Response) => {
  const dp = driverProfiles.find((d) => d.id === req.params.driverId);
  if (!dp) return res.status(404).json({ message: 'Driver profile not found' });

  dp.verificationStatus = 'REJECTED';
  dp.rejectionReason = req.body.reason || 'Verification rejected by administrator.';

  const u = users.find((usr) => usr.id === dp.userId);
  notifications.push({
    id: 'notif-' + Date.now(),
    userId: dp.userId,
    title: 'Verification Requires Revision',
    message: `Verification declined: ${dp.rejectionReason}. Please re-upload clearer copies.`,
    type: 'VERIFICATION_REJECTED',
    read: false,
    createdAt: new Date().toISOString(),
  });

  return res.json(formatDriverProfile(dp));
});

app.get('/api/admin/users', authenticateToken, (req: Request, res: Response) => {
  const { role, status, query } = req.query;
  let list = users;

  if (role && typeof role === 'string' && role !== 'all') {
    list = list.filter((u) => u.role === role);
  }
  if (status && typeof status === 'string' && status !== 'all') {
    list = list.filter((u) => u.status === status);
  }
  if (query && typeof query === 'string' && query.trim()) {
    const q = query.toLowerCase();
    list = list.filter((u) => u.fullName.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }

  const enriched = list.map((u) => {
    const dp = driverProfiles.find((d) => d.userId === u.id);
    const pp = parentProfiles.find((p) => p.userId === u.id);
    return {
      id: u.id,
      fullName: u.fullName,
      email: u.email,
      phone: u.phone,
      role: u.role,
      status: u.status,
      district: u.district,
      city: u.city,
      createdAt: u.createdAt,
      driverProfile: dp ? { verificationStatus: dp.verificationStatus, ratingAverage: dp.ratingAverage } : null,
      parentProfile: pp
        ? {
            _count: {
              children: children.filter((c) => c.parentId === pp.id).length,
              bookings: bookings.filter((b) => b.parentId === pp.id).length,
            },
          }
        : null,
    };
  });

  return res.json(enriched);
});

app.patch('/api/admin/users/:userId/status', authenticateToken, (req: Request, res: Response) => {
  const target = users.find((u) => u.id === req.params.userId);
  if (!target) return res.status(404).json({ message: 'User not found' });

  target.status = req.body.status;
  return res.json({ id: target.id, status: target.status, message: `Account status set to ${target.status}` });
});

app.get('/api/admin/audit-logs', authenticateToken, (req: Request, res: Response) => {
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '25', 10);
  const total = auditLogs.length;

  const data = auditLogs.slice((page - 1) * limit, page * limit).map((log) => {
    const u = users.find((usr) => usr.id === log.actorUserId);
    return {
      ...log,
      actorUser: u ? { id: u.id, fullName: u.fullName, email: u.email, role: u.role } : null,
    };
  });

  return res.json({
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// ==========================================
// HEALTH CHECK
// ==========================================

app.get('/api/health', (req: Request, res: Response) => {
  return res.json({
    status: 'ok',
    service: 'schoolride-lk-mock-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    timezone: 'Asia/Colombo',
  });
});

app.get('/api/health/db', (req: Request, res: Response) => {
  return res.json({
    status: 'ok',
    database: 'connected (in-memory mock)',
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// SOCKET.IO REAL-TIME SUBSCRIPTIONS & SIMULATION
// ==========================================

io.on('connection', (socket) => {
  socket.on('join_ride', ({ rideSessionId }) => {
    if (rideSessionId) {
      socket.join(`ride:${rideSessionId}`);
      if (activeRide && activeRide.id === rideSessionId) {
        socket.emit('location_update', {
          latitude: activeRide.currentLatitude,
          longitude: activeRide.currentLongitude,
          speed: activeRide.currentSpeed,
          heading: activeRide.currentHeading,
          timestamp: activeRide.lastLocationUpdateAt,
        });
      }
    }
  });

  socket.on('leave_ride', ({ rideSessionId }) => {
    if (rideSessionId) {
      socket.leave(`ride:${rideSessionId}`);
    }
  });
});

// Real-Time GPS Drift Simulation for live demonstration
let simStep = 0;
setInterval(() => {
  if (!activeRide || activeRide.status !== 'IN_PROGRESS') return;

  simStep += 1;
  // Gently glide towards Royal College Colombo (6.9066, 79.8617)
  const targetLat = 6.9066;
  const targetLng = 79.8617;
  const currentLat = activeRide.currentLatitude || 6.8920;
  const currentLng = activeRide.currentLongitude || 79.8700;

  const latStep = (targetLat - currentLat) * 0.05 + (Math.sin(simStep / 2) * 0.00015);
  const lngStep = (targetLng - currentLng) * 0.05 + (Math.cos(simStep / 2) * 0.00015);

  activeRide.currentLatitude = parseFloat((currentLat + latStep).toFixed(6));
  activeRide.currentLongitude = parseFloat((currentLng + lngStep).toFixed(6));
  activeRide.currentSpeed = Math.floor(28 + Math.random() * 12);
  activeRide.currentHeading = (335 + (simStep % 10)) % 360;
  activeRide.lastLocationUpdateAt = new Date().toISOString();

  activeRide.locations = activeRide.locations || [];
  activeRide.locations.push({
    latitude: activeRide.currentLatitude,
    longitude: activeRide.currentLongitude,
    speed: activeRide.currentSpeed,
    heading: activeRide.currentHeading,
    recordedAt: activeRide.lastLocationUpdateAt,
  });

  io.to(`ride:${activeRide.id}`).emit('location_update', {
    latitude: activeRide.currentLatitude,
    longitude: activeRide.currentLongitude,
    speed: activeRide.currentSpeed,
    heading: activeRide.currentHeading,
    timestamp: activeRide.lastLocationUpdateAt,
  });
}, 4000);

// ==========================================
// START SERVER
// ==========================================

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 SchoolRide LK Mock API Server running on port ${PORT}`);
  console.log(`🌐 Base URL: http://localhost:${PORT}/api`);
  console.log(`📡 WebSocket Gateway: ws://localhost:${PORT}`);
  console.log(`💚 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});

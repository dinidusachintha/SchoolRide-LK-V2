export interface CuratedDriverRecord {
  id: string;
  fullName: string;
  district: string;
  city: string;
  ratingAverage: number;
  ratingCount: number;
  experienceYears: number;
  bio: string;
  corridor: string;
  monthlyRateLKR: number;
  vehicle: {
    id?: string;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    capacity: number;
    availableSeats: number;
    vehicleType: string;
    isAirConditioned: boolean;
    hasAirConditioning?: boolean;
    hasEmergencyExit: boolean;
    hasFirstAidKit: boolean;
    hasGPS: boolean;
  };
  schools: { id: string; name: string; city: string; address?: string }[];
}

export const CURATED_DEMO_DRIVERS: CuratedDriverRecord[] = [
  {
    id: 'driver-prof-01',
    fullName: 'Sunil Jayawardena',
    district: 'Colombo',
    city: 'Nugegoda',
    ratingAverage: 4.95,
    ratingCount: 38,
    experienceYears: 14,
    bio: 'Dedicated school van operator with over 14 years accident-free service in Colombo. Specialised in Royal College and Visakha Vidyalaya morning and afternoon routes.',
    corridor: 'Maharagama → Nugegoda → Kohuwala → Bambalapitiya → Colombo 07',
    monthlyRateLKR: 18000,
    vehicle: {
      id: 'veh-demo-01',
      make: 'Toyota',
      model: 'HiAce Super GL',
      year: 2018,
      licensePlate: 'WP NA-4521',
      capacity: 14,
      availableSeats: 2,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-col-01', name: 'Royal College Colombo', city: 'Colombo 07', address: 'Reid Avenue, Colombo 07' },
      { id: 'school-col-02', name: 'Visakha Vidyalaya', city: 'Colombo 05', address: 'Vajira Road, Colombo 05' },
      { id: 'school-col-03', name: 'Thurstan College', city: 'Colombo 07', address: 'Kumaratunga Munidasa Mawatha, Colombo 07' },
    ],
  },
  {
    id: 'driver-prof-02',
    fullName: 'Nihal Perera',
    district: 'Colombo',
    city: 'Malabe',
    ratingAverage: 4.9,
    ratingCount: 29,
    experienceYears: 11,
    bio: 'Reliable morning and evening transit along Malabe-Rajagiriya school belt. Equipped with dual A/C, onboard GPS, and CPR first-aid trained assistant.',
    corridor: 'Athurugiriya → Malabe → Battaramulla → Rajagiriya → Colombo 08',
    monthlyRateLKR: 17500,
    vehicle: {
      id: 'veh-demo-02',
      make: 'Nissan',
      model: 'NV350 Caravan',
      year: 2020,
      licensePlate: 'WP PB-8812',
      capacity: 14,
      availableSeats: 3,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-col-04', name: 'Ananda College', city: 'Colombo 10', address: 'Maradana Road, Colombo 10' },
      { id: 'school-col-05', name: 'Nalanda College', city: 'Colombo 10', address: 'Campbell Place, Colombo 10' },
      { id: 'school-col-06', name: 'Musaeus College', city: 'Colombo 07', address: 'Rosmead Place, Colombo 07' },
    ],
  },
  {
    id: 'driver-prof-03',
    fullName: 'Chaminda Senanayake',
    district: 'Gampaha',
    city: 'Kelaniya',
    ratingAverage: 4.88,
    ratingCount: 44,
    experienceYears: 16,
    bio: '16 years serving Catholic and semi-government schools in central Colombo from Kelaniya & Kiribathgoda. Zero recorded road infractions.',
    corridor: 'Kiribathgoda → Kelaniya → Peliyagoda → Maradana → Colombo 10',
    monthlyRateLKR: 19000,
    vehicle: {
      id: 'veh-demo-03',
      make: 'Toyota',
      model: 'HiAce Commuter',
      year: 2019,
      licensePlate: 'WP ND-3190',
      capacity: 15,
      availableSeats: 1,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-col-07', name: "St. Joseph's College", city: 'Colombo 10', address: 'Darley Road, Colombo 10' },
      { id: 'school-col-08', name: 'Holy Family Convent', city: 'Colombo 04', address: 'Retreat Road, Colombo 04' },
      { id: 'school-col-09', name: "St. Peter's College", city: 'Colombo 04', address: 'Galle Road, Colombo 04' },
    ],
  },
  {
    id: 'driver-prof-04',
    fullName: 'Bandula Weerakoon',
    district: 'Kandy',
    city: 'Peradeniya',
    ratingAverage: 4.92,
    ratingCount: 25,
    experienceYears: 12,
    bio: 'Hill country school transport specialist. Smooth mountain driving with heated defoggers, CCTV, and live geofence tracking for Trinity and Kingswood.',
    corridor: 'Peradeniya → Getambe → Mulgampola → Kandy City Centre',
    monthlyRateLKR: 16500,
    vehicle: {
      id: 'veh-demo-04',
      make: 'Toyota',
      model: 'HiAce GL',
      year: 2017,
      licensePlate: 'CP NB-7721',
      capacity: 14,
      availableSeats: 2,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-kan-01', name: 'Trinity College Kandy', city: 'Kandy', address: 'D.S. Senanayake Veediya, Kandy' },
      { id: 'school-kan-02', name: 'Kingswood College', city: 'Kandy', address: 'Peradeniya Road, Kandy' },
      { id: 'school-kan-03', name: 'Dharmaraja College', city: 'Kandy', address: 'Lake Round, Kandy' },
    ],
  },
  {
    id: 'driver-prof-05',
    fullName: 'Dhammika Ranasinghe',
    district: 'Galle',
    city: 'Unawatuna',
    ratingAverage: 4.85,
    ratingCount: 19,
    experienceYears: 9,
    bio: 'Coastal school transit operating along Matara-Galle coastal corridor. Strict speed governance and door-to-door morning student pickups.',
    corridor: 'Habaraduwa → Unawatuna → Katugoda → Galle Fort',
    monthlyRateLKR: 15000,
    vehicle: {
      id: 'veh-demo-05',
      make: 'Nissan',
      model: 'Caravan DX',
      year: 2019,
      licensePlate: 'SP PA-4491',
      capacity: 14,
      availableSeats: 4,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-gal-01', name: 'Richmond College Galle', city: 'Galle', address: 'Richmond Hill, Galle' },
      { id: 'school-gal-02', name: 'Mahinda College', city: 'Galle', address: 'Eliyakanda, Galle' },
      { id: 'school-gal-03', name: 'Southlands College', city: 'Galle', address: 'Galle Fort, Galle' },
    ],
  },
  {
    id: 'driver-prof-06',
    fullName: 'Roshan Fernando',
    district: 'Gampaha',
    city: 'Negombo',
    ratingAverage: 4.97,
    ratingCount: 33,
    experienceYears: 10,
    bio: 'Punctual Negombo student transit with clean cabin, high-roof comfort, and direct SMS alerts on school gate arrival.',
    corridor: 'Kochchikade → Negombo Town → Katunayake → Seeduwa',
    monthlyRateLKR: 18500,
    vehicle: {
      id: 'veh-demo-06',
      make: 'Toyota',
      model: 'HiAce High Roof',
      year: 2021,
      licensePlate: 'WP PC-1044',
      capacity: 15,
      availableSeats: 2,
      vehicleType: 'VAN',
      isAirConditioned: true,
      hasEmergencyExit: true,
      hasFirstAidKit: true,
      hasGPS: true,
    },
    schools: [
      { id: 'school-neg-01', name: 'Maris Stella College', city: 'Negombo', address: 'Coppara Junction, Negombo' },
      { id: 'school-neg-02', name: 'Ave Maria Convent', city: 'Negombo', address: 'Main Street, Negombo' },
      { id: 'school-neg-03', name: 'Harischandra College', city: 'Negombo', address: 'Chilaw Road, Negombo' },
    ],
  },
];

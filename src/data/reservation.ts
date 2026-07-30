export const reservationSearchItems = [
  {
    label: "Check-in",
    value: "26",
    detail: "/ June"
  },
  {
    label: "Check-out",
    value: "29",
    detail: "/ June"
  },
  {
    label: "Guests",
    value: "03",
    detail: ""
  }
];

type ReservationRoomDetail = {
  reviews: string;
  status: string;
  deposit: string;
  beds: string;
  passenger: string;
  breakfast: string;
  selected: boolean;
  badge?: string;
};

export const reservationRoomDetails: Record<string, ReservationRoomDetail> = {
  "island-suite": {
    reviews: "3 Reviews",
    status: "Available",
    deposit: "Not Required",
    beds: "01 King",
    passenger: "02 Adults",
    breakfast: "IDR 150,000",
    selected: true
  },
  "garden-villa": {
    reviews: "5 Reviews",
    status: "Available",
    deposit: "Not Required",
    beds: "King or Twin",
    passenger: "03 Guests",
    breakfast: "IDR 180,000",
    selected: false
  },
  "family-stay": {
    reviews: "9 Reviews",
    status: "01 Room Left",
    deposit: "Required 25%",
    beds: "King and Twin",
    passenger: "04-05 Guests",
    breakfast: "IDR 240,000",
    selected: false,
    badge: "Only 1 Left"
  }
};

export const reservationOverview = {
  arrival: "June, 26th, 2026",
  departure: "June, 29th, 2026",
  items: [
    {
      slug: "island-suite",
      roomCount: "01",
      passenger: "02",
      subtotal: "IDR 1,250,000"
    },
    {
      slug: "garden-villa",
      roomCount: "01",
      passenger: "02",
      subtotal: "IDR 1,650,000"
    }
  ],
  total: "IDR 2,900,000"
};

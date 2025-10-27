import { Order } from "../types/order";

export const mockOrders: Order[] = [
  {
    id: "12456789",
    customer: "Sadam",
    date: "October 3, 2025 at 07:49 AM",
    deliveryDate: "April 10, 2025 • 12:00 PM - 3:00 PM",
    deliveryLocation: "Addis Ababa, Ayertena",
    contact: "+251900584595",
    status: "Pending",
    receiptUrl: "/receipts/12456789.pdf",
    products: [
      {
        id: "p1",
        name: "Black Forest Cake",
        price: 144.0,
        quantity: 3,
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100",
        kilo: 1.5,
        message: "Happy Birthday",
      },
      {
        id: "p2",
        name: "Mocha Cake",
        price: 100.0,
        quantity: 2,
        image:
          "https://images.unsplash.com/photo-1606890737304-57e9b2c0e8ef?w=100&h=100",
        kilo: 1,
        message: "With extra chocolate",
      },
    ],
  },
  {
    id: "12356790",
    customer: "John",
    date: "October 2, 2025 at 10:30 AM",
    deliveryDate: "April 12, 2025 • 2:00 PM - 4:00 PM",
    deliveryLocation: "Addis Ababa, Bole",
    contact: "+251911223344",
    status: "Confirmed",
    receiptUrl: "/receipts/12456789.pdf",

    products: [
      {
        id: "p3",
        name: "Chocolate Cake",
        price: 120.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100",
        kilo: 2,
        message:
          "Congratulations! Congratulations !Congratulations! Congratulations!Congratulations!Congratulations!Congratulations!Congratulations!Congratulations! Congratulations!Congratulations!Congratulations! Congratulations!Congratulations! cCongratulations!Congratulations!Congratulations! Congratulations!Congratulations!Congratulations! Congratulations!Congratulations!Congratulations!Congratulations!Congratulations!Congratulations!Congratulations!Congratulations!Congratulations!Congratulations!",
      },
    ],
  },
  {
    id: "12346790",
    customer: "John",
    date: "October 2, 2025 at 10:30 AM",
    deliveryDate: "April 12, 2025 • 2:00 PM - 4:00 PM",
    deliveryLocation: "Addis Ababa, Bole",
    contact: "+251911223344",
    receiptUrl: "/receipts/12456789.pdf",

    status: "Confirmed",
    products: [
      {
        id: "p3",
        name: "Chocolate Cake",
        price: 120.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=100&h=100",
        kilo: 2,
        message: "",
      },
    ],
  },
  {
    id: "12345790",
    customer: "John",
    date: "October 2, 2025 at 10:30 AM",
    deliveryDate: "April 12, 2025 • 2:00 PM - 4:00 PM",
    deliveryLocation: "Addis Ababa, Bole",
    contact: "+251911223344",
    receiptUrl: "/receipts/12456789.pdf",

    status: "Confirmed",
    products: [
      {
        id: "p3",
        name: "Chocolate Cake",
        price: 120.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100",
        kilo: 1,
        message: "No nuts please",
      },
    ],
  },
  {
    id: "12345690",
    customer: "John",
    date: "October 2, 2025 at 10:30 AM",
    deliveryDate: "April 12, 2025 • 2:00 PM - 4:00 PM",
    deliveryLocation: "Addis Ababa, Bole",
    contact: "+251911223344",
    status: "Confirmed",
    receiptUrl: "/receipts/12456789.pdf",

    products: [
      {
        id: "p3",
        name: "Chocolate Cake",
        price: 120.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100",
        kilo: 0.5,
        message: "",
      },
    ],
  },
  {
    id: "12345670",
    customer: "John",
    date: "October 2, 2025 at 10:30 AM",
    deliveryDate: "April 12, 2025 • 2:00 PM - 4:00 PM",
    deliveryLocation: "Addis Ababa, Bole",
    contact: "+251911223344",
    status: "Confirmed",
    receiptUrl: "/receipts/12456789.pdf",

    products: [
      {
        id: "p3",
        name: "Chocolate Cake",
        price: 120.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100",
        kilo: 1,
        message: "Serve chilled",
      },
    ],
  },
  {
    id: "12345679",
    customer: "John",
    date: "October 2, 2025 at 10:30 AM",
    deliveryDate: "April 12, 2025 • 2:00 PM - 4:00 PM",
    deliveryLocation: "Addis Ababa, Bole",
    contact: "+251911223344",
    // receiptUrl: "/receipts/12456789.pdf",

    status: "Confirmed",
    products: [
      {
        id: "p3",
        name: "Chocolate Cake",
        price: 120.0,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100&h=100",
        kilo: 1,
        message: "Happy Anniversary",
      },
    ],
  },
];

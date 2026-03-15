import smartphone from "@/assets/products/smartphone.jpg";
import headphones from "@/assets/products/headphones.jpg";
import smartwatch from "@/assets/products/smartwatch.jpg";
import laptop from "@/assets/products/laptop.jpg";
import earbuds from "@/assets/products/earbuds.jpg";
import speaker from "@/assets/products/speaker.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
  trustScore: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  reviewText: string;
  rating: number;
  sentiment: "positive" | "negative" | "neutral";
  sentimentConfidence: number;
  fakeReviewLabel: "real" | "fake";
  fakeProbability: number;
  userStatus: "genuine" | "suspicious" | "bot";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  accountAge: number; // days
  reviewsPerDay: number;
  status: "genuine" | "suspicious" | "bot";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Galaxy Pro Max 15",
    description: "Flagship smartphone with 200MP camera, 6.8\" AMOLED display, 5000mAh battery, and the latest Snapdragon processor. Experience photography like never before.",
    price: 999.99,
    image: smartphone,
    rating: 4.5,
    reviewCount: 128,
    trustScore: 87,
  },
  {
    id: "2",
    name: "SoundWave Pro X",
    description: "Premium wireless noise-cancelling headphones with 40-hour battery life, spatial audio, and ultra-comfortable memory foam ear cushions.",
    price: 349.99,
    image: headphones,
    rating: 4.7,
    reviewCount: 256,
    trustScore: 92,
  },
  {
    id: "3",
    name: "ChronoFit Ultra",
    description: "Advanced smartwatch with health monitoring, GPS, 5ATM water resistance, and a stunning always-on AMOLED display.",
    price: 449.99,
    image: smartwatch,
    rating: 4.3,
    reviewCount: 89,
    trustScore: 78,
  },
  {
    id: "4",
    name: "ProBook Air 16",
    description: "Ultra-thin laptop with M3 chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina display, and 22-hour battery life.",
    price: 1499.99,
    image: laptop,
    rating: 4.8,
    reviewCount: 342,
    trustScore: 95,
  },
  {
    id: "5",
    name: "AirPods Studio",
    description: "True wireless earbuds with active noise cancellation, transparency mode, and immersive spatial audio experience.",
    price: 199.99,
    image: earbuds,
    rating: 4.4,
    reviewCount: 198,
    trustScore: 82,
  },
  {
    id: "6",
    name: "BoomBox 360",
    description: "Portable Bluetooth speaker with 360° sound, IP67 waterproof rating, 24-hour battery, and built-in powerbank.",
    price: 129.99,
    image: speaker,
    rating: 4.6,
    reviewCount: 167,
    trustScore: 90,
  },
];

export const reviews: Review[] = [
  {
    id: "r1", userId: "u1", userName: "John Smith", productId: "1",
    reviewText: "Battery life is amazing and the camera quality blows my mind! Best phone I've ever owned.",
    rating: 5, sentiment: "positive", sentimentConfidence: 0.92, fakeReviewLabel: "real", fakeProbability: 0.05, userStatus: "genuine", createdAt: "2026-03-14",
  },
  {
    id: "r2", userId: "u2", userName: "Sarah Johnson", productId: "1",
    reviewText: "This is the best phone ever made in the history of phones. Nothing compares. Buy it now!!!",
    rating: 5, sentiment: "positive", sentimentConfidence: 0.65, fakeReviewLabel: "fake", fakeProbability: 0.87, userStatus: "suspicious", createdAt: "2026-03-13",
  },
  {
    id: "r3", userId: "u3", userName: "Mike Chen", productId: "1",
    reviewText: "Phone overheats during gaming and the screen has a slight yellow tint. Disappointed.",
    rating: 2, sentiment: "negative", sentimentConfidence: 0.88, fakeReviewLabel: "real", fakeProbability: 0.12, userStatus: "genuine", createdAt: "2026-03-12",
  },
  {
    id: "r4", userId: "u4", userName: "Emily Davis", productId: "2",
    reviewText: "Noise cancellation is top-tier. Sound quality is rich and immersive. Worth every penny.",
    rating: 5, sentiment: "positive", sentimentConfidence: 0.95, fakeReviewLabel: "real", fakeProbability: 0.03, userStatus: "genuine", createdAt: "2026-03-14",
  },
  {
    id: "r5", userId: "u5", userName: "Alex Turner", productId: "2",
    reviewText: "Decent headphones. Nothing extraordinary but comfortable for long sessions.",
    rating: 3, sentiment: "neutral", sentimentConfidence: 0.71, fakeReviewLabel: "real", fakeProbability: 0.15, userStatus: "genuine", createdAt: "2026-03-11",
  },
  {
    id: "r6", userId: "u6", userName: "Bot_User_99", productId: "3",
    reviewText: "Great product great product great product buy now best deal ever!!!",
    rating: 5, sentiment: "positive", sentimentConfidence: 0.45, fakeReviewLabel: "fake", fakeProbability: 0.95, userStatus: "bot", createdAt: "2026-03-10",
  },
  {
    id: "r7", userId: "u7", userName: "Rachel Green", productId: "4",
    reviewText: "The display is gorgeous and the performance is incredibly smooth for video editing.",
    rating: 5, sentiment: "positive", sentimentConfidence: 0.91, fakeReviewLabel: "real", fakeProbability: 0.04, userStatus: "genuine", createdAt: "2026-03-14",
  },
  {
    id: "r8", userId: "u8", userName: "Tom Wilson", productId: "5",
    reviewText: "Sound quality is okay but they keep falling out of my ears. Not great for running.",
    rating: 2, sentiment: "negative", sentimentConfidence: 0.82, fakeReviewLabel: "real", fakeProbability: 0.09, userStatus: "genuine", createdAt: "2026-03-13",
  },
  {
    id: "r9", userId: "u2", userName: "Sarah Johnson", productId: "6",
    reviewText: "AMAZING AMAZING AMAZING BEST SPEAKER EVER BUY NOW DONT WAIT!!!",
    rating: 5, sentiment: "positive", sentimentConfidence: 0.38, fakeReviewLabel: "fake", fakeProbability: 0.92, userStatus: "suspicious", createdAt: "2026-03-09",
  },
  {
    id: "r10", userId: "u9", userName: "Lisa Park", productId: "4",
    reviewText: "Good laptop overall. The keyboard could be better but the battery life is impressive.",
    rating: 4, sentiment: "positive", sentimentConfidence: 0.73, fakeReviewLabel: "real", fakeProbability: 0.11, userStatus: "genuine", createdAt: "2026-03-08",
  },
];

export const suspiciousUsers: User[] = [
  { id: "u2", name: "Sarah Johnson", email: "sarah@test.com", accountAge: 3, reviewsPerDay: 12, status: "suspicious" },
  { id: "u6", name: "Bot_User_99", email: "bot99@fake.com", accountAge: 1, reviewsPerDay: 45, status: "bot" },
  { id: "u10", name: "ReviewKing", email: "king@reviews.com", accountAge: 5, reviewsPerDay: 22, status: "suspicious" },
  { id: "u11", name: "FastReviewer", email: "fast@mail.com", accountAge: 2, reviewsPerDay: 38, status: "bot" },
];

// Simulated AI analysis function (mimics Flask API response)
export function analyzeReview(reviewText: string): {
  sentiment: { sentiment: "positive" | "negative" | "neutral"; confidence: number };
  fake_review_detection: { review_label: "real" | "fake"; fake_probability: number; confidence: number };
  user_status: "genuine" | "suspicious" | "bot";
} {
  const text = reviewText.toLowerCase();
  const positiveWords = ["amazing", "great", "excellent", "love", "best", "fantastic", "wonderful", "good", "impressive"];
  const negativeWords = ["bad", "terrible", "awful", "hate", "worst", "disappointing", "poor", "broken"];
  const spamIndicators = ["buy now", "!!!", "best ever", "dont wait", "click here"];

  const posCount = positiveWords.filter(w => text.includes(w)).length;
  const negCount = negativeWords.filter(w => text.includes(w)).length;
  const spamCount = spamIndicators.filter(w => text.includes(w)).length;
  const isRepetitive = /(.+)\1{2,}/.test(text);
  const allCaps = reviewText === reviewText.toUpperCase() && reviewText.length > 10;

  let sentiment: "positive" | "negative" | "neutral" = "neutral";
  let sentConfidence = 0.5 + Math.random() * 0.3;
  if (posCount > negCount) { sentiment = "positive"; sentConfidence = 0.7 + Math.random() * 0.25; }
  else if (negCount > posCount) { sentiment = "negative"; sentConfidence = 0.7 + Math.random() * 0.25; }

  let fakeProbability = 0.05 + Math.random() * 0.15;
  let reviewLabel: "real" | "fake" = "real";
  if (spamCount > 0 || isRepetitive || allCaps) {
    fakeProbability = 0.7 + Math.random() * 0.25;
    reviewLabel = "fake";
  }

  let userStatus: "genuine" | "suspicious" | "bot" = "genuine";
  if (fakeProbability > 0.8) userStatus = "bot";
  else if (fakeProbability > 0.6) userStatus = "suspicious";

  return {
    sentiment: { sentiment, confidence: Math.round(sentConfidence * 100) / 100 },
    fake_review_detection: { review_label: reviewLabel, fake_probability: Math.round(fakeProbability * 100) / 100, confidence: Math.round((1 - fakeProbability) * 100) / 100 },
    user_status: userStatus,
  };
}

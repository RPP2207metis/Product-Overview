import http from 'k6/http';
import { check, sleep, Rate } from "k6";

//Random Selection from last 10th of the DB
  let max = 1000011;
  let min = 900000;
  const productId = Math.floor(Math.random() * (max - min) + min);

// Define the base URL of the API Routes
const allProductsroute = `http://localhost:3000/products/`;
const productRequest = `http://localhost:3000/products/${productId}`;
const styleRequest = `http://localhost:3000/products/${productId}/styles`;
const relatedRoute = `http://localhost:3000/products/${productId}/related`;

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 1000,
      timeUnit: '1s',
      preAllocatedVUs: 2,
      maxVUs: 50000,
    },
  },
};

export default function() {
  let response = http.get(`${relatedRoute}`, options);
  check(response, {
    "status is 200": (r) => r.status === 200
  });
}
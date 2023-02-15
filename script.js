import http from 'k6/http';
import { check, sleep, Rate } from "k6";

//Random Selection from last 10th of the DB
  let max = 1000011;
  let min = 900000;
  const productId = Math.floor(Math.random() * (max - min) + min);

/*==================
  Testing Routes for Localhost
===================*/

/*
const allProductsroute = `http://localhost:3000/products/`;
const productRequest = `http://localhost:3000/products/${productId}`;
const styleRequest = `http://localhost:3000/products/${productId}/styles`;
const relatedRoute = `http://localhost:3000/products/${productId}/related`;
*/

/*==================
  Testing Routes for public IP
====================*/

const allProductsroute = `http://54.185.5.152/products/`;
const productRequest = `http://54.185.5.152/products/${productId}`;
const styleRequest = `http://54.185.5.152/products/${productId}/styles`;
const relatedRoute = `http://54.185.5.152/products/${productId}/related`;

export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      duration: '30s',
      rate: 1,
      timeUnit: '1s',
      preAllocatedVUs: 2,
      maxVUs: 10,
    },
  },
};

export default function() {
  let response = http.get(`${styleRequest}`, options);
  check(response, {
    "status is 200": (r) => r.status === 200
  });
}



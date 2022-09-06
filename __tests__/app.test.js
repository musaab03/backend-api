const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const seededData = require("../db/data/test-data/index");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(seededData);
});

describe("Error Handling", () => {
  test("404: for endpoint that does not exist", () => {
    return request(app)
      .get("/api/bananas")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});

describe("GET", () => {
  describe("/api/categories: should return array of categories with slug and description properties", () => {
    test("200: for returning the array of categories", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then((response) => {
          const { body } = response;

          expect(Array.isArray(body.categories)).toBe(true);
          expect(body.categories.length > 0).toBe(true);

          body.categories.forEach((category) => {
            expect(typeof category.slug).toBe("string");
            expect(typeof category.description).toBe("string");
          });
        });
    });
  });

  describe('"/api/reviews/:review_id: should return specified review from id"', () => {
    test("200: for returning review from id", () => {
      return request(app)
        .get("/api/reviews/1")
        .expect(200)
        .then((response) => {
          const { body } = response;
          console.log(body);

          expect(typeof body.review.title).toBe("string");
          expect(typeof body.review.category).toBe("string");
          expect(typeof body.review.designer).toBe("string");
          expect(typeof body.review.owner).toBe("string");
          expect(typeof body.review.review_body).toBe("string");
          expect(typeof body.review.review_img_url).toBe("string");
          expect(typeof body.review.created_at).toBe("string");
          expect(typeof body.review.votes).toBe("number");
        });
    });
  });
});

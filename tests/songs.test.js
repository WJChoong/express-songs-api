const app = require("../app");
const request = require("supertest");

//Fill in the test case below for the Songs API

describe("routes/songs", () => {

  it("POST /songs should return a new song object", () => {
    requestBody = { name: "test song", artist: "rhianna"};

    return request(app)
    .post("/songs")
    .send(requestBody)

    .then(response => {
      expect(response.status).toEqual(200);
      expect(response.body).toMatchObject(requestBody);
    });
  });  
  
  it("GET /songs should return a non empty array", () => {
   

  });

  it("GET /songs/:id should return song with id specified", () => {
   

  });
  
  it("PUT /songs/:id should return the updated song", () => {
    

  });

  it("DELETE /songs/:id should return the deleted song", () => {
    

  });
  
  it("GET /songs should return an empty array", () => {
    
    
  });

});


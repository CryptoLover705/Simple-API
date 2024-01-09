a web api that finds the best person for a job. the API shouls support the following requests: 
`POST /candidates` - add a candidate to the database (kept in memory). The request body is json shaped, as follows:
```
{
  "id" : "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
  "name" : "Jimmy Coder",
  "skills" : [ "javascript", "es6", "node.js", "express" ]
}
```
The example above, the candidate has four skills. the content - type header will be set to application /json in every such POST request.
The server should respond with a success code in the 200 - 299 range (for example, "200 OK" is fine). the response body is disregarded by the client body and can be empty.
`GET /candidates/search?skills=javascript,express,mongodb` - Find and return the candidate that has the most skills from the given set (comma-seperated). in this example, we request three skills. if a candidate possesses all of the listed skills (3 out of 3), or has more then the other candidates then they are considered the best and should be returned. 
the response should have Content-Type set to `application/json` and the response body should be of the same shape as the request body for `POST /candidates`, that is: 
```
{
  "id" : "ae588a6b-4540-5714-bfe2-a5c2a65f547a",
  "name" : "Jimmy Coder",
  "skills" : [ "javascript", "es6", "node.js", "express" ]
}
```
the http response code must be 200 if a candidate is found with at least one matching skill, or 404 if so sustainable candidates exist.
added candidates should be kept in memory; no database/storage backend is available.
Each search request should return the candidate with the best coverage of the requested skills - if five different skills are requested, then the candidate who has four of them is better then a candidate who only has three of them, and so on.
if the request is invalid (has no body in the case of `POST`, or no `?skills=...` in GET) then status code 400 (Bad Request) must be returned.
HTTP 5xx error codes are considered errors and must not be returned.

Assumptions
each Candidate has a unique id - the server will never receive two POSTs with the same id;
id is any string from 1 to 100 characters;
name is any string from 1 to 100 characters;
skills is an array of strings from 1 to 100 characters, being letters, numbers or hyphens ([a-zA-Z0-1]+), with a maximum of 10,000 elements); elements in the array or in query strings are not duplicated (there is no [ "skill1", "skill2", "skill1" ] ).

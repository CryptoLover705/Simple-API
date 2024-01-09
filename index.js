const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory database to store candidates
const candidatesDB = [];

app.use(bodyParser.json());

// Endpoint to add a candidate to the database
app.post('/candidates', (req, res) => {
  const { id, name, skills } = req.body;

  // Validate request body
  if (!id || !name || !skills || !Array.isArray(skills) || skills.length === 0) {
    return res.status(400).send('Bad Request');
  }

  // Check if candidate with the same id already exists
  if (candidatesDB.some(candidate => candidate.id === id)) {
    return res.status(400).send('Candidate with the same id already exists');
  }

  // Add candidate to the database
  candidatesDB.push({ id, name, skills });

  // Respond with success
  res.status(200).send('Candidate added successfully');
});

// Endpoint to search for candidates with the best skills coverage
app.get('/candidates/search', (req, res) => {
  const requestedSkills = req.query.skills;

  // Validate request
  if (!requestedSkills) {
    return res.status(400).send('Bad Request');
  }

  const requestedSkillsArray = requestedSkills.split(',');

  // Find the candidate with the best skills coverage
  let bestCandidate = null;
  let bestCoverage = 0;

  candidatesDB.forEach(candidate => {
    const intersection = candidate.skills.filter(skill => requestedSkillsArray.includes(skill));
    if (intersection.length > bestCoverage) {
      bestCandidate = candidate;
      bestCoverage = intersection.length;
    }
  });

  // Respond based on the search result
  if (bestCandidate) {
    res.status(200).json(bestCandidate);
  } else {
    res.status(404).send('No suitable candidates found');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

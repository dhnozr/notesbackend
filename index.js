const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// creating id for now
const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;

  return String(maxId + 1);
};

// for post request
app.post("/api/notes", (request, response) => {
  const body = request.body;

  // if content not exist in the request body return an error
  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  response.json(note);
});

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  // take ID and find which note its belong to
  const id = request.params.id;
  const note = notes.find((n) => n.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).json({ error: `No id:${id} found` });
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);
  notes = notes.filter((note) => note.id !== id);
  response.status(200).json(note);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

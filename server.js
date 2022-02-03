const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();
const api = require('./routes/index.js');


// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', api);
// app.use(express.static('routes'));



app.get('*', (req,res)=>{
    res.status(404).end();
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
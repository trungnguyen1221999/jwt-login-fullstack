
import express from 'express'
import dotnet from 'dotnet'
dotnet.config();
const app = express();

const port = process.env.PORT || 5002;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
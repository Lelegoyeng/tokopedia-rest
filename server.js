const express = require('express');
const { tokopedia } = require('./tokopedia');

const app = express();
const port = 3000;

app.use(express.json());
app.post('/rest', async (req, res) => {
    const { search } = req.body;
    const data = await tokopedia(search)
    console.log(data)
    res.json({ message: 'Data Ditemukan!', data: data });
});


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});

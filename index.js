const express = require('express');
const {mergeConfig} = require("./merge");
const app = express();
const cors = require('cors');
const port = 8888;

app.use(express.json());
app.use(cors());

app.get('/health', (req,res) => {
    res.send('Health ok');
});

app.post('/component', async (req,res) => {
    const zipStream = await mergeConfig(req.body);
    zipStream.pipe(res);
});

app.post('/test', (req, res) => {
    setTimeout(() => res.json({ok: true}) , 5000);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

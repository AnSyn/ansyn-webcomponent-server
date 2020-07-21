const express = require('express');
const {mergeConfig} = require("./merge");
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors());
app.post('/component', async (req,res) => {
    const zipStream = await mergeConfig(req.body);
    zipStream.pipe(res);
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

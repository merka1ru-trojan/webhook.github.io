const express = require('express');
const app = express();
const fs = require('fs');

const PORT = 3000;

let uniqueIPs = new Set();

// Загрузка уникальных IP-адресов из файла при запуске сервера
if (fs.existsSync('uniqueIPs.json')) {
    uniqueIPs = new Set(JSON.parse(fs.readFileSync('uniqueIPs.json', 'utf8')));
}

app.use(express.static('public'));

app.get('/visit', (req, res) => {
    const ip = req.ip;
    if (!uniqueIPs.has(ip)) {
        uniqueIPs.add(ip);
        fs.writeFileSync('uniqueIPs.json', JSON.stringify([...uniqueIPs]));
    }
    res.send({ count: uniqueIPs.size });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

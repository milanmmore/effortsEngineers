const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (_req, res) => {
	res.send('Efforts Engineers Backend Running');
});

app.get('/health', (_req, res) => {
	res.json({ status: 'ok' });
});

module.exports = app;

if (require.main === module) {
	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
}

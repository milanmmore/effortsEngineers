require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth.routes');
const catalogRoutes = require('./routes/catalog.routes');
const quotationRoutes = require('./routes/quotation.routes');
const ordersRoutes = require('./routes/orders.routes');
const adminRoutes = require('./routes/admin.routes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/quotation', quotationRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/admin', adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

module.exports = app;

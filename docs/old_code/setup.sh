#!/bin/bash

mkdir effortsengineers-backend
cd effortsengineers-backend

# Core files
touch server.js package.json

# Config
mkdir config && touch config/db.js

# Routes
mkdir routes && touch routes/inventory.js routes/quotation.js routes/clients.js

# Controllers
mkdir controllers && touch controllers/inventoryController.js controllers/quotationController.js controllers/clientController.js

# Models
mkdir models && touch models/inventoryModel.js models/quotationModel.js models/clientModel.js

# Utils
mkdir utils && touch utils/pdfGenerator.js

// MongoDB initialization script for ObservaScore
db = db.getSiblingDB('observascore');

db.createCollection('observascores');

db.observascores.createIndex({ createdAt: -1 });
db.observascores.createIndex({ projectName: 1 });
db.observascores.createIndex({ environment: 1 });
db.observascores.createIndex({ overallScore: -1 });

print('ObservaScore database initialized successfully');
print('Author: Harshitt Singhrowa | Reg: 23FE10CSE00838');

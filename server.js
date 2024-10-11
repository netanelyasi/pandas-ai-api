// server.js
const express = require('express');
const { DataFrame } = require('pandas-js');
const { PandasAI } = require('pandas-ai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware לקריאת JSON
app.use(express.json());

// יצירת אובייקט PandasAI
const ai = new PandasAI();

// Route לטיפול בבקשות המשתמש
app.post('/analyze', async (req, res) => {
    try {
        // קבלת הנתונים מהבקשה
        const jsonData = req.body.data;  // נתוני טבלה
        const userQuery = req.body.query; // שאלה מהמשתמש

        // יצירת DataFrame
        const df = new DataFrame(jsonData);

        // הפעלת השאילתה על הטבלה
        const result = ai.query(df, userQuery);

        // החזרת תוצאות
        res.json({ result });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).send('An error occurred while processing your request.');
    }
});

// הפעלת השרת
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

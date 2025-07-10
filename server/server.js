import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session'; 

dotenv.config();

const client = await MongoClient.connect(process.env.MONGO_DB_URL);
const db = client.db(process.env.MONGO_DB);

const app = express();
const PORT = 3000;

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
}));

app.use((req, res, next) => {
    if (req.session.userId) {
      req.user = {
        id: req.session.userId,
        job_role: req.session.job_role,
        reports_to: req.session.reports_to
      };
    }
    next();
});

const requireAuth = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Please login' });
    }
    next();
};

app.post('/login', async (req, res) => {
    console.log("INSIDE /LOGIN");
    try {
      const { username, password } = req.body;
      
      const usersColl = db.collection(process.env.MONGO_DB_COLLECTION_USERS);
      const user = await usersColl.findOne({ username: username});
      
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
    
      const empColl = db.collection(process.env.MONGO_DB_COLLECTION_EMPLOYEES);
      const emp = await empColl.findOne({ employee_id: parseInt(password)});
      console.log(emp);

      if (!emp) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Store user ID in session
      req.session.userId = emp.employee_id.toString();
      req.session.job_role = emp.job_role;

      req.session.reports_to = emp.reports_to ? user.reports_to.toString() : null;
      
      res.json(emp);
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ message: 'Server error during login' });
    }
  });


app.get('/directory', requireAuth, async (req, res) => {
    console.log("INSIDE /DIRECTORY");

    try {
        
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_EMPLOYEES);
        const employees = await collection.find({}).toArray();

        if (employees.length === 0) {
            return res.status(404).send("No employees exist");
        }

        const filteredEmps = employees.map(e => {
            const employee = {...e};

            const check = (req.user.id === employee.employee_id.toString() || req.user.job_role.includes("HR") || employee.reports_to === req.user.id);

            if(!check) {
                delete employee.salary;
            }

            return employee;
        });

        res.json(filteredEmps);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

app.get('/account', requireAuth, async (req, res) => {
    console.log("INSIDE /ACCOUNT");

    try {
        
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_EMPLOYEES);
        const employee = await collection.findOne({employee_id: req.user.id});
        if(!employee) {
            return res.status(404).send("No employee exists");
        }
       
        res.json(employee);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

app.post('/search', requireAuth, async (req, res) => {
    console.log("INSIDE /SEARCH");
    try {
        const { searchTerm } = req.body;
        const collection = db.collection(process.env.MONGO_DB_COLLECTION_EMPLOYEES);
        const searchPattern = new RegExp(searchTerm, 'i');
    
        const employees = await collection.find({
        $or: [
            { first_name: searchPattern },
            { last_name: searchPattern }
        ]
        }).toArray();

        if(!employees) {
            return res.status(404).send("No employee exists");
        }
       
        res.json(employees);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Error Status 500");
    }
});

app.post('/logout', (req, res) => {
    console.log("INSIDE /LOGOUT");

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout' });
      }
      res.json({ message: 'Logged out successfully' });
    });
});
  














app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
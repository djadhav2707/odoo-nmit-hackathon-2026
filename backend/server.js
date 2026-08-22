require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-Memory Seed Data (used as initial dataset or fallback if MongoDB Atlas is connecting/offline)
let mockEmployees = [
  { id: "DF-2024-0112", name: "Rohith Kumar", email: "rohith.kumar@dayflow.io", phone: "+91 98450 12345", department: "Engineering", designation: "Senior Software Engineer", role: "EMPLOYEE", status: "Active", joinDate: "12 Jan 2023", initials: "RK", basicSalary: 45000, allowances: 40000, deductions: 12600, netSalary: 72400 },
  { id: "DF-2023-0089", name: "Ananya Priya", email: "ananya.priya@dayflow.io", phone: "+91 98450 67890", department: "Marketing", designation: "Marketing Lead", role: "EMPLOYEE", status: "Active", joinDate: "05 Jun 2023", initials: "AP", basicSalary: 50000, allowances: 45000, deductions: 14200, netSalary: 80800 },
  { id: "DF-2022-0045", name: "Siddharth Menon", email: "siddharth.m@dayflow.io", phone: "+91 98450 54321", department: "Operations", designation: "Operations Manager", role: "EMPLOYEE", status: "Active", joinDate: "18 Mar 2022", initials: "SM", basicSalary: 55000, allowances: 40000, deductions: 15000, netSalary: 80000 },
  { id: "DF-2021-0012", name: "Priya Sharma", email: "priya.sharma@dayflow.io", phone: "+91 98450 99999", department: "HR", designation: "HR Administrator", role: "ADMIN", status: "Active", joinDate: "10 Jan 2021", initials: "PS", basicSalary: 60000, allowances: 45000, deductions: 16000, netSalary: 89000 }
];

let mockAttendance = [
  { id: "ATT-101", employeeId: "DF-2024-0112", name: "Rohith Kumar", department: "Engineering", date: "22 Aug 2026", checkIn: "09:03 AM", checkOut: "06:05 PM", hours: "9h 02m", status: "Present" },
  { id: "ATT-102", employeeId: "DF-2023-0089", name: "Ananya Priya", department: "Marketing", date: "22 Aug 2026", checkIn: "09:47 AM", checkOut: "06:30 PM", hours: "8h 43m", status: "Late" },
  { id: "ATT-103", employeeId: "DF-2022-0045", name: "Siddharth Menon", department: "Operations", date: "22 Aug 2026", checkIn: "—", checkOut: "—", hours: "0h 00m", status: "Absent" }
];

let mockLeaves = [
  { id: "LV-201", employeeId: "DF-2024-0112", name: "Rohith Kumar", leaveType: "Annual Leave", startDate: "2026-08-25", endDate: "2026-08-26", days: 2, remarks: "Family wedding out of town", status: "Pending", appliedOn: "22 Aug 2026", adminComment: "" },
  { id: "LV-202", employeeId: "DF-2023-0089", name: "Ananya Priya", leaveType: "Casual Leave", startDate: "2026-08-28", endDate: "2026-08-28", days: 1, remarks: "Personal work", status: "Pending", appliedOn: "21 Aug 2026", adminComment: "" },
  { id: "LV-203", employeeId: "DF-2024-0112", name: "Rohith Kumar", leaveType: "Casual Leave", startDate: "2026-08-10", endDate: "2026-08-10", days: 1, remarks: "Bank appointment", status: "Approved", appliedOn: "08 Aug 2026", adminComment: "Approved by manager" }
];

let mockPayroll = [
  { id: "PAY-301", employeeId: "DF-2024-0112", name: "Rohith Kumar", department: "Engineering", basic: 45000, hra: 22500, gross: 85000, deductions: 12600, netPay: 72400, month: "August 2026", status: "Pending Run" },
  { id: "PAY-302", employeeId: "DF-2023-0089", name: "Ananya Priya", department: "Marketing", basic: 50000, hra: 25000, gross: 95000, deductions: 14200, netPay: 80800, month: "August 2026", status: "Pending Run" },
  { id: "PAY-303", employeeId: "DF-2022-0045", name: "Siddharth Menon", department: "Operations", basic: 55000, hra: 27500, gross: 95000, deductions: 15000, netPay: 80000, month: "August 2026", status: "Pending Run" }
];

let db = null;
let client = null;

// Initialize Database Connection if MONGO_URI is present
if (process.env.MONGO_URI && process.env.MONGO_URI.startsWith("mongodb")) {
  client = new MongoClient(process.env.MONGO_URI, { serverSelectionTimeoutMS: 2500 });
  client.connect()
    .then(() => {
      db = client.db("dayflow");
      console.log("Connected successfully to MongoDB (database: dayflow)");
    })
    .catch((err) => {
      console.warn("MongoDB connection notice (operating with memory store):", err.message);
      db = null;
    });
}

// ----------------------------------------------------
// 1. Health Check
// ----------------------------------------------------
app.get("/", (req, res) => {
  res.json({
    message: "DayFlow HRMS API is running",
    database: db ? "MongoDB Connected" : "In-Memory Store Active",
    version: "1.0.0"
  });
});

// ----------------------------------------------------
// 2. Authentication (Sign In & Sign Up)
// ----------------------------------------------------
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  // Check admin vs employee
  const isAdmin = email.toLowerCase().includes("admin") || email.toLowerCase().includes("priya");
  const user = {
    name: isAdmin ? "Priya Sharma" : "Rohith Kumar",
    email: email,
    role: isAdmin ? "admin" : "employee",
    department: isAdmin ? "HR" : "Engineering",
    token: "mock-jwt-token-" + Date.now()
  };

  res.json({
    message: "Login successful",
    user
  });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password, role } = req.body;
  const newEmp = {
    id: `DF-${Math.floor(1000 + Math.random() * 9000)}`,
    name: name || "New User",
    email: email || "user@dayflow.io",
    role: role || "EMPLOYEE",
    status: "Active",
    joinDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    initials: (name || "NU").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
  };
  mockEmployees.push(newEmp);
  res.status(201).json({ message: "User registered successfully", user: newEmp });
});

// ----------------------------------------------------
// 3. Dashboard Statistics
// ----------------------------------------------------
app.get("/api/admin/dashboard", (req, res) => {
  res.json({
    totalEmployees: mockEmployees.length,
    presentToday: mockAttendance.filter(a => a.status === "Present").length || 219,
    pendingLeaves: mockLeaves.filter(l => l.status === "Pending").length,
    payrollDue: "₹14.2L",
    feed: [
      { id: 1, title: "Rohith Kumar submitted leave request", time: "10m ago", tag: "Leave", icon: "badge-rose" },
      { id: 2, title: "Ananya Priya checked in late (09:47 AM)", time: "1h ago", tag: "Attendance", icon: "badge-warning" },
      { id: 3, title: "August Payroll draft generated", time: "3h ago", tag: "Payroll", icon: "badge-success" }
    ]
  });
});

// ----------------------------------------------------
// 4. Employee Management (CRUD)
// ----------------------------------------------------
app.get(["/employees", "/api/admin/employees"], async (req, res) => {
  try {
    if (db) {
      const emps = await db.collection("employees").find().toArray();
      if (emps.length > 0) return res.json(emps);
    }
    res.json(mockEmployees);
  } catch (error) {
    res.json(mockEmployees);
  }
});

app.post(["/employees", "/api/admin/employees"], async (req, res) => {
  try {
    const employeeData = req.body;
    const newEmp = {
      id: `DF-${Math.floor(1000 + Math.random() * 9000)}`,
      name: employeeData.name || "New Employee",
      email: employeeData.email || "",
      department: employeeData.department || "Engineering",
      designation: employeeData.designation || "Associate",
      phone: employeeData.phone || "+91 98000 00000",
      status: "Active",
      role: employeeData.role || "EMPLOYEE",
      joinDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      initials: (employeeData.name || "NE").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
      basicSalary: employeeData.basicSalary || 45000,
      allowances: employeeData.allowances || 35000,
      deductions: 10000,
      netSalary: 70000
    };

    if (db) {
      const result = await db.collection("employees").insertOne(newEmp);
      newEmp._id = result.insertedId;
    }

    mockEmployees.push(newEmp);
    res.status(201).json({ message: "Employee created successfully", employee: newEmp, id: newEmp.id });
  } catch (error) {
    res.status(500).json({ message: "Failed to create employee", error: error.message });
  }
});

app.put(["/employees/:id", "/api/admin/employees/:id"], async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const idx = mockEmployees.findIndex(e => e.id === id || String(e._id) === id);
  if (idx !== -1) {
    mockEmployees[idx] = { ...mockEmployees[idx], ...updateData };
    return res.json({ message: "Employee updated", employee: mockEmployees[idx] });
  }
  res.json({ message: "Employee updated", updateData });
});

app.delete(["/employees/:id", "/api/admin/employees/:id"], async (req, res) => {
  const { id } = req.params;
  mockEmployees = mockEmployees.filter(e => e.id !== id && String(e._id) !== id);
  res.json({ message: "Employee deleted successfully", id });
});

// ----------------------------------------------------
// 5. Attendance Module
// ----------------------------------------------------
app.get("/api/admin/attendance", (req, res) => {
  res.json(mockAttendance);
});

app.post("/api/attendance/check-in", (req, res) => {
  const { employeeId } = req.body;
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const entry = {
    id: `ATT-${Date.now()}`,
    employeeId: employeeId || "DF-2024-0112",
    date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    checkIn: now,
    checkOut: "—",
    hours: "In progress",
    status: "Present"
  };
  mockAttendance.unshift(entry);
  res.json({ message: "Checked in successfully", entry });
});

app.post("/api/attendance/check-out", (req, res) => {
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  res.json({ message: "Checked out successfully", checkOut: now });
});

// ----------------------------------------------------
// 6. Leave Management
// ----------------------------------------------------
app.get("/api/admin/leaves", (req, res) => {
  res.json(mockLeaves);
});

app.post("/api/leaves", (req, res) => {
  const { leaveType, startDate, endDate, remarks, days } = req.body;
  const newLeave = {
    id: `LV-${Date.now()}`,
    employeeId: "DF-2024-0112",
    name: "Rohith Kumar",
    leaveType: leaveType || "Annual Leave",
    startDate: startDate || "2026-08-25",
    endDate: endDate || "2026-08-26",
    days: days || 2,
    remarks: remarks || "Vacation",
    status: "Pending",
    appliedOn: "Today",
    adminComment: ""
  };
  mockLeaves.unshift(newLeave);
  res.status(201).json({ message: "Leave application submitted", leave: newLeave });
});

app.patch(["/api/admin/leaves/:id", "/api/leaves/:id"], (req, res) => {
  const { id } = req.params;
  const { status, adminComment } = req.body;
  const leave = mockLeaves.find(l => l.id === id);
  if (leave) {
    leave.status = status;
    if (adminComment) leave.adminComment = adminComment;
    return res.json({ message: `Leave ${status}`, leave });
  }
  res.json({ message: `Leave status updated to ${status}`, id, status });
});

// ----------------------------------------------------
// 7. Payroll Module
// ----------------------------------------------------
app.get("/api/admin/payroll", (req, res) => {
  res.json(mockPayroll);
});

// Start listening
app.listen(PORT, () => {
  console.log(`DayFlow Server running on http://localhost:${PORT}`);
});

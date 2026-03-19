import { useEffect, useState } from "react";
import { apiRequest } from "./api";
import type { Employee, Attendance } from "./types";
import EmployeeSection from "./components/EmployeeSection";
import AttendanceSection from "./components/AttendanceSection";
import Loading from "./components/Loading";
import ErrorMessage from "./components/ErrorMessage";

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"employees" | "attendance">("employees");

  // Fetch employees and attendance on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [empData, attData] = await Promise.all([
          apiRequest("/api/employees"),
          apiRequest("/api/attendance"),
        ]);
        setEmployees(empData);
        setAttendance(attData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddEmployee = async (payload: {
    id: string;
    name: string;
    email: string;
    department: string;
  }) => {
    try {
      const newEmployee = await apiRequest("/api/employees", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setEmployees([...employees, newEmployee]);
      setError(null);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to add employee");
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await apiRequest(`/api/employees/${id}`, {
        method: "DELETE",
      });
      setEmployees(employees.filter((e) => e.id !== id));
      setAttendance(attendance.filter((a) => a.employeeId !== id));
      setSelectedEmployeeId(null);
      setError(null);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to delete employee");
    }
  };

  const handleAddAttendance = async (payload: {
    employeeId: string;
    date: string;
    status: "Present" | "Absent";
  }) => {
    try {
      const newRecord = await apiRequest("/api/attendance", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      setAttendance([...attendance, newRecord]);
      setError(null);
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "Failed to add attendance record");
    }
  };

  const handleSelectEmployee = (id: string) => {
    setSelectedEmployeeId(id);
    setActiveTab("attendance");
  };

  if (loading) {
    return (
      <div className="app">
        <Loading />
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>HRMS Lite</h1>
          <p className="subtitle">Human Resource Management System</p>
        </div>
      </header>

      {error && <ErrorMessage message={error} />}

      <div className="tabs">
        <button
          className={`tab ${activeTab === "employees" ? "active" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          👥 Employees ({employees.length})
        </button>
        <button
          className={`tab ${activeTab === "attendance" ? "active" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          📋 Attendance ({attendance.length})
        </button>
      </div>

      {selectedEmployeeId && activeTab === "attendance" && (
        <div className="status">
          Selected Employee: <strong>{employees.find((e) => e.id === selectedEmployeeId)?.name}</strong>
          <button onClick={() => setSelectedEmployeeId(null)} style={{ marginLeft: "12px" }}>
            Clear Selection
          </button>
        </div>
      )}

      <main className="main">
        {activeTab === "employees" && (
          <EmployeeSection
            employees={employees}
            onCreate={handleAddEmployee}
            onDelete={handleDeleteEmployee}
            onSelectEmployee={handleSelectEmployee}
            selectedEmployeeId={selectedEmployeeId || undefined}
          />
        )}

        {activeTab === "attendance" && (
          <AttendanceSection
            employees={employees}
            attendance={attendance}
            onCreateAttendance={handleAddAttendance}
            selectedEmployeeId={selectedEmployeeId}
          />
        )}
      </main>
    </div>
  );
}

export default App;

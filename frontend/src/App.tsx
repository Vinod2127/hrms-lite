import { useEffect, useState } from "react";
import { apiRequest } from "./api";

function App() {
  const [employees, setEmployees] = useState([]);

  // GET employees
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await apiRequest("/api/employees");
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // ADD employee
  const addEmployee = async () => {
    try {
      const newEmp = {
        name: "Test User",
        role: "Developer",
      };

      await apiRequest("/api/employees", {
        method: "POST",
        body: JSON.stringify(newEmp),
      });

      fetchEmployees(); // refresh
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  return (
    <div>
      <h1>HRMS Lite</h1>

      <button onClick={addEmployee}>Add Employee</button>

      <ul>
        {employees.map((emp: any, index: number) => (
          <li key={index}>
            {emp.name} - {emp.role}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

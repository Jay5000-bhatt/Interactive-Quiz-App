import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper.jsx";

export default function ResultTable() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getServerData(
          `http://localhost:8080/api/result`
        );
        setData(response);
      } catch (error) {
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <th>Name</th>
            <th>Attempts</th>
            <th>Earn Points</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4">No Data Found</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr className="table-body" key={index}>
                <td>{item.username || "N/A"}</td>
                <td>{item.attempts || 0}</td>
                <td>{item.points || 0}</td>
                <td>{item.achieved || "N/A"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

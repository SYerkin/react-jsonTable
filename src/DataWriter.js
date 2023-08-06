import React, { useState } from 'react';
import './DataWriter.css';
// Генерируем случайные данные
function generateRandomData(numRows) {
  const data = [];

  for (let i = 1; i <= numRows; i++) {
    const id = i;
    const firstName = generateRandomName();
    const lastName = generateRandomName();
    const email = `${firstName}${lastName}@in.gov`.toLowerCase();
    const phone = generateRandomPhoneNumber();

    data.push({ id, firstName, lastName, email, phone });
  }

  return data;
}

function generateRandomName() {
  const names = ['Sue', 'Lor', 'Ips', 'John', 'Jane', 'Mike', 'Emily', 'Alex'];
  return names[Math.floor(Math.random() * names.length)];
}

function generateRandomPhoneNumber() {
  const phoneNumber = `(612)${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
  return phoneNumber;
}

function DataWriter() {
  const numRowsToGenerate = 5;
  const jsonData = generateRandomData(numRowsToGenerate);

  // Функция для сохранения данных в формате JSON
  const saveToJsonFile = () => {
    const dataStr = JSON.stringify(jsonData);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
  };
  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>email</th>
            <th>phone</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <button onClick={saveToJsonFile}>Сохранить данные</button>
      {renderTable()}
    </div>
  );
}

export default DataWriter;

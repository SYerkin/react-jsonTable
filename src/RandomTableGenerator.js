import React, { useState } from 'react';

const RandomTableGenerator = () => {
  const [tableSize, setTableSize] = useState(3);
  const [fields, setFields] = useState([{ name: '', type: 'string' }]);
  const [generatedTable, setGeneratedTable] = useState(null);

  const handleSizeChange = (e) => {
    setTableSize(parseInt(e.target.value));
  };

  const handleAddField = (e) => {
    e.preventDefault();
    setFields([...fields, { name: '', type: 'string' }]);
  };

  const handleFieldChange = (index, field) => {
    const updatedFields = [...fields];
    updatedFields[index] = field;
    setFields(updatedFields);
  };

  const handleGenerateTable = (e) => {
    e.preventDefault();
    const tableData = [];
    for (let i = 0; i < tableSize; i++) {
      const rowData = {};
      fields.forEach((field) => {
        switch (field.type) {
          case 'string':
            rowData[field.name] = generateRandomString();
            break;
          case 'number':
            rowData[field.name] = generateRandomNumber();
            break;
          case 'date':
            rowData[field.name] = generateRandomDate();
            break;
          // Добавьте другие типы данных, если необходимо
          default:
            rowData[field.name] = '';
        }
      });
      tableData.push(rowData);
    }
    setGeneratedTable(tableData);
  };

  const handleSaveJson = (e) => {
    e.preventDefault();
    if (generatedTable) {
      const json = JSON.stringify(generatedTable, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated_table.json';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const generateRandomString = () => {
    // Здесь можно добавить логику для генерации случайной строки
    return 'Random String';
  };

  const generateRandomNumber = () => {
    // Здесь можно добавить логику для генерации случайного числа
    return Math.floor(Math.random() * 100);
  };

  const generateRandomDate = () => {
    // Здесь можно добавить логику для генерации случайной даты
    return new Date().toLocaleDateString();
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Создать случайную JSON-таблицу</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>
          Размер таблицы:
          <input type="number" value={tableSize} onChange={handleSizeChange} />
        </label>
      </div>
      <div>
        {fields.map((field, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '10px' }}>
            <select
              value={field.type}
              onChange={(e) =>
                handleFieldChange(index, { ...field, type: e.target.value })
              }
              style={{ marginRight: '10px' }}
            >
              <option value="string">Строка</option>
              <option value="number">Цифра</option>
              <option value="date">Дата</option>
              {/* Добавьте другие типы данных, если необходимо */}
            </select>
            <input
              type="text"
              value={field.name}
              placeholder="Название поля"
              onChange={(e) =>
                handleFieldChange(index, { ...field, name: e.target.value })
              }
            />
            {index === fields.length - 1 && (
              <button onClick={handleAddField} style={{ marginLeft: '10px' }}>
                +
              </button>
            )}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px' }}>
        <button onClick={handleGenerateTable}>Сгенерировать</button>
        <button onClick={handleSaveJson} style={{ marginLeft: '10px' }}>
          Сохранить JSON
        </button>
      </div>
      {generatedTable && (
        <div>
          <h3>Сгенерированная JSON-таблица:</h3>
          <pre>{JSON.stringify(generatedTable, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RandomTableGenerator;

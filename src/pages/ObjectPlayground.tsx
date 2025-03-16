import { useState } from "react";
import { useWorkerDataObject } from "../hooks/worker_data_object";

export function ObjectPlayground() {
  const proxyData = useWorkerDataObject();
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleSetItem = () => {
    try {
      // Split the key into parts for nested path
      const keyParts = key.split('.');
      let current = proxyData;

      // Traverse to the second-to-last part, creating objects as needed
      for (let i = 0; i < keyParts.length - 1; i++) {
        if (!current[keyParts[i]]) {
          current[keyParts[i]] = {};
        }
        current = current[keyParts[i]];
      }

      // Set the value at the final key
      current[keyParts[keyParts.length - 1]] = value;
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Object Client Playground</h1>
      <div>
        <input
          type="text"
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={handleSetItem}>Set Item</button>
      </div>
      <div>
        <h2>Current Data</h2>
        <pre>{JSON.stringify(proxyData, null, 2)}</pre>
      </div>
    </div>
  );
}

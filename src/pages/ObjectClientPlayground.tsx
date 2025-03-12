import { useState } from "react";
import {
  useObjectClient,
  ObjectClientProvider,
} from "../context/object-client";

export function ObjectClientPlayground() {
  const { data, getItem, setItem } = useObjectClient();
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const handleGetItem = () => {
    try {
      console.log("setting item");
      const result = getItem(key);
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleSetItem = () => {
    try {
      console.log("setting item");
      setItem(key, value);
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
        <button onClick={handleGetItem}>Get Item</button>
      </div>
      <div>
        <h2>Current Data</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export function ObjectClientPlaygroundWrapper() {
  return (
    <ObjectClientProvider url="ws://localhost:8765">
      <ObjectClientPlayground />
    </ObjectClientProvider>
  );
}

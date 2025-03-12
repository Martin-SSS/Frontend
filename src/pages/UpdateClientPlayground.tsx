import { useState, useEffect, useRef } from "react";
import { UpdateClient, Update, UpdatePacket } from "../utils/update-client";

export function UpdateClientPlayground() {
  const [messages, setMessages] = useState<UpdatePacket[]>([]);
  const [input, setInput] = useState("");
  const [position, setPosition] = useState("");
  const ws = useRef<UpdateClient | null>(null);

  useEffect(() => {
    ws.current = new UpdateClient("ws://localhost:8765");
    ws.current.handleIncomingUpdate = (updatePacket) => {
      setMessages((prevMessages) => [...prevMessages, updatePacket]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (ws.current && input && position) {
      const update: Update = {
        timestamp: new Date().toISOString(),
        position: { root: position.split(".") },
        data: input,
      };
      ws.current.sendUpdate(update);
      setInput("");
      setPosition("");
    }
  };

  return (
    <div>
      <h1>Update Client Playground</h1>
      <div>
        <input
          type="text"
          placeholder="Position (e.g., foo.bar.lol)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div>
        <h2>Received Messages</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>Timestamp:</strong> {message.timestamp}
              <br />
              <strong>Pos:</strong> {JSON.stringify(message.position)}
              <br />
              <strong>Data:</strong> {JSON.stringify(message.data)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

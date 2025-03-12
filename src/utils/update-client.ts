import { z } from "zod";

interface JsonValBase {
  [key: string]: JsonVal;
}

export type JsonVal =
  | string
  | number
  | boolean
  | null
  | JsonVal[]
  | JsonValBase;

const JsonValSchema: z.ZodSchema<JsonVal> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.null(),
    z.array(z.lazy(() => JsonValSchema)),
    z.record(z.lazy(() => JsonValSchema)),
  ])
);

export interface Position {
  root: string[];
}

export interface Update {
  timestamp: string;
  position: Position;
  data: any;
}

export interface UpdatePacket {
  timestamp: string;
  position: string[];
  data: JsonVal;
}

const UpdatePacketSchema: z.ZodSchema<UpdatePacket> = z.object({
  timestamp: z.string(),
  position: z.array(z.string()),
  data: JsonValSchema,
});

export class UpdateClient {
  private websocket: WebSocket;
  private url: string;
  public handleIncomingUpdate?: (updatePacket: UpdatePacket) => void;
  constructor(url: string) {
    this.url = url;
    this.websocket = new WebSocket(this.url);

    this.websocket.onopen = (event) => {
      console.log("Connected to the server");
    };

    this.websocket.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.websocket.onclose = (event) => {
      console.log("Disconnected from the server");
    };

    this.websocket.onerror = (event) => {
      console.error("WebSocket error:", event);
    };
  }

  private handleMessage(data: any) {
    try {
      const parsedData = JSON.parse(data);
      const updatePacket = UpdatePacketSchema.parse(parsedData);
      if (this.handleIncomingUpdate) {
        this.handleIncomingUpdate(updatePacket);
      } else {
        console.warn("No handler for incoming updates.");
      }
    } catch (error) {
      console.error("Failed to parse or validate message:", error);
    }
  }

  public sendUpdate(update: Update) {
    const updatePacket: UpdatePacket = {
      timestamp: update.timestamp,
      position: update.position.root,
      data: update.data,
    };
    const jsonUpdate = JSON.stringify(updatePacket);
    console.log("sending update", jsonUpdate);
    this.websocket.send(jsonUpdate);
  }

  public close() {
    this.websocket.close();
  }
}

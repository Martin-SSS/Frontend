import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  UpdateClient,
  UpdatePacket,
  Position,
  Update,
} from "../utils/update-client";
import { Box, CircularProgress, Typography } from "@mui/material";

interface ObjectClientContextProps {
  data: any;
  getItem: (name: string) => any;
  setItem: (name: string, value: any) => void;
}

const ObjectClientContext = createContext<ObjectClientContextProps | undefined>(
  undefined
);

export const ObjectClientProvider: React.FC<{
  url: string;
  children: ReactNode;
}> = ({ url, children }) => {
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);
  const updateClient = useRef<UpdateClient | null>(null);

  useEffect(() => {
    const handleIncomingUpdate = (updatePacket: UpdatePacket) => {
      setData((prevData: any) => {
        if (updatePacket.position.length === 0) {
          // handle update root position
          setIsLoading(false);
          return updatePacket.data;
        } else {
          // handle update nested position
          const newData = { ...prevData };
          let current = newData;
          for (const key of updatePacket.position.slice(0, -1)) {
            current = current[key] = current[key] || {};
          }
          current[updatePacket.position[updatePacket.position.length - 1]] =
            updatePacket.data;
          return newData;
        }
      });
    };

    updateClient.current = new UpdateClient(url);
    updateClient.current.handleIncomingUpdate = handleIncomingUpdate;

    return () => {
      if (updateClient.current) {
        updateClient.current.close();
        updateClient.current = null;
      }
    };
  }, [url]);

  const getItem = (name: string) => {
    const keys = name.split(".");
    let current = data;
    for (const key of keys) {
      current = current[key];
      if (current === undefined) {
        return undefined;
      }
    }
    return current;
  };

  const setItem = (name: string, value: any) => {
    const keys: Position = name.split(".");
    if (updateClient.current !== null) {
      updateClient.current.sendUpdate({
        timestamp: new Date().toISOString(),
        position: keys,
        data: value,
      });
      setData((prevData: any) => {
        const newData = { ...prevData };
        let current = newData;
        for (const key of keys.slice(0, -1)) {
          current = current[key] = current[key] || {};
        }
        current[keys[keys.length - 1]] = value;
        return newData;
      });
    } else {
      throw new Error("Update client is not initialized");
    }
  };

  if (isLoading || Object.keys(data).length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading worker data...
        </Typography>
      </Box>
    );
  }

  return (
    <ObjectClientContext.Provider value={{ data, getItem, setItem }}>
      {children}
    </ObjectClientContext.Provider>
  );
};

export const useObjectClient = () => {
  const context = useContext(ObjectClientContext);
  if (context === undefined) {
    throw new Error(
      "useObjectClient must be used within an ObjectClientProvider"
    );
  }
  return context;
};

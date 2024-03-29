import { promises as fs } from "fs";

export const read = async <T>(jsonFilePath: string): Promise<T | null> => {
  try {
    const rawData = await fs.readFile(jsonFilePath, "utf-8");
    const data = JSON.parse(rawData) as T;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const write = async (
  jsonFilePath: string,
  data: object
): Promise<boolean> => {
  try {
    await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

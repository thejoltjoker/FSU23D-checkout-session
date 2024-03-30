import { promises as fs, constants } from "fs";
import path from "path";

const checkOrCreateDirectory = async (filePath: string) => {
  const dirname = path.dirname(filePath);
  try {
    await fs.access(dirname, constants.F_OK);
  } catch (error) {
    await fs.mkdir(dirname, { recursive: true });
  }
};

export const read = async <T>(jsonFilePath: string): Promise<T | null> => {
  try {
    await fs.access(jsonFilePath, constants.F_OK);
    const rawData = await fs.readFile(jsonFilePath, "utf-8");
    const data = JSON.parse(rawData) as T;
    return data;
  } catch (error) {
    console.error(`Error reading JSON file ${jsonFilePath}: ${error}`);
    return null;
  }
};

export const write = async <T extends object>(
  jsonFilePath: string,
  data: T
): Promise<boolean> => {
  try {
    await checkOrCreateDirectory(jsonFilePath);
    await fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error(`Error writing JSON file ${jsonFilePath}: ${error}`);
    return false;
  }
};

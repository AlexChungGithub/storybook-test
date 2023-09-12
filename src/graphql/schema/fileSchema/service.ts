import fs from "fs-extra";
const service = {
  writeFile: async (args: { path?: string; jsonString: string }) => {
    const { path = "tmp.json", jsonString } = args;
    await fs.writeFile(path, jsonString);
    return "success";
  }
};

export default service;

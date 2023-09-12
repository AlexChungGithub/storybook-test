import fs from "fs-extra";

class FileUtils {
  static async writeFile(data = "default") {
    try {
      const tmp = `write ${data}`;
      await fs.writeFile("tmp.txt", tmp);
    } catch (err) {
      console.log("WRITE FILE ERROR: ", err);
    }
  }
}

export default FileUtils;

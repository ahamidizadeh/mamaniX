import { readFileSync } from "fs";

const imagePath = "../components/images/small-banana.webp";

const imageBinaryData = readFileSync(imagePath);

console.log(imageBinaryData.toString("hex"));

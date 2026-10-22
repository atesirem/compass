// Fails while placeholders remain in the operator data. Run before every deploy: npm run check:legal
import { operator, placeholdersLeft } from "../src/content/legal/operator";

const left = placeholdersLeft(operator);
if (left.length > 0) {
  console.error(`Legal data incomplete. Fill in src/content/legal/operator.ts: ${left.join(", ")}`);
  process.exit(1);
}
console.log("Legal data complete.");

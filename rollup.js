import { setTimeout } from "node:timers/promises";
import { watch } from "rollup";

function delayPlugin(ms) {
  return {
    name: "delay-plugin",

    async buildStart() {
      console.log(`[delay-plugin] sleeping ${ms}ms`);
      await setTimeout(ms);
    },
  };
}

const watcher = watch({
  input: "index.js",
  output: {
    file: "bundle.js",
    format: "esm",
  },
  plugins: [delayPlugin(2000)],
});

watcher.on("event", (event) => {
  console.log(event.code);
});

watcher.on("close", () => {
  console.log("close event");
});

await setTimeout(1000);

console.log("call watcher.close");
await watcher.close();
console.log("watcher.close promise resolves");

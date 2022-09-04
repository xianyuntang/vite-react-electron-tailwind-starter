import chalk from "chalk";
import * as esbuild from "esbuild";
import * as fs from "fs";
import * as path from "path";
import {
  cannotFoundTSConfigMessage,
  CompileError,
  entryPaths,
  finishMessageDev,
  formatDiagnosticsMessage,
  mainPath,
  outDirMain,
  startMessage,
} from "./common";
import startElectron from "./run-electron";
import startViteServer from "./run-vite";

function reportError(errors: CompileError[]) {
  const reportingMessage = formatDiagnosticsMessage(errors);
  console.error(reportingMessage);
}

function buildStart() {
  console.log(startMessage);
}

async function electronClosed() {
  if (viteClose) {
    await viteClose();
  }
}

function buildComplete(dir: string) {
  console.log(finishMessageDev);
  void startElectron(dir, electronClosed);
}

function notFoundTSConfig() {
  console.error(chalk.red(cannotFoundTSConfigMessage));
  process.exit();
}

let viteClose: () => Promise<void>;

async function main() {
  // Start vite server
  viteClose = await startViteServer();
  // Start dev for main process
  void esDev(reportError, buildStart, buildComplete, notFoundTSConfig);
}

void main();

//
// SUPPORTING BUILD SCRIPT
//

function transformErrors(error: esbuild.BuildFailure): CompileError[] {
  const errors = error.errors.map((e): CompileError => {
    return {
      location: e.location,
      message: e.text,
    };
  });
  return errors;
}

async function esDev(
  reportError: { (errors: CompileError[]): void; (arg0: CompileError[]): void },
  buildStart: () => void,
  buildComplete: { (dir: string): void; (arg0: string): void },
  notFoundTSConfig: { (): void; (): void }
) {
  const tsconfigPath = path.join(mainPath, "tsconfig.json");
  console.log(tsconfigPath);
  if (!fs.existsSync(tsconfigPath)) {
    notFoundTSConfig();
  }
  try {
    await esbuild.build({
      outdir: outDirMain,
      entryPoints: entryPaths,
      tsconfig: tsconfigPath,
      format: "cjs",
      bundle: true,
      logLevel: "silent",
      incremental: true,
      platform: "node",
      sourcemap: true,
      external: ["electron"],
      watch: {
        onRebuild: (error) => {
          if (error) {
            reportError(transformErrors(error));
          } else {
            buildComplete(outDirMain);
          }
        },
      },
    });
    buildComplete(outDirMain);
  } catch (e) {
    if (!!e.errors && !!e.errors.length && e.errors.length > 0) {
      const error = e as esbuild.BuildFailure;
      reportError(transformErrors(error));
    }
  }
}

/**
 * This script is used to build out the matrix that is the input
 * to the publish job.
 * */
import { appendFileSync } from "node:fs";
import { argv, env, exit } from "node:process";
import * as os from "node:os";

const { SITES, SITES_CHANGED } = env;

try {
  const [_node, _script, ...userArgs] = argv;
  const doBuildAll = userArgs.some((arg) => arg === "--all");
  if (!SITES) {
    throw new Error("Needs SITES set. Are you missing the sites.json file?");
  }

  const allSites = JSON.parse(SITES);
  if (doBuildAll) {
    deploy(allSites);
    exit(0);
  } else {
    if (!SITES_CHANGED || SITES_CHANGED === "") {
      throw new Error("SITES_CHANGED is not set");
    }

    deploy(reduceSites(allSites, SITES_CHANGED));
    exit(0);
  }
} catch (error) {
  console.error("Error building sites", error);
  exit(1);
}

function deploy(sites) {
  let matrix = { include: [] };
  for (const [key, value] of Object.entries(sites)) {
    matrix.include.push({ package: key, project: value });
  }
  appendFileSync(
    process.env.GITHUB_OUTPUT,
    `matrix=${JSON.stringify(matrix)}${os.EOL}`
  );
}

function reduceSites(allSites, sitesChanged) {
  return Object.entries(allSites).reduce((accum, [pkg, project]) => {
    if (sitesChanged.includes(pkg)) {
      accum[pkg] = project;
    }
    return accum;
  }, {});
}

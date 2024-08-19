#!/usr/bin/env node

import { exec } from "node:child_process";
import { exit } from "node:process";
import { promisify } from "node:util";

import { Command } from "commander";
import { rimraf } from "rimraf";
import ora from "ora";

import Logger from "./utils/logger.mjs";

const execP = promisify(exec);

const program = new Command();
program
  .name("Unicorn CLI")
  .description("Unicorn CLI for creating a new website")
  .version("0.1.0");

program
  .command("new")
  .description("Create a new website")
  .requiredOption("-d, --dir <name>", "name of the directory")
  .requiredOption("-j, --job <title>", "job title you are applying for")
  .requiredOption(
    "-c, --company <name>",
    "name of the company. This will be used in website copy."
  )
  .action(async ({ dir, job, company }) => {
    try {
      /**
       * Copy the template. There is a template site found in sites/template. You'll want to
       * customize this site to minimize edits after creating a new site.
       * */
      const copyTemplateJob = ora("Copying the template...").start();
      await execP(`cp -R sites/template/ sites/${dir}`);
      copyTemplateJob.succeed("Copied the template");

      /**
       * Rename the project. Rename the package in the monorepo.
       * */
      const renameJob = ora("Renaming the project...").start();
      await execP(`sed -i.bak "s/template/${dir}/g" sites/${dir}/package.json`);
      renameJob.succeed("Renamed the project");

      /**
       * Rename the copy of the website. If you follow the convention this script depends on, write
       * your website copy with the placeholder values of "Company" and "Job Title".
       * */
      const renameCopyJob = ora("Renaming the copy...").start();
      await execP(
        `grep -rl 'Company' "sites/${dir}/" | xargs sed -i.bak "s/Company/${company}/g"`
      );
      await execP(
        `grep -rl 'Job Title' "sites/${dir}/" | xargs sed -i.bak "s/Job Title/${job}/g"`
      );
      renameCopyJob.succeed("Renamed the copy");

      /**
       * Re-install the dependencies.
       * */
      const removeDepsJob = ora("Removing dependencies...").start();
      await rimraf(["node_modules", "package-lock.json"]);
      removeDepsJob.succeed("Removed dependencies");

      const reinstallDepsJob = ora("Re-installing dependencies...").start();
      const { stdout } = await execP(`npm i`);
      console.log(stdout);
      reinstallDepsJob.succeed("Re-installed dependencies");

      /**
       * Reminders on what you have to follow up on after creating a new site.
       * */
      Logger.info("========================================");
      Logger.info(`
      You're not done yet!
      1. Make sure your DNS is setup correctly if you are deploying to a custom domain.
      2. Make sure your Cloudflare Pages project is setup.
      3. Make sure to add an entry to .github/workflows/publish.yml so that the project gets deployed.
      4. Consider customizing your resume for this application specifically.
      `);
      Logger.info("========================================");
      Logger.success(`Run your new site with npm run dev -w sites/${dir}`);
    } catch (error) {
      Logger.err(error);
      exit(1);
    }
  });

program.parse();

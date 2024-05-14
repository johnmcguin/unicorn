/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
declare namespace App {
  interface Locals {
    config: {
      /** blog title */
      title: string;
      /** company name you're applying to */
      company: string;
      /** Years of Experience */
      yoe: number;
      /** your name */
      name: string;
      /** website description */
      desc: string;
      /** your deployed domain */
      website: string;
      /** theme style */
      themeStyle: "light" | "auto" | "dark";
      /** your socials */
      socials: Array<{
        name: string;
        href: string;
      }>;
      /** your navigation links */
      navs: Array<{
        name: string;
        href: string;
      }>;
    };
  }
}

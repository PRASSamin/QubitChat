import { AppMetadata } from "./src/core/types/metadata";
import * as c from "./app.config";

const config = c.default();

const metadata: AppMetadata = {
  name: config.name,
  package: config.android?.package,
  slug: config.slug,
  version: config.version,
  release_label: "beta",
  supportEmail: "prassamin@gmail.com",
  platforms: config.platforms as AppMetadata["platforms"],
  author: {
    name: "PRAS Samin",
    email: "prassamin@gmail.com",
    github: "https://github.com/PRASSamin",
    website: "https://pras.me",
    linkedin: "https://www.linkedin.com/in/prassamin/",
    organization: "PRAS",
  },
  repository: {
    type: "git",
    url: config.githubUrl,
  },
};

export { metadata };

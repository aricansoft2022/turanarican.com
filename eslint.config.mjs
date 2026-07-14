import next from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [".next/**", ".open-next/**", "node_modules/**", "reference/**"],
  },
  ...next,
];

export default eslintConfig;

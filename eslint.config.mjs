import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // useMagnetic returns ref with motion handlers; ref is not read during render
      "react-hooks/refs": "off",
    },
  },
];

export default eslintConfig;

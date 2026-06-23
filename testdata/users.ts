export const users = {
  standard: {
    username: "standard_user",
    password: "secret_sauce",
    label: "Standard user",
  },
  lockedOut: {
    username: "locked_out_user",
    password: "secret_sauce",
    label: "Locked out user",
    errorMsg: "Epic sadface: Sorry, this user has been locked out.",
  },
  problem: {
    username: "problem_user",
    password: "secret_sauce",
    label: "Problem user",
  },
  performanceGlitch: {
    username: "performance_glitch_user",
    password: "secret_sauce",
    label: "Performance glitch user",
  },
  error: {
    username: "error_user",
    password: "secret_sauce",
    label: "Error user",
  },
  visual: {
    username: "visual_user",
    password: "secret_sauce",
    label: "Visual user",
  },
} as const;

export const invalidCredentials = [
  {
    username: "",
    password: "",
    label: "empty credentials",
    errorMsg: "Epic sadface: Username is required",
  },
  {
    username: "",
    password: "secret_sauce",
    label: "empty username",
    errorMsg: "Epic sadface: Username is required",
  },
  {
    username: "standard_user",
    password: "",
    label: "empty password",
    errorMsg: "Epic sadface: Password is required",
  },
];

export const protectedResources = {
  oaprojectsApi: {
    audience: "https://oaprojects-api.oaprojects.net",
    calendarEndpoint:
      import.meta.env.VITE_APP_API_URL + "/finance-tracker/calendar",
    accountEndpoint:
      import.meta.env.VITE_APP_API_URL + "/finance-tracker/account",
  },
};

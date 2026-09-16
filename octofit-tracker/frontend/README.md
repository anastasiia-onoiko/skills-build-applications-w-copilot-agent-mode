# Octofit Tracker Frontend

This React 19 presentation tier uses `react-router-dom` for navigation and reads API host settings from Vite environment variables.

## Environment

Define `VITE_CODESPACE_NAME` before running the frontend in Codespaces. A local example:

```bash
cat <<'EOF' > octofit-tracker/frontend/.env.local
VITE_CODESPACE_NAME=your-codespace-name
EOF
```

With that variable present, resource views call endpoints such as:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/
```

If `VITE_CODESPACE_NAME` is missing, the app avoids invalid `undefined` URLs by first trying to infer the Codespaces hostname from the current browser URL and then falling back to `http://localhost:8000/api`.

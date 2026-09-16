export const PORT = 8000;
export const HOST = '0.0.0.0';

export function getApiBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
}
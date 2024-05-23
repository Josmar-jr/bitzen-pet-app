import { useRouteError } from "react-router-dom";
import { Button } from "./ui/button";

export function ErrorBoundary() {
  const error = useRouteError() as { message: string; stack: string };

  return (
    <div>
      <h1>500</h1>
      <h2>Aconteceu um erro :/</h2>

      <code>{error.message}</code>
      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
        Tentar novamente
      </Button>
    </div>
  );
}

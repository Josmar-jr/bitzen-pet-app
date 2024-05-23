import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { router } from "./router";
import { Providers } from "./providers";

function App() {
  return (
    <Providers>
      {/* <div className="flex min-h-[100dvh] items-center justify-center bg-slate-50"> */}

      <Toaster richColors />

      <RouterProvider router={router} />
    </Providers>
  );
}

export default App;

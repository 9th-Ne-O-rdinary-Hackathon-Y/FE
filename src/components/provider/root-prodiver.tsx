import { queryClient } from "@/lib/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "../ui/sonner";

interface RootProdiverProps {
  children: React.ReactNode;
}

export default function RootProdiver({ children }: RootProdiverProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster position="top-center" duration={3000} closeButton />
    </QueryClientProvider>
  );
}

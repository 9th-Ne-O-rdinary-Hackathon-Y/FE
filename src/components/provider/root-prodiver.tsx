import { queryClient } from "@/lib/tanstack";
import { QueryClientProvider } from "@tanstack/react-query";

interface RootProdiverProps {
  children: React.ReactNode;
}

export default function RootProdiver({ children }: RootProdiverProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

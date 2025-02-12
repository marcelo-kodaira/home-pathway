import { QueryClientProvider } from "@tanstack/react-query";
import { RootPage } from "@/pages/Root";
import { queryClient } from "@/config/api/queryClient";
import { ToastContainer } from "react-toastify";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ToastContainer />
    <Header />
    <RootPage />
    <Footer />
  </QueryClientProvider>
);

export default App;

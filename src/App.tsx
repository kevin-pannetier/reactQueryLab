import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Posts from "./components/Posts";
import CreatePost from "./components/CreatePost";
import { TwoColumnsLayout } from "./layouts/TwoColumnLayout";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TwoColumnsLayout leftContent={<Posts />} rightContent={<CreatePost />} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;

import Home from "./component/home";
import Journey from "./component/journey";

export default function App() {
  return <Home journey={<Journey />} />;
}

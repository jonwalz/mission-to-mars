import { useState } from "react";
import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onMouseDown={() => setCount(count + 1)}>Button</Button>
      <p>{count}</p>
    </>
  );
}

export default App;

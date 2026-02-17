import Items from "src/components/Items.jsx";
import { groceryItems } from "src/data/groceryItems.js";
import "src/App.css";

const App = () => {
  return (
    <section className="section-center">
      <Items items={groceryItems} />
    </section>
  );
};

export default App;
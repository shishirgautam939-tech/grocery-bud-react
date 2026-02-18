import { useState } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";

import Items from "./components/Items";
import Form from "./components/Form";
import { groceryItems } from "./data/groceryItems";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [items, setItems] = useState(groceryItems);

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };

    const newItems = [...items, newItem];
    setItems(newItems);
    toast.success("grocery item added");
  };

  const editCompleted = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });

    setItems(newItems);
  };

  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    toast.success("item deleted");
  };

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />
      <Form addItem={addItem} />
      <Items
        items={items}
        editCompleted={editCompleted}
        removeItem={removeItem}
      />
    </section>
  );
};

export default App;

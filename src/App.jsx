import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";

import Items from "./components/Items";
import Form from "./components/Form";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";


const getLocalStorage = () => {
  let list = localStorage.getItem("grocery-list");
  if (list) {
    return JSON.parse(list);
  }
  return [];
};

const setLocalStorage = (items) => {
  localStorage.setItem("grocery-list", JSON.stringify(items));
};


const App = () => {
  const [items, setItems] = useState(getLocalStorage());
  const [editId, setEditId] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editId]);

  useEffect(() => {
    setLocalStorage(items);
  }, [items]);

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };

    setItems([...items, newItem]);
    toast.success("Grocery item added");
  };

  const editCompleted = (itemId) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setItems(newItems);
  };

  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    toast.success("Item deleted");
  };

  const updateItemName = (newName) => {
    const newItems = items.map((item) =>
      item.id === editId ? { ...item, name: newName } : item
    );

    setItems(newItems);
    setEditId(null);
    toast.success("Item updated");
  };

  return (
    <section className="section-center">
      <ToastContainer position="top-center" />

      <Form
        addItem={addItem}
        updateItemName={updateItemName}
        editItemId={editId}
        itemToEdit={items.find((item) => item.id === editId)}
        inputRef={inputRef}
      />

      <Items
        items={items}
        editCompleted={editCompleted}
        removeItem={removeItem}
        setEditId={setEditId}
      />
    </section>
  );
};

export default App;

import SingleItem from "src/components/SingleItem.jsx";
import "src/components/Items.css";

const Items = ({ items }) => {
  return (
    <div className="items">
      {items.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default Items;
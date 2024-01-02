function BottomSlideBar({ children, indexs }) {
  return (
    <div className={children}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={`w-24 bg-${
            index === indexs ? "blue-900" : "gray-400"
          } mx-2.5 border rounded-xl`}
        ></div>
      ))}
    </div>
  );
}
export default BottomSlideBar;

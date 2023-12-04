function NavBar() {
  return (
    <nav className="bg-gray-900">
      <div className="mx-auto max-w-10xl px-2 sm:px-6 lg:px-8 h-20 flex items-center">
        <div className="flex space-x-4">
          <a href="/">
            <div className="text-white text-4xl font-bold">FLEXiX</div>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

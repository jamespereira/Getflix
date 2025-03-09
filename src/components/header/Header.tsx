function Header() {
  return (
    <header className="w-full h-20 flex items-center justify-center bg-black">
      <div className="w-full w-max[1280px] flex justify-between items-center px-12">
        <h1 className="text-3xl text-white font-semibold">Getflix</h1>
        <p className="text-muted-foreground text-sm">Favourites</p>
      </div>
    </header>
  );
}

export default Header;

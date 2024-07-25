import Header from "@/Components/Containers/Header";

type TLayout = {
  children: any;
};

const Layout = ({ children }: TLayout) => {
  return (
    <div
      className="w-[500px] h-screen border border-gray-200 border-b-none mx-auto flex flex-col"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <header>
        <Header />
      </header>
      <main className="flex-auto">{children}</main>
      <footer>footer</footer>
    </div>
  );
};

export default Layout;

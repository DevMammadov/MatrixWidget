import Footer from "@/Components/Containers/Footer";
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
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-scroll pb-5">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

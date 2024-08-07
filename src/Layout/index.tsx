import Container from "@/Components/Containers/Container";
import Footer from "@/Components/Containers/Footer";
import Header from "@/Components/Containers/Header";

type TLayout = {
  children: any;
};

const Layout = ({ children }: TLayout) => {
  return (
    <Container>
      <Header />
      <main className="flex-1 overflow-x-hidden overflow-y-scroll pb-5">
        {children}
      </main>
      <Footer />
    </Container>
  );
};

export default Layout;

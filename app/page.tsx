import Banner from "@/components/shared/banner";
import Footer from "@/components/shared/footer";
import NavigationMenu from "@/components/shared/navigation-menu";

export default function HomePage() {
  return (
    <>
      <header className="w-full">
        <NavigationMenu />
        <section className="container-constraint pt-24">
          <Banner />
        </section>
      </header>
      <Footer />
    </>
  );
}

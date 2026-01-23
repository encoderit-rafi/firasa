import Logo from "@/assets/Logo";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <div>
      <div className="border-b border-b-gray-300">
        <Container variant={"lg"}>
          <header className="px-3 md:px-6 xl:px-12 py-3">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="headline-medium-emphasized">Firase</span>
            </div>
          </header>
        </Container>
      </div>
    </div>
  );
}

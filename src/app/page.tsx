export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="flex min-h-full flex-1 flex-col">
        <main
          id="main"
          className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-6 px-4 py-16 md:px-8"
        >
          <h1 className="text-center text-[36px] font-semibold leading-[1.1] tracking-[-0.015em] md:text-[48px]">
            USNS Administration Dashboard
          </h1>
          <p className="max-w-md text-center text-[15px] leading-[1.6] text-muted-fg md:text-base">
            Foundation setup complete. Feature modules will be added in
            subsequent development phases.
          </p>
        </main>
        <footer className="border-t border-border py-6 text-center">
          <p className="text-[13px] text-muted-fg">© USNS {year}</p>
        </footer>
      </div>
    </>
  );
}

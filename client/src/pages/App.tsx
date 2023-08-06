import OverviewTable from "./OverviewTable";

const App = () => {
  return (
    <div>
      <header>
        <nav className="mb-12 flex h-20 items-center justify-end border-b-2 border-b-zinc-200">
          <button className="mr-6 text-2xl">log out ⇨</button>
        </nav>
      </header>
      <main className="flex justify-center">
        <OverviewTable />
      </main>
    </div>
  );
};

export default App;

import Button from "@app/components/Button";
import OverviewTable from "./OverviewTable";

const App = () => {
  return (
    <div>
      <header>
        <nav className="mb-9 flex h-16 items-center justify-end border-b-2 border-b-zinc-200">
          <button className="mr-6 text-2xl">log out ⇨</button>
        </nav>
      </header>
      <main className="flex items-center justify-center">
        <div className="flex flex-col justify-center rounded-md border-[1px] border-zinc-900">
          <div className="flex justify-end p-6">
            <Button>Delete</Button>
            <Button>Block</Button>
            <Button>Unblock</Button>
          </div>
          <OverviewTable />
        </div>
      </main>
    </div>
  );
};

export default App;

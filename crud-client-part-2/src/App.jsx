import "./App.css";
import Users from "./components/Users";
import Practice from "./practice/Practice";
//getting data and mongodb
const userPromise = fetch("http://localhost:3000/user").then((res) => res.json());
function App() {
  return (
    <>
      <div className=" min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
        <div className="w-11/12 mx-auto">
          <h1 className="mb-5 text-center text-3xl text-white font-bold">Simple Crud</h1>
          <Users promise={userPromise} />
          <Practice />
        </div>
      </div>
    </>
  );
}

export default App;

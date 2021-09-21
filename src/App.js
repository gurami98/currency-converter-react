import './App.css';
import OneWayConversionDynamic from "./components/OneWayConversionDynamic";
import TwoWayConversion from "./components/TwoWayConversion";

function App() {
  return (
    <div className="App">
      <TwoWayConversion/>
      <br/>
      <OneWayConversionDynamic/>
    </div>
  );
}

export default App;

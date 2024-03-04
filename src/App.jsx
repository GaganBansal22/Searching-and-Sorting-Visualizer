import Home from "./Home"
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import SelectionSort from "./SelectionSort";
import MergeSort from "./MergeSort";
import HeapSort from "./HeapSort";
import QuickSort from "./QuickSort";
import LinearSearch from "./LinearSearch";
import BinarySearch from "./BinarySearch";
import homeIcon from "./resources/homeicon.png"
import './styles/app.css';

function App() {
  return (
    <div className="text-light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bubbleSort" element={<><HomeButton /><BubbleSort /></>} />
          <Route path="/insertionSort" element={<><HomeButton /><InsertionSort /></>} />
          <Route path="/selectionSort" element={<><HomeButton /><SelectionSort /></>} />
          <Route path="/mergeSort" element={<><HomeButton /><MergeSort /></>} />
          <Route path="/heapSort" element={<><HomeButton /><HeapSort /></>} />
          <Route path="/quickSort" element={<><HomeButton /><QuickSort /></>} />
          <Route path="/linearSearch" element={<><HomeButton /><LinearSearch /></>} />
          <Route path="/binarySearch" element={<><HomeButton /><BinarySearch /></>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function HomeButton(){
  let homeIconStyle={backgroundColor:"white",position:"absolute",left:"90%",top:"4%"}
  return (
    <button style={{...homeIconStyle}} className="btn rounded-circle home-button" >
     <a href="/"><img src={homeIcon} alt="" /></a>
    </button>
  )
}

export default App

import { useEffect, useState } from "react"
import {useNavigate} from "react-router-dom"
import "./styles/home.css"

function Home(){
    let navigateTo=useNavigate();
    let [showSortingOptions,SetSortingOptions]=useState(false)
    let [showSearchingOptions,SetSearchingOptions]=useState(false)
    return (
        <>
            <div className="heading"><p className="p1">SORTING AND SEARCHING</p>
            <p className="p2">VISUALIZER</p></div>
            <div className="text-center mt-5 container-options">
                <h2 className="btn px-2 fs-1 option" onClick={()=>{
                    SetSearchingOptions((curr)=>{return (!curr)})
                    SetSortingOptions(false)
                    }}>Searching</h2>
                <h2 className="btn fs-1 option" onClick={()=>{
                    SetSortingOptions((curr)=>{return (!curr)})
                    SetSearchingOptions(false)
                    }}>Sorting</h2>
            </div>
            {showSortingOptions?<SortingOptions />:<></>}
            {showSearchingOptions?<SearchingOptions />:<></>}
        </>
    )
}

function SortingOptions(){
    let navigateTo=useNavigate();
    return (
        <div className="moreOptions">
            <p className="btn d-block" onClick={()=>navigateTo("/bubbleSort")}>Bubble Sort</p>
            <p className="btn d-block" onClick={()=>navigateTo("/heapSort")}>Heap Sort</p>
            <p className="btn d-block" onClick={()=>navigateTo("/insertionSort")}>Insertion Sort</p>
            <p className="btn d-block" onClick={()=>navigateTo("/mergeSort")}>Merge Sort</p>
            <p className="btn d-block" onClick={()=>navigateTo("/quickSort")}>Quick Sort</p>
            <p className="btn d-block" onClick={()=>navigateTo("/selectionSort")}>Selection Sort</p>
        </div>
    )
}

function SearchingOptions(){
    let navigateTo=useNavigate();
    return (
        <div className="moreOptions">
            <p className="btn d-block" onClick={()=>navigateTo("/binarySearch")}>Binary Search</p>
            <p className="btn d-block" onClick={()=>navigateTo("/linearSearch")}>Linear Search</p>
        </div>
    )
}

export default Home
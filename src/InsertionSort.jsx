import { useState } from "react"
import { generateRandomElements, timeout } from "../utils"
import { useNavigate } from 'react-router-dom';

let pauseSorting = false;

function InsertionSort() {
    const navigateTo = useNavigate();
    let [speed, SetSpeed] = useState(500)
    let [isSorting, SetSorting] = useState(false)
    let [array, SetArray] = useState(generateRandomElements)
    let [isPaused, SetIsPaused] = useState(false)
    async function changeArray(j) {
        SetArray((curr) => {
            curr[j].selected = true;
            curr[j + 1].selected = true;
            return ([...curr]);
        })
        await timeout(speed);
        while (pauseSorting) await timeout(100);
        let valToReturn = false;
        if (array[j].num > array[j + 1].num) {
            valToReturn = true;
            let t = { ...array[j + 1] };
            array[j + 1] = { ...array[j] };
            array[j] = { ...t };
            SetArray([...array])
            await timeout(speed);
        }
        SetArray((curr) => {
            curr[j].selected = false;
            curr[j + 1].selected = false;
            return ([...curr]);
        })
        while (pauseSorting) await timeout(100);
        return valToReturn
    }
    async function insertionSortFunction() {
        SetSorting(true)
        let n = 50;
        for (let i = 1; i < n; i++) {
            for (let j = i; j > 0; j--) {
                while (pauseSorting) await timeout(100);
                let change = await changeArray(j - 1)
                if (!change) break;
            }
        }
        SetSorting(false)
    }
    return (
        <>
            <div className="text-center text-light">
                <h1 className="mt-4 text-start ms-5">Insertion Sort</h1>
                <div className="mt-3 mb-5">
                    <p className="d-inline fs-4">Speed:</p>
                    <div className="mt-3 mb-3">
                        <button onClick={() => { SetSpeed(1000) }}
                            className={speed == 1000 ? "ms-3 me-3 btn btn-success" : "ms-3 me-3 btn btn-warning"}
                            disabled={isSorting ? true : false} >Slow</button>
                        <button onClick={() => { SetSpeed(500) }}
                            className={speed == 500 ? "me-3 btn btn-success" : "me-3 btn btn-warning"}
                            disabled={isSorting ? true : false} >Medium</button>
                        <button onClick={() => { SetSpeed(20) }} disabled={isSorting ? true : false}
                            className={speed == 20 ? "btn btn-success" : "btn btn-warning"} >
                            Fast</button>
                    </div>
                </div>
                <div className="mx-auto mb-4" style={{ width: "90%", height: "75vh" }}>
                    {array.map((x) => {
                        return (
                            <div key={array.indexOf(x)} style=
                                {{
                                    display: "inline-block", border: "1px solid black", backgroundColor: (x.selected ? "green" : "#D0D3D4")
                                    , minWidth: "2%", minHeight: `${x.num}%`
                                }}></div>
                        )
                    })}
                </div>
                {isSorting ?
                    <>
                        {isPaused ?
                            <button className="btn btn-lg btn-success mb-4 me-4" onClick={() => { pauseSorting = false; SetIsPaused(false); }}>Start</button>
                            :
                            <button className="btn btn-lg btn-warning mb-4 me-4" onClick={() => { pauseSorting = true; SetIsPaused(true); }}>Pause</button>
                        }
                        <button className="btn btn-lg btn-danger mb-4" onClick={() => { navigateTo(0) }}>
                            Reset
                        </button>
                    </>
                    :
                    <button className="btn btn-lg btn-success mb-4" onClick={insertionSortFunction}>Start</button>
                }
            </div>
            <InsertionSortDetails />
        </>
    )
}

export default InsertionSort

function InsertionSortDetails() {
    return (
        <div className="container">
            <div className="row mt-4 mb-3">
                <div className="col-6">
                    <h3 className="text-center">Time Complexity Analysis</h3>
                    <p className="fs-3">
                        Best Case: Ω(n) <br />
                        Average Case: θ(n <sup>2</sup> )<br />
                        Worst Case: O(n <sup>2</sup> )<br />
                    </p>
                    <p className="fs-3">
                        T(n)=T(n-1)+n <br />
                        T(n)=T(n-2)+(n-1)+n <br />
                        T(n)=T(n-3)+(n-2)+(n-1)+n <br />
                        T(n)=T(n-(n-1))+(n-(n-2))+(n-(n-3))+........+n <br />
                        T(n)=1+2+3+.........+n <br />
                        T(n)=n(n+1)/2 <br />
                        T(n)=(n<sup>2</sup>/2)+(n/2) <br />
                        T(n)= O(n<sup>2</sup>) <br />
                    </p>
                </div>
                <div className="col-6 fs-6">
                    Insertion Sort is a simple comparison-based sorting algorithm that builds the final sorted array
                    one element at a time. It's particularly useful for small data sets or nearly sorted data. The
                    algorithm works by considering one element at a time and inserting it into its correct position
                    within the already sorted part of the array.<br />
                    Here's the step-by-step process for Insertion Sort:
                    <ol className="mt-3 mb-3">
                        <li>The first element in the array is considered to be the sorted part. All other elements are considered to be in the unsorted part.</li>
                        <li>Starting with the second element (index 1), iterate through the unsorted part of the array.</li>
                        <li>For each element in the unsorted part, compare it with the elements in the sorted part of the array, moving from right to left. Find the correct position for the element in the sorted part by shifting larger elements to the right.</li>
                        <li>Continue this process for each element in the unsorted part, gradually building the sorted portion of the array from left to right.</li>
                        <li>Once all elements are processed, the array is sorted.</li>
                    </ol>
                    Insertion Sort is less efficient than some other sorting algorithms for large data sets.
                    However, it's simple to implement and performs well on small data sets or data that is already
                    partially sorted.
                </div>
            </div>
        </div>
    )
}
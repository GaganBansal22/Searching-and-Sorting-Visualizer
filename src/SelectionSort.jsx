import { useState } from "react"
import { generateRandomElements, timeout } from "../utils";
import { useNavigate } from 'react-router-dom';

let pauseSorting = false;

function SelectionSort() {
    const navigateTo = useNavigate();
    let [speed, SetSpeed] = useState(500)
    let [isSorting, SetSorting] = useState(false)
    let [array, SetArray] = useState(generateRandomElements)
    let [isPaused, SetIsPaused] = useState(false)
    async function highlightElements(large, j) {
        SetArray((curr) => {
            curr[j].selected = true;
            curr[large].selected = true;
            return ([...curr]);
        })
        await timeout(speed)
        while (pauseSorting) await timeout(100);
        SetArray((curr) => {
            curr[j].selected = false;
            curr[large].selected = false;
            return ([...curr]);
        })
        while (pauseSorting) await timeout(100);
    }
    async function swapElements(i, j) {
        SetArray((curr) => {
            curr[i].selected = true;
            curr[j].selected = true;
            return ([...curr]);
        })
        await timeout(speed);
        while (pauseSorting) await timeout(100);
        if (i != j) {
            let t = { ...array[i] }
            array[i] = { ...array[j] }
            array[j] = { ...t }
            SetArray([...array])
            await timeout(speed)
        }
        while (pauseSorting) await timeout(100);
        SetArray((curr) => {
            curr[i].selected = false;
            curr[j].selected = false;
            return ([...curr]);
        })
    }
    async function selectionSortFunction() {
        SetSorting(true);
        let n = 50;
        for (let i = n - 1; i > 0; i--) {
            let large = 0;
            for (let j = 1; j <= i; j++) {
                while (pauseSorting) await timeout(100);
                await highlightElements(large, j)
                if (array[large].num < array[j].num)
                    large = j;
            }
            await swapElements(i, large)
            while (pauseSorting) await timeout(100);
        }
        SetSorting(false)
    }
    return (
        <>
            <div className="text-center text-light">
                <h1 className="mt-4 text-start ms-5">Selection Sort</h1>
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
                    <button className="btn btn-lg btn-success mb-4" onClick={selectionSortFunction}>Start</button>
                }
            </div>
            <SelectionSortDetails />
        </>
    )
}

export default SelectionSort

function SelectionSortDetails() {
    return (
        <div className="container">
            <div className="row mt-4 mb-3">
                <div className="col-6">
                    <h3 className="text-center">Time Complexity Analysis</h3>
                    <p className="fs-3">
                        Best Case: θ(n <sup>2</sup> ) <br />
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
                    Selection Sort is a simple and intuitive comparison-based sorting algorithm. It divides the input
                    list into two parts: the sorted and the unsorted sublists. The algorithm repeatedly selects the
                    minimum (or maximum) element from the unsorted sublist and moves it to the end of the sorted sublist
                    until the entire list is sorted.
                    <br />Here's the step-by-step process for Selection Sort:
                    <ol className="mt-3 mb-3">
                        <li><span className="fw-bold"></span>: The input list is divided into two sublists: the sorted sublist (initially empty) and the unsorted sublist (the entire list).</li>
                        <li><span className="fw-bold">Selection</span>: In each pass, the algorithm finds the minimum (or maximum) element from the unsorted sublist.</li>
                        <li><span className="fw-bold">Swap</span>: The selected minimum (or maximum) element is swapped with the first element in the unsorted sublist, effectively moving it to the end of the sorted sublist.</li>
                        <li><span className="fw-bold">Repeat</span>: Steps 2 and 3 are repeated until the unsorted sublist becomes empty, and the sorted sublist contains all the elements in sorted order.</li>
                    </ol>
                    Selection Sort has a time complexity of O(n<sup>2</sup>), making it less efficient than more advanced sorting algorithms like Merge Sort or Quick Sort. However, it has the advantage of being simple to implement and works well for small lists.
                </div>
            </div>
        </div>
    )
}
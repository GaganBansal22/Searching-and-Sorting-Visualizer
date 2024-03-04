import { useState } from "react"
import { generateRandomElements, timeout } from "../utils";
import { useNavigate } from 'react-router-dom';

let pauseSorting = false;

function BubbleSort() {
    const navigateTo = useNavigate();
    let [speed, SetSpeed] = useState(500)
    let [isSorting, SetSorting] = useState(false)
    let [isPaused, SetIsPaused] = useState(false)
    let [array, SetArray] = useState(generateRandomElements)
    async function changeArray(j) {
        while (pauseSorting) await timeout(100);
        let misMatch = false;
        SetArray((curr) => {
            curr[j].selected = true;
            curr[j + 1].selected = true;
            return ([...curr]);
        })
        await timeout(speed)
        while (pauseSorting) await timeout(100);
        if (array[j].num > array[j + 1].num) {
            misMatch = true;
            let t = { ...array[j + 1] };
            array[j + 1] = { ...array[j] };
            array[j] = { ...t };
            SetArray([...array])
            await timeout(speed)
        }
        SetArray((curr) => {
            curr[j + 1].selected = false;
            curr[j].selected = false;
            return ([...curr]);
        })
        while (pauseSorting) await timeout(100)
        return misMatch;
    }
    async function bubbleSortFunction() {
        SetSorting(true)
        let n = 50;
        let misMatch;
        for (let i = 0; i < (n - 1); i++) {
            misMatch = false
            for (let j = 0; j < (n - 1 - i); j++) {
                while (pauseSorting) await timeout(100);
                let m = await changeArray(j);
                misMatch = m || misMatch;
            }
            if (!misMatch) break;
        }
        SetSorting(false)
    }
    return (
        <>
            <div className="text-center text-light">
                <h1 className="mt-4 text-start ms-5">Bubble Sort</h1>
                <div className="mt-3 mb-5">
                    <p className="d-inline  fs-4">Speed:</p>
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
                    <button className="btn btn-lg btn-success mb-4" onClick={bubbleSortFunction}>Start</button>
                }
            </div>
            <BubbleSortDetails />
        </>
    )
}
export default BubbleSort

function BubbleSortDetails() {
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
                    Bubble Sort is a simple comparison-based sorting algorithm. It repeatedly steps through the list,
                    compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list
                    is repeated until no swaps are needed, indicating that the list is sorted.
                    <br />
                    <ol className="mt-3 mb-3">
                        <li><span className="fw-bold">Start at the Beginning</span>: The algorithm starts by comparing the first two elements of the list.</li>
                        <li><span className="fw-bold">Comparison</span>: It compares the two adjacent elements. If the left element is greater than the right element (out of order), a swap is performed.</li>
                        <li><span className="fw-bold">Swap</span>: The algorithm swaps the positions of the two elements, putting them in the correct order.</li>
                        <li><span className="fw-bold">Move to the Next Pair</span>: The algorithm moves to the next pair of adjacent elements and repeats the comparison and swap process.</li>
                        <li><span className="fw-bold">One Pass Through the List</span>: The above steps constitute one pass through the list. After the first pass, the largest (or smallest, depending on the sorting order) element will have "bubbled" to the end (or beginning) of the list.</li>
                        <li><span className="fw-bold">Repeat</span>: The process is repeated for a total of n-1 passes, where n is the number of elements in the list. After each pass, the next largest (or smallest) element is placed in its correct position.</li>
                        <li><span className="fw-bold">Optimization</span>: Bubble Sort can be optimized by introducing a flag that checks whether any swaps were made during a pass. If no swaps were made in a pass, the list is already sorted, and the algorithm can terminate early.</li>
                    </ol>
                    Bubble Sort is straightforward and easy to understand, but it's not the most efficient sorting algorithm, especially for large lists. However, it can be a useful algorithm for educational purposes and for visualizing the sorting process step by step.
                </div>
            </div>
        </div>
    )
}
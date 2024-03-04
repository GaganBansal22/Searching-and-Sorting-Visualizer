import { useState } from "react"
import { generateRandomElements, timeout } from "../utils";
import { useNavigate } from 'react-router-dom';

let pauseSorting = false;

function QuickSort() {
    const navigateTo = useNavigate();
    let [speed, SetSpeed] = useState(500)
    let [isSorting, SetSorting] = useState(false)
    let [array, SetArray] = useState(generateRandomElements)
    let [isPaused, SetIsPaused] = useState(false)
    async function highlightElements(i, j) {
        SetArray((curr) => {
            curr[i].selected = true;
            curr[j].selected = true;
            return ([...curr]);
        })
        await timeout(speed)
        while (pauseSorting) await timeout(100);
        SetArray((curr) => {
            curr[i].selected = false;
            curr[j].selected = false;
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
        while (pauseSorting) await timeout(100);
    }
    async function quickSortFunction() {
        SetSorting(true)
        let n = 50;
        await quick(0, n - 1);
        SetSorting(false)
    }
    async function quick(s, e) {
        let p;
        if (s < e) {
            while (pauseSorting) await timeout(100);
            p = await partition(s, e);
            while (pauseSorting) await timeout(100);
            await quick(s, p - 1);
            while (pauseSorting) await timeout(100);
            await quick(p + 1, e);
            while (pauseSorting) await timeout(100);
        }
    }
    async function partition(s, e) {
        let loc = s, l = s, r = e, flag = 0, temp;
        while (flag != 1) {
            while (array[loc].num <= array[r].num && loc != r) {
                while (pauseSorting) await timeout(100);
                await highlightElements(r, loc)
                r--;
            }
            if (r == loc)
                flag = 1;
            else {
                while (pauseSorting) await timeout(100);
                await swapElements(r, loc);
                loc = r;
            }
            if (flag != 1) {
                while (array[loc].num >= array[l].num && loc != l) {
                    while (pauseSorting) await timeout(100);
                    await highlightElements(l, loc);
                    l++;
                }
                if (l == loc)
                    flag = 1;
                else {
                    while (pauseSorting) await timeout(100);
                    await swapElements(l, loc);
                    loc = l;
                }
            }
        }
        return (loc);
    }
    return (
        <>
            <div className="text-center text-light">
                <h1 className="mt-4 text-start ms-5">Quick Sort</h1>
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
                    <button className="btn btn-lg btn-success mb-4" onClick={quickSortFunction}>Start</button>
                }
            </div>
            <QuickSortDetails />
        </>
    )
}

export default QuickSort

function QuickSortDetails() {
    return (
        <div className="container">
            <div className="row mt-4 mb-3">
                <div className="col-6">
                    <h3 className="text-center">Time Complexity Analysis</h3>
                    <p className="fs-3">
                        Best Case: Ω(nlog(n)) <br />
                        Average Case: θ(nlog(n))<br />
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
                    Quick Sort is a highly efficient, in-place, and comparison-based sorting algorithm. It works by selecting
                    a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to
                    whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.
                    <br />Here's the step-by-step process for Quick Sort:
                    <ol className="mt-3 mb-3">
                        <li><span className="fw-bold">Select a Pivot</span>: Choose a pivot element from the array. The choice of the pivot can be made in various ways, such as selecting the first, last, middle, or a random element from the array.</li>
                        <li><span className="fw-bold">Partitioning</span>: Rearrange the elements in the array such that elements less than the pivot are placed to the left, and elements greater than the pivot are placed to the right. The pivot element is now in its correct position in the sorted array.</li>
                        <li><span className="fw-bold">Recursion</span>: Recursively apply Quick Sort to the left and right sub-arrays created in the partitioning step.</li>
                        <li><span className="fw-bold">Repeat</span>: Continue the process of selecting a pivot, partitioning, and recursion until the entire array is sorted.</li>
                    </ol>
                    Quick Sort is known for its speed and efficiency. It has an average time complexity of O(n log n), making it one of the fastest sorting algorithms. However, its worst-case time complexity is O(n<sup>2</sup>) when poorly chosen pivots lead to unbalanced partitioning.
                </div>
            </div>
        </div>
    )
}
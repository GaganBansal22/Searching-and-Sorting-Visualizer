import { useState } from "react"
import { generateRandomElements, timeout } from "../utils"
import { useNavigate } from 'react-router-dom';

let pauseSorting = false;

function HeapSort() {
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
        while (pauseSorting) await timeout(100)
        SetArray((curr) => {
            curr[i].selected = false;
            curr[j].selected = false;
            return ([...curr]);
        })
    }
    async function swapElements(i, j) {
        SetArray((curr) => {
            curr[i].selected = true;
            curr[j].selected = true;
            return ([...curr]);
        })
        await timeout(speed);
        while (pauseSorting) await timeout(100)
        if (i != j) {
            let t = { ...array[i] }
            array[i] = { ...array[j] }
            array[j] = { ...t }
            SetArray([...array])
            await timeout(speed)
        }
        while (pauseSorting) await timeout(100)
        SetArray((curr) => {
            curr[i].selected = false;
            curr[j].selected = false;
            return ([...curr]);
        })
    }
    async function heapSortFunction() {
        SetSorting(true)
        let n = 50;
        for (let i = parseInt((n - 1) / 2); i >= 0; i--)
            await heapify(i, n);
        for (let i = n - 1; i >= 0; i--) {
            while (pauseSorting) await timeout(100)
            await swapElements(0, i);
            if (i != 0)
                await heapify(0, i)
        }
        SetSorting(false)
    }
    async function heapify(i, n) {
        let lc = (2 * i), rc = (2 * i) + 1, large = i;
        if (lc < n && array[lc].num > array[i].num)
            large = lc;
        if (rc < n && array[rc].num > array[large].num)
            large = rc;
        if (large == i) {
            if (lc < n) await highlightElements(i, lc)
            if (rc < n) await highlightElements(i, rc)
        }
        else {
            if (lc < n) await highlightElements(i, lc)
            if (rc < n) await highlightElements(large, rc)
            await swapElements(i, large);
            await heapify(large, n)
        }
    }
    return (
        <>
            <div className="text-center text-light">
                <h1 className="mt-4 text-start ms-5">Heap Sort</h1>
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
                    <button className="btn btn-lg btn-success mb-4" onClick={heapSortFunction}>Start</button>
                }
            </div>
            <HeapSortDetails />
        </>
    )
}

export default HeapSort

function HeapSortDetails() {
    return (
        <div className="container">
            <div className="row mt-4 mb-3">
                <div className="col-6">
                    <h3 className="text-center">Time Complexity Analysis</h3>
                    <p className="fs-3 mt-4">
                        Best Case: Ω(nlogn) <br />
                        Average Case: θ(nlogn)<br />
                        Worst Case: O(nlogn)<br />
                    </p>
                    <p className="fs-3">
                        T(n)=2T(n/2)+n <br />
                        T(n)=2T(n/4)+n+n <br />
                        T(n)=2<sup>k</sup>T(n/2<sup>k</sup>)+k(n) <br />
                        <br />
                        n=2<sup>k</sup> <br />
                        k=log<sub>2</sub>n <br />
                        <br />
                        T(n)=2<sup>log<sub>2</sub>(n)</sup>+nlog(n) <br />
                        T(n)=O(nlog<sub>2</sub>(n))
                    </p>
                </div>
                <div className="col-6 fs-6">
                    Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure to sort elements.
                    It's known for its efficiency and is often used in practice. The algorithm works by first building a
                    max-heap (for ascending order) or a min-heap (for descending order) from the elements, and then repeatedly
                    extracting the root element, which is the maximum (for max-heap) or minimum (for min-heap), and placing it
                    at the end of the sorted portion of the array.
                    <ol className="mt-3 mb-3">
                        <li>
                            <span className="fw-bold">Build a Heap</span>: The first step is to create a binary heap from the given list of elements.
                            This can be done in two phases:
                            <ul>
                                <li>
                                    <span className="fw-bold">Heapify</span>: Starting from the last non-leaf node and moving up to the root,
                                    ensure that the max-heap (for ascending order) or min-heap (for descending order)
                                    property is maintained. This phase rearranges the elements to satisfy the heap property.
                                </li>
                                <li>
                                    <span className="fw-bold">Build Heap</span>: Once the heap is heapified, the root of the heap contains the maximum
                                    (for max-heap) or minimum (for min-heap) element. Swap this element with the last element
                                    in the unsorted portion of the array and reduce the size of the heap. Then, re-heapify the
                                    reduced heap.
                                </li>
                            </ul>
                        </li>
                        <li>
                            <span className="fw-bold">Repeat Heapify and Build Heap</span>: Continue the process of heapifying
                            and building the heap until all elements are placed in their correct positions.
                            This gradually builds the sorted portion of the array from the end to the beginning.
                        </li>
                    </ol>
                    Heap Sort is an efficient sorting algorithm for large data sets.
                    It's widely used in various applications and is a good choice for sorting when stability is not
                    a concern.
                </div>
            </div>
        </div>
    )
}
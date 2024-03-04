import { useState } from "react"
import { generateRandomElements, timeout } from "../utils";
import { useNavigate } from 'react-router-dom';

let pauseSearching = false;

function BinarySearch() {
    const navigateTo = useNavigate();
    let [speed, SetSpeed] = useState(500)
    let [isSearching, SetSearching] = useState(false)
    let [array, SetArray] = useState(() => { return generateRandomElements(true) })
    let [errorMessage, SetErrorMessage] = useState(false)
    let [result, SetResult] = useState(false)
    let [color, SetColor] = useState('red')
    let [isPaused, SetIsPaused] = useState(false)
    async function highlightElements(i, j, k) {
        SetArray((curr) => {
            curr[i].selected = true;
            curr[j].selected = true;
            curr[k].selected = true;
            return ([...curr]);
        })
        await timeout(speed)
        while (pauseSearching) await timeout(100);
        SetArray((curr) => {
            curr[i].selected = false;
            curr[j].selected = false;
            curr[k].selected = false;
            return ([...curr]);
        })
    }
    async function BinarySearchFunction() {
        SetResult("")
        if (document.querySelector("#se").value == "") return;
        let searchelement;
        try {
            searchelement = parseInt(document.querySelector("#se").value)
            if (isNaN(searchelement)) throw (new Error())
        }
        catch {
            SetErrorMessage(true);
            await timeout(1000)
            SetErrorMessage(false);
            return
        }
        SetArray((curr) => {
            for (let i = 0; i < n; i++)
                curr[i].selected = false;
            return ([...curr])
        })
        SetSearching(true)
        let n = 50, l = 0, r = n - 1, m = Math.floor((l + r) / 2);
        while (l <= r) {
            m = Math.floor((l + r) / 2);
            await highlightElements(l, r, m);
            if (array[m].num == searchelement) break;
            if (array[m].num > searchelement)
                r = m - 1;
            else
                l = m + 1;
            while (pauseSearching) await timeout(100);
        }
        if (m < n && array[m].num == searchelement) {
            SetResult(`Element found at index ${m} !!`)
            SetArray((curr) => {
                curr[m].selected = true;
                return ([...curr]);
            })
            SetColor('green')
        }
        else
            SetResult("Element not found!!")
        SetSearching(false)
    }
    return (
        <>
            <div className="text-center text-light">
                <h1 className="mt-5 text-start ms-5">Binary Search</h1>
                <div className="mt-3">
                    <p className="d-inline fs-4">Speed:</p>
                    <div className="mt-3 mb-3">
                        <button onClick={() => { SetSpeed(1000) }}
                            className={speed == 1000 ? "ms-3 me-3 btn btn-success" : "ms-3 me-3 btn btn-warning"}
                            disabled={isSearching ? true : false} >Slow</button>
                        <button onClick={() => { SetSpeed(500) }}
                            className={speed == 500 ? "me-3 btn btn-success" : "me-3 btn btn-warning"}
                            disabled={isSearching ? true : false} >Medium</button>
                        <button onClick={() => { SetSpeed(20) }} disabled={isSearching ? true : false}
                            className={speed == 20 ? "btn btn-success" : "btn btn-warning"} >
                            Fast</button>
                    </div>
                </div>
                <div className="mx-auto" style={{ width: "90%", height: "75vh" }}>
                    {array.map((x) => {
                        return (
                            <div style={{ display: "inline-block", width: "2%", height: `${x.num}%` }} key={array.indexOf(x)}>
                                <p className="mb-0 text-center">{x.num}</p>
                                <div style=
                                    {{
                                        display: "inline-block", border: "1px solid black", width: "100%", minHeight: "90%", backgroundColor: (x.selected ? color : "#d0d3d4")
                                        ,
                                    }}></div>
                            </div>
                        )
                    })}
                </div>
                {result ? <div className="mb-4 fs-2">
                    {result}
                </div> : <></>}
                <div className="mb-3">
                    <label className="me-2 fs-4" htmlFor="se">Enter the element to be searched: </label>
                    <input disabled={isSearching ? true : false} className="me-3" style={{ width: "10%", color: "black" }} type="tel" id="se" name="se" />
                    {errorMessage ? <>
                        <p>Invalid Input!</p>
                    </> : <></>}
                </div>
                {isSearching ?
                    <>
                        {isPaused ?
                            <button className="btn btn-lg btn-success mb-4 me-4" onClick={() => { pauseSearching = false; SetIsPaused(false); }}>Start</button>
                            :
                            <button className="btn btn-lg btn-warning mb-4 me-4" onClick={() => { pauseSearching = true; SetIsPaused(true); }}>Pause</button>
                        }
                        <button className="btn btn-lg btn-danger mb-4" onClick={() => { navigateTo(0) }}>
                            Reset
                        </button>
                    </>
                    :
                    <button className="btn btn-lg btn-success mb-4" onClick={()=>{SetColor('red') ; BinarySearchFunction()}}>Search</button>
                }
            </div>
            <BinarySearchDetails />
        </>
    )
}

export default BinarySearch

function BinarySearchDetails() {
    return (
        <div className="container">
            <div className="row mt-4 mb-3">
                <div className="col-6">
                    <h3 className="text-center">Time Complexity Analysis</h3>
                    <p className="fs-3">
                        Best Case: Ω(logn) <br />
                        Average Case: θ(logn)<br />
                        Worst Case: O(logn)<br />
                    </p>
                    <p className="fs-3">
                        T(n)=T(n/2)+1 <br />
                        T(n)=T(n/4)+1+1 <br />
                        T(n)=T(n/8)+1+1+1 <br />
                        T(n)=T(n/2<sup>k</sup>)+k <br />
                        <br />
                        2<sup>k</sup>=n<br />
                        k=log<sub>2</sub>n<br />
                        <br />
                        T(n)=log<sub>2</sub>2 <br />
                        T(n)=O(log<sub>2</sub>2)
                    </p>
                </div>
                <div className="col-6 fs-6">
                    Binary Search is a highly efficient searching algorithm used to find a specific element in a sorted
                    list or array. It leverages the divide-and-conquer approach by repeatedly dividing the search space in
                    half, drastically reducing the number of comparisons required.
                    <br />Here's the step-by-step process for Binary Search:
                    <ol className="mt-3 mb-3">
                        <li><span className="fw-bold">Initial State</span>: Binary Search begins with a sorted list or array. It identifies the start and end indices of the search space, initially the entire list.</li>
                        <li><span className="fw-bold">Middle Element</span>: The algorithm calculates the middle index between the start and end indices and accesses the corresponding element.</li>
                        <li><span className="fw-bold">Comparison</span>: It compares the middle element with the target element (the element you're searching for).</li>
                        <li><span className="fw-bold">Match Check</span>: If the middle element matches the target element, the search is successful, and the index of the element is returned.</li>
                        <li>
                            <span className="fw-bold">Adjusting the Search Space:</span>
                            <ul>
                                <li>If the middle element is greater than the target element, the search space is adjusted to the lower half of the list (from start to the middle).</li>
                                <li>If the middle element is less than the target element, the search space is adjusted to the upper half of the list (from middle to end).</li>
                            </ul>
                        </li>
                        <li><span className="fw-bold">Repeat</span>: Steps 2 to 5 are repeated until either a matching element is found, or the search space is reduced to a single element (indicating the element is not in the list).</li>
                    </ol>
                    Binary Search has a time complexity of O(log n), making it highly efficient for large datasets. It significantly reduces the number of comparisons required compared to linear search.
                </div>
            </div>
        </div>
    )
}
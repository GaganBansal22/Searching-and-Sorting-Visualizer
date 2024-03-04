import { useState } from "react"
import { generateRandomElements, timeout } from "../utils";
import { useNavigate } from 'react-router-dom';

let pauseSearching = false;

function LinearSearch() {
    const navigateTo = useNavigate();
    let [speed, SetSpeed] = useState(500)
    let [isSearching, SetSearching] = useState(false)
    let [array, SetArray] = useState(() => { return generateRandomElements(true) })
    let [errorMessage, SetErrorMessage] = useState(false)
    let [result, SetResult] = useState(false)
    let [color, SetColor] = useState('red')
    let [isPaused, SetIsPaused] = useState(false)
    async function highlightElements(i) {
        SetArray((curr) => {
            curr[i].selected = true;
            return ([...curr]);
        })
        await timeout(speed)
        while (pauseSearching) await timeout(100);
        SetArray((curr) => {
            curr[i].selected = false;
            return ([...curr]);
        })
        while (pauseSearching) await timeout(100);
    }
    async function linearSearchFunction() {
        let n = 50, i;
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
        for (i = 0; i < n; i++) {
            while (pauseSearching) await timeout(100);
            await highlightElements(i);
            if (array[i].num == searchelement)
                break;
        }
        if (i < n) {
            SetResult(`Element found at index ${i} !!`)
            SetArray((curr) => {
                curr[i].selected = true;
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
                <h1 className="mt-5 text-start ms-5">Linear Search</h1>
                <div className="mt-3">
                    <p className="d-inline fs-4">Speed:</p>
                    <div className="mt-3 mb-3">
                        <button onClick={() => { SetSpeed(1000) }}
                            className={speed == 1000 ? "ms-3 me-3 btn btn-success" : "ms-3 me-3 btn btn-warning"}
                            disabled={isSearching ? true : false} >Slow</button>
                        <button onClick={() => { SetSpeed(500) }}
                            className={speed == 500 ? "me-3 btn btn-success" : "me-3 btn btn-warning"}
                            disabled={isSearching ? true : false} >Medium</button>
                        <button onClick={() => { SetSpeed(200) }} disabled={isSearching ? true : false}
                            className={speed == 200 ? "btn btn-success" : "btn btn-warning"} >
                            Fast</button>
                    </div>
                </div>
                <div className="mx-auto" style={{ width: "90%", height: "75vh" }}>
                    {array.map((x) => {
                        return (
                            <div style={{ display: "inline-block", width: `2%`, height: `${x.num}%` }} key={array.indexOf(x)}>
                                <p className="mb-0 text-center">{x.num}</p>
                                <div style=
                                    {{display: "inline-block", border: "1px solid black", width: "100%", minHeight: "90%", backgroundColor: (x.selected ? color : "#D0D3D4")}}>    
                                </div>
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
                        <button className="btn btn-lg btn-success mb-4" onClick={() => { SetColor('red'); linearSearchFunction() }}>Search</button>
                    }
                </div>
            </div>
            <LinearSearchDetails />
        </>
    )
}

export default LinearSearch

function LinearSearchDetails() {
    return (
        <div className="container">
            <div className="row mt-4 mb-3">
                <div className="col-6">
                    <h3 className="text-center">Time Complexity Analysis</h3>
                    <p className="fs-3">
                        Best Case: Ω(n) <br />
                        Average Case: θ(n)<br />
                        Worst Case: O(n)<br />
                    </p>
                    <p className="fs-3">
                        T(n)=T(n-1)+1 <br />
                        T(n)=T(n-2)+1+1 <br />
                        T(n)=T(n-3)+1+1+1 <br />
                        T(n)=T(n-(n-1))+1+1+........+1 <br />
                        T(n)=(n-(n-1))+(n-1) <br />
                        T(n)=n(1) <br />
                        T(n)=n <br />
                        T(n)= O(n) <br />
                    </p>
                </div>
                <div className="col-6 fs-6">
                    Linear Search, also known as sequential search, is one of the simplest and most straightforward
                    searching algorithms. It works by sequentially checking each element in a list or array until a
                    match is found or the entire list is searched.
                    <br />Here's the step-by-step process for Linear Search:
                    <ol className="mt-3 mb-3">
                        <li><span className="fw-bold">Start at the Beginning</span>: The search begins at the start of the list or array.</li>
                        <li><span className="fw-bold">Comparison</span>: The algorithm compares the target element (the element you're searching for) with the current element in the list.</li>
                        <li><span className="fw-bold">Match Check</span>: If the current element matches the target element, the search is successful, and the position or index of the element is returned.</li>
                        <li><span className="fw-bold">Continue Searching</span>: If no match is found, the search moves to the next element in the list.</li>
                        <li><span className="fw-bold">Repeat</span>: Steps 2 to 4 are repeated until either a matching element is found or the entire list has been searched. If the list is exhausted without finding a match, the algorithm indicates that the target element is not in the list.</li>
                    </ol>
                    Linear Search has a time complexity of O(n), where "n" is the number of elements in the list. This means it performs a fixed number of comparisons, proportional to the size of the list. While it's not the most efficient search algorithm, it's suitable for small lists or when the elements are not in any particular order.
                </div>
            </div>
        </div>
    )
}
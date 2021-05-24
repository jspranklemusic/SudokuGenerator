const Modal = (selector)=>{
    const div = document.createElement("div");
    div.classList.add("modal")
    div.innerHTML = `
       <div style="background:white; box-sizing:border-box; padding:2rem; text-align:center; border-radius:5px; width:auto; height:auto; min-width:300px; min-height:200px;">
        <h1 style="font-size:2rem">Well done!</h1>
       <p style="font-size:1.25rem;">You finished the match.</p>
        <div style="display:flex; justify-content:center;">
            <button id="play-again">Play Again</button><button id="close-btn">Close</button>
        </div>
       </div>
    `
    document.querySelector(selector).appendChild(div)
}

Modal(".modal-test")



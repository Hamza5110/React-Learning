import { useRef } from "react";

function Now() {
    const headingRef= useRef(null);

    const changeHeading = ()=> {
        headingRef.current.textContent = "Hello React"
    }
  return (
    <>
      <h2 ref={headingRef}>Now</h2>
      <button onClick={changeHeading}>Change heading</button>
    </>
  );
}

export default Now
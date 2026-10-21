// Lifting props up
// Lifting props up is a technique in which we lift the props up to the parent component
// so that the child components can access the props.

// Prop Drilling
// Prop drilling is a technique in which we pass props from -
// parent to child to child to child until we reach the desired component.

// Demerit of Prop Drilling
// 1. It is not efficient.
// 2. It is not easy to maintain, debug, test, scale, reuse, understand, write.

// Context API
// Context API is a technique in which we create a context and pass it to the child components.
// The context is a way to pass data down the component tree without having to pass props through each level.

// Use Ref
// It is used to store a value that doesnot need to re-render the component.
// It is also used to access the DOM elements directly (like an input box).
// Syntax: const ref = useRef(initialValue);

import { createContext, useContext } from "react";

const UserContext = createContext();

function Bonus() {
  name = "Hamza !!!";
  // Props drilling
  //  return <Parent name={name} />;
  // Context API
  return (
    <UserContext.Provider value={name}>
      {/* <Parent /> */}
      { < Greet /> }
    </UserContext.Provider>
  );
}

export default Bonus;

function Parent() {
  // Props drilling
  // return <Child name={name} />
  // Context API
  return (
    <>
      <h2>Parent</h2>
      <Child />
    </>
  );
}

function Child() {
  // Props drilling
  // return <Greet name={name} />

  // Context API
  return (
    <>
      <h2>Child</h2>
      <Greet />
    </>
  );
}

function Greet() {
  const name = useContext(UserContext);
  return <h1>Hello, {name}</h1>;
}

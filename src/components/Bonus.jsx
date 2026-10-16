// Lifting props up
// Lifting props up is a technique in which we lift the props up to the parent component
// so that the child components can access the props.

// Prop Drilling
// Prop drilling is a technique in which we pass props from -
// parent to child to child to child until we reach the desired component.

// Demerit of Prop Drilling
// 1. It is not efficient.
// 2. It is not easy to maintain, debug, test, scale, reuse, understand, write.

function Bonus(){
    name="Hamza"
    return < Parent name={name} />
}

export default Bonus;

function Parent({name}){
    return <Child name={name} />
}

function Child({name}){
    return <Greet name={name} />

}

function Greet({name}){
    return <h1>Hello, {name}</h1>
}


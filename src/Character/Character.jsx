import "./styles.css";
import { useState, useEffect, useRef } from "react";
import { getRandomHexColor, getRandomElementOfArray } from "./utils";
import { API_URL } from "./consts";
// import { API_FETCH_INTERVAL } from "./consts";

const Character = () => {
    const [visibility, setVisibility] = useState(true);
    if (!visibility) {
        return null;
    }
    return <CharacterContent setVisibility={setVisibility} />;
}

const CharacterContent = ({ setVisibility }) => {
   const intervalRef = useRef(undefined);
   const [character, setCharacter] = useState({ name: "Undefined" });
   const randomColor = getRandomHexColor();

   useEffect (() => {
    console.log("Component: Mount");
    getRandomCharacter();

    intervalRef.current = setInterval(() => {
        console.log("setInterval");
        getRandomCharacter();
    }, 5000);
// }, API_FETCH_INTERVAL);

    return () => {
        console.log("Component: Unmount");
        clearInterval(intervalRef.current);
    }; 
   }, []);

   useEffect (() => {
    console.log("Component: Render");
   });

   const getRandomCharacter = () => {
    fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
        const characters = data.results;
        const randomCharacter = getRandomElementOfArray(characters);
        setCharacter({ name: randomCharacter.name});   
    });
   }

   const getRandomCharacterHandler = () => {
    getRandomCharacter();
    console.log("getRandomCharacterHandler");
    }

    const hideComponentHandler = () => {
        setVisibility(false);
    }

    return (
        <>
            {character.name === "Undefined" ? (
                <h2>Loading...</h2>
            ) : (
                <>
                    <button onClick={hideComponentHandler}>Hide Component</button>
                    <h2 className="Character" style={{ backgroundColor: randomColor }}>
                        Character: {character.name}
                    </h2>
                    <button onClick={getRandomCharacterHandler}>Get Random Character</button>
                </>
            )}
        </>
    );
}
export default Character;
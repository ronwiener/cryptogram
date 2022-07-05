import React, { useState } from "react";
import Grid from "@mui/material/Grid";

function WordSpaces(props) {
  const [alphaLetter, setAlphaLetter] = useState("");
  let word = props.wordObj.letters;
  //console.log(word);

  function letterGuess(e) {
    word.filter((letter) => {
      console.log(alphaLetter);
      return letter === alphaLetter ? setAlphaLetter(e.target.value) : null;
    });
  }
  return word.map((letter, index) => (
    <Grid item key={"letterCol-" + index}>
      {/*if the letter is not punctuation, render an input box */}
      {letter !== "." &&
      letter !== "," &&
      letter !== "'" &&
      letter !== "?" &&
      letter !== ";" &&
      letter !== ":" ? (
        <input
          type="text"
          name="name"
          value={alphaLetter}
          onChange={(e) => letterGuess(e)}
          style={{
            textTransform: "uppercase",
            textAlign: "center",
            color: "red",
            borderTop: "0em",
            borderLeft: "0em",
            borderRight: "0em",
            borderBottomWidth: "0.25em",
            borderBottomColor: "black",
            width: "1em",
            marginLeft: "0.25em",
            marginRight: "0.25em",
          }}
          id={"letterBox-" + index}
          maxLength={1}
        />
      ) : null}
      {/*display the actual letter below the input box */}
      <p
        id={"letter" + index}
        style={{ marginLeft: "0.5em", marginRight: "0.5em," }}
      >
        {letter}
      </p>
    </Grid>
  ));
}

export default WordSpaces;

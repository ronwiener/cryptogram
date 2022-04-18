import React from "react";
import Grid from "@mui/material/Grid";

const WordSpace = (props) => {
  let word = props.wordObj.letters;
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
};

export default WordSpace;

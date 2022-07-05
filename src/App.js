import React, { Component } from "react";
import WordSpace from "./WordSpace";
import Spinner from "./Spinner";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      originalObj: {},
      rearrangedObj: {}, //codified quote
      wordObjects: [], //codified quote, tokenized
      hintOne: "",
      hintTwo: "",
      scrambledOne: "",
      scrambledTwo: "",
    };
  }

  componentDidMount() {
    //get quote from API, return it as a formatted object
    this.getQuote()
      .then((responseObject) => {
        this.setState({
          originalObj: responseObject,
        });
        //perform the letter swapping on the quote
        let rearranged = this.processString(responseObject);
        //return an object containing the codified quote
        return rearranged;
      })
      .then((rearranged) => {
        //tokenize the quote into arrays of words and letters
        let rearrangedQuote = this.tokenize(rearranged.quote);
        return {
          quote: rearrangedQuote,
        };
      })
      //store theses arrays as arrays of objects in state
      .then((quote) => {
        this.setState({
          wordObjects: quote.quote,
        });
      });
  }

  async getQuote() {
    let url = "https://api.quotable.io/random";
    try {
      let response = await fetch(url, {
        method: "GET",
      });

      if (response.ok) {
        let parsed = await response.json();
        let responseObject = {
          quote: parsed.content,
        };
        return responseObject;
      }
    } catch (err) {
      throw err;
    }
  }

  startNewGame() {
    this.setState({
      originalObj: {},
      rearrangedObj: {}, //codified quote
      wordObjects: [], //codified quote, tokenized
    });
    this.componentDidMount();
  }

  //Letter scrambling process from the object containing string values of the quote & author
  processString(obj) {
    let quote = obj.quote.toUpperCase();
    let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let temp = alphabet;
    //Create Randomized alphabet
    let rearranged = "";
    let ctr = 0;

    while (ctr < 26) {
      let randomIndex = Math.floor(Math.random() * 26 - ctr);

      if (rearranged.search(alphabet.charAt(randomIndex)) < 0) {
        //add random character from alphabet into 'rearranged'
        rearranged += alphabet.charAt(randomIndex);
        //remove that character from alphabet
        alphabet = alphabet.replace(alphabet.charAt(randomIndex), "");
        //increment counter
        ctr += 1;
      }
    }

    //randomize quote
    let finalQuote = "";

    for (ctr = 0; ctr < quote.length; ctr++) {
      let currentLetter = quote.charAt(ctr);

      //preserve punctuation and spaces
      if (
        currentLetter === " " ||
        currentLetter === "." ||
        currentLetter === "," ||
        currentLetter === ";" ||
        currentLetter === "'" ||
        currentLetter === ":"
      ) {
        finalQuote += currentLetter;
      } else {
        //assigns the quote letters into an index number of their alphabet position
        let originalIndex = temp.search(currentLetter);

        /*use this console.log to help with input boxes
        console.log(originalIndex, currentLetter);  */

        /*rearranged.charAt is the randomized alphabet letters 
        matched up to original alphabet position indexes of the quote,
        so index 3 of the alphabet(D) will be matched to index 3 of the rearranged alphabet */
        finalQuote += rearranged.charAt(originalIndex);

        /*use this console.log to help with input boxes
        console.log(rearranged.charAt(originalIndex));  */
      }
    }

    /* HINTS:  the following gets a quote letter using Math.random(),
       assigns the quote letter to it's alphabetic index,
       then searches for the rearranged character at that index
     */

    let randomQuoteLetter1 = "";
    let randomQuoteLetter2 = "";
    let randomIdx1;
    let randomIdx2;
    let rearrangedLetter1 = "";
    let rearrangedLetter2 = "";
    let quote1 = quote.replace(/[/?/-;:,'." "]/g, "");
    // let quote2 = quote.replace(/[/?/-;:,'." "]/g, "");

    randomQuoteLetter1 = quote1[Math.floor(Math.random() * quote1.length)];
    randomIdx1 = temp.search(randomQuoteLetter1);
    rearrangedLetter1 = rearranged.charAt(randomIdx1);

    randomQuoteLetter2 = quote1[Math.floor(Math.random() * quote1.length)];
    if (randomQuoteLetter1 === randomQuoteLetter2) {
      randomQuoteLetter2 = quote1[Math.floor(Math.random() * quote1.length)];
    }
    randomIdx2 = temp.search(randomQuoteLetter2);
    rearrangedLetter2 = rearranged.charAt(randomIdx2);

    this.setState({
      hintOne: randomQuoteLetter1,
      scrambledOne: rearrangedLetter1,
      hintTwo: randomQuoteLetter2,
      scrambledTwo: rearrangedLetter2,
    });

    let sortedObject = {
      quote: finalQuote,
    };

    return sortedObject;
  }

  tokenize(toTokenize) {
    //splits a string into an array of words (tokens)
    let tokens = toTokenize.split(/[\s0-9]/g);
    let objects = [];
    //Splits each token into an array of letters
    for (let ctr = 0; ctr < tokens.length; ctr++) {
      let letters = tokens[ctr].split("");
      objects.push({
        id: ctr,
        word: tokens[ctr],
        letters: letters,
      });
    }
    return objects;
  }

  render() {
    //show loading screen if state values not set
    if (this.state.wordObjects.length < 1) {
      return <Spinner />;
    } else {
      return (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ marginTop: 10, backgroundColor: "lightBlue" }}
        >
          <Grid item>
            <h2 style={{ fontFamily: "Fira Sans" }}>Cryptogram Puzzle</h2>
          </Grid>
          <Grid item>
            <Stack direction="row" spacing={4}>
              <Button
                variant="contained"
                size="small"
                style={{
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "grey",
                  backgroundColor: "darkgreen",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  alert(this.state.originalObj.quote);
                }}
              >
                View Solution
              </Button>

              <Button
                variant="contained"
                size="small"
                style={{
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderColor: "grey",
                  backgroundColor: "blue",
                  borderRadius: "5px",
                }}
                onClick={() => {
                  this.setState({ wordObjects: [] });
                  this.startNewGame();
                }}
              >
                New Puzzle
              </Button>
            </Stack>
          </Grid>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            spacing={1}
          >
            <Grid item>
              <p style={{ color: "red", fontSize: 18, fontWeight: 700 }}>
                HINTS:
              </p>
            </Grid>
            <Grid item>
              <p style={{ color: "black", fontSize: 18, fontWeight: 700 }}>
                {`${this.state.scrambledOne} equals ${this.state.hintOne}
             and 
            ${this.state.scrambledTwo} equals ${this.state.hintTwo}`}
              </p>
            </Grid>
          </Grid>
          <Grid item container justifyContent="center">
            {this.state.wordObjects.map((wordObject, index) => (
              <div
                key={"word-" + index}
                style={{
                  display: "flex",
                  marginRight: "1.5em",
                  marginBottom: "2px",
                  marginTop: "1px",
                }}
              >
                <WordSpace wordObj={wordObject} />
              </div>
            ))}
          </Grid>
        </Grid>
      );
    }
  }
}

export default App;

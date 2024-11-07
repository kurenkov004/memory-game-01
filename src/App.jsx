import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';
import './App.scss';
import cover from '../public/img/cover.png';
import baking from '../public/img/baking-1.png'
import lunch from '../public/img/lunch-1.png'
import noodles from '../public/img/noodles-1.png'
import picnic from '../public/img/picnic-1.png'
import sandwich from '../public/img/sandwich-1.png'
import shopping from '../public/img/shopping-1.png'
import SingleCard from './components/SingleCard';



//creating the array outside of the component means it won't be
//re-created every time the component is re-evaluated
const cardImages = [
  { "src": baking , matched: false},
  { "src": lunch , matched: false},
  { "src": noodles , matched: false},
  { "src": picnic , matched: false},
  { "src": sandwich , matched: false},
  { "src": shopping , matched: false},
]

const App = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState([0]) //state to count turns
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle cards: double each cards and randomize their order in the array, called every time we start a new game
  const shuffleCards = () => {
    //array that 'spreads' the original array twice
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      //we now have a new array of shuffled cards, each has an id property

      //resets choiceOne & choiceTwo for each new game
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  };

  //handle a choice
  const handleChoice = (card) => {
    //takes a "cliked" card as an argument
    // console.log(card)
    //if choiceOne is null (eval as false), function on the right will be run, updates choiceOne
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare two selected cards (fires when component first mounts & when a dependency changes)
  useEffect(() => {
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              //if iterating card matched choiceOne(or choiceTwo), this will set it's "matched" value to "true"
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log("those cards do NOT match")
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  //reset choices & increase turn counter
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start game automatically
  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className='App'>
      <h1>Match It</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard
            key={card.id}
            card={card}
            cover={cover}
            handleChoice = {handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
};


export default App;
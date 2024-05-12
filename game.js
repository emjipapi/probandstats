const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(0)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    } else if (option.errorMessage) {
      // Display error message as a disabled button
      const errorMessage = document.createElement('button')
      errorMessage.innerText = option.errorMessage
      errorMessage.classList.add('btn-no')
      optionButtonsElement.appendChild(errorMessage)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 0,
    text: 'The Journey',
    options: [
      {
        text: 'Start Game',
        nextText: 1
      }
    ]
  },
  {
    id: 1,
    text: 'The air is thick with mystery, and the dim moonlight casts eerie shadows around you. You can sense an unknown adventure awaiting you in the darkness. Your journey begins here.',
    options: [
      {
        text: 'Continue',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'Will you dare to step into the unknown and uncover the secrets that lie ahead? Or will you retreat into the safety of the shadows, leaving the mysteries of the night untouched? The choices you make will shape your destiny as you embark on a journey filled with danger, discovery, and unexpected twists.',
    options: [
      {
        text: 'Continue',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'Prepare yourself for an unforgettable adventure as you venture forth into the unknown. Are you ready to begin your journey?',
    options: [
      {
        text: 'Yes!',
        nextText: 5
      },
      {
        text: 'No.',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: 'You died. the game hasn\'t even started yet..',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You wake up in the middle of the night at a strange place and you see a bag of coins near you.',
    options: [
      {
        text: 'Take the bag of coins',
        setState: { coins: true },
        nextText: 6
      },
      {
        text: 'Leave the bag of coins',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: 'You venture forth in search of answers to where you are when you come across a merchant.',
    options: [
      {
        text: 'Trade the coins for a sword',
        requiredState: (currentState) => currentState.coins,
        setState: { coins: false, sword: true },
        nextText: 7,
        errorMessage: "Trade the coins for a sword (You don't have coins)"
      },
      {
        text: 'Trade the coins for a shield',
        requiredState: (currentState) => currentState.coins,
        setState: { coins: false, shield: true },
        nextText: 7,
        errorMessage: "Trade the coins for a shield (You don't have coins)"
      },
      {
        text: 'Ignore the merchant',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'After leaving the merchant you start to feel tired as it is getting late. There, you stumble upon a small town next to a dangerous looking castle.',
    options: [
      {
        text: 'Explore the castle',
        nextText: 4
      },
      {
        text: 'Find a room to sleep in at the town',
        nextText: 5
      },
      {
        text: 'Find some hay in a stable to sleep in',
        nextText: 6
      }
    ]
  },
  // {
  //   id: 4,
  //   text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
  //   options: [
  //     {
  //       text: 'Restart',
  //       nextText: -1
  //     }
  //   ]
  // },
  // {
  //   id: 5,
  //   text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
  //   options: [
  //     {
  //       text: 'Restart',
  //       nextText: -1
  //     }
  //   ]
  // },
  // {
  //   id: 6,
  //   text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
  //   options: [
  //     {
  //       text: 'Explore the castle',
  //       nextText: 7
  //     }
  //   ]
  // },
  // {
  //   id: 7,
  //   text: 'While exploring the castle you come across a horrible monster in your path.',
  //   options: [
  //     {
  //       text: 'Try to run',
  //       nextText: 8
  //     },
  //     {
  //       text: 'Attack it with your sword',
  //       requiredState: (currentState) => currentState.sword,
  //       nextText: 9
  //     },
  //     {
  //       text: 'Hide behind your shield',
  //       requiredState: (currentState) => currentState.shield,
  //       nextText: 10
  //     },
  //     {
  //       text: 'Throw the blue goo at it',
  //       requiredState: (currentState) => currentState.blueGoo,
  //       nextText: 11
  //     }
  //   ]
  // },
  // {
  //   id: 8,
  //   text: 'Your attempts to run are in vain and the monster easily catches.',
  //   options: [
  //     {
  //       text: 'Restart',
  //       nextText: -1
  //     }
  //   ]
  // },
  // {
  //   id: 9,
  //   text: 'You foolishly thought this monster could be slain with a single sword.',
  //   options: [
  //     {
  //       text: 'Restart',
  //       nextText: -1
  //     }
  //   ]
  // },
  // {
  //   id: 10,
  //   text: 'The monster laughed as you hid behind your shield and ate you.',
  //   options: [
  //     {
  //       text: 'Restart',
  //       nextText: -1
  //     }
  //   ]
  // },
  // {
  //   id: 11,
  //   text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
  //   options: [
  //     {
  //       text: 'Congratulations. Play Again.',
  //       nextText: -1
  //     }
  //   ]
  // }
]

startGame()
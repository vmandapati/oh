function getQuizData(){
  return {
    "question": "Who are you shopping for?",
    "answers": [
      {
        "value": "Him",
        "image": "randomwine.png",
        "next": {
          "question": "How would you describe his personality?",
          "answers": [
            {
              "value": "The Adventurer",
              "description": "He loves discovering food and wine",
              "image": "randomwine.png",
              "next": {
                "question": "Price Range?",
                "answers": [
                  {
                    "value": "$",
                    "description": "you are cheap",
                    "image": "randomwine.png",
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
}
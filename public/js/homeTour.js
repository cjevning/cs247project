var tour = {
      id: "hello-hopscotch",
      showCloseButton: 'true',
      showPrevButton: 'true',
      steps: [
        {
          title: "Welcome",
          content: "Welcome to Gymplify! My name is Jim the Butler, and I'll be your guide. Let's get started...",
          target: "Jim",
          placement: "bottom",
          xOffset: 'center',
          arrowOffset: '46%'
        },
        {
          title: "Lifts",
          content: "From Bicep Curls to Sprints to Plyometrics, these are all the Lifts you currently have.",
          target: "liftButton",
          placement: "top",
          xOffset: 'center',
          arrowOffset: '46%'
        },
        {
          title: "LiftLists",
          content: "LiftLists are essentially your \"playlists\" of lifts, forming a workout you can follow, edit, or pick and choose your way through.",
          target: "listButton",
          placement: "top",
          xOffset: 'center',
          arrowOffset: '46%'
        },
        {
          title: "Shuffle",
          content: "Shuffle a random set of your lifts into a spontaneous liftlist and jump right into your workout.",
          target: "shuffleButton",
          placement: "top",
          xOffset: 'center',
          arrowOffset: '46%'
        },
        {
          title: "Store",
          content: "Visit the Store to download new lifts and liftlists.",
          target: "storeButton",
          placement: "top",
          xOffset: 'center',
          arrowOffset: '46%'
        },
      ]
    };

    // Start the tour!
    hopscotch.startTour(tour);
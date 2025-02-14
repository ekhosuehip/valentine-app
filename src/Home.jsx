import React, { useState, useEffect } from "react";

const Home = () => {
  const [showQuestion, setShowQuestion] = useState(false);
  const [loveMessage, setLoveMessage] = useState(false);
  const [thinkAgain, setThinkAgain] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("background-music");

    // Ensure the music plays continuously and automatically
    const playAudio = () => {
      audio.muted = false; // Unmute
      audio.loop = true; // Ensure it loops
      audio.play().catch(() => {
        console.log(
          "Audio playback blocked by browser. User interaction may be required."
        );
      });
    };

    playAudio(); // Try playing audio immediately on mount

    return () => {
      audio.pause(); // Pause the audio when the component unmounts (optional)
    };
  }, []);

  const handleReveal = () => {
    setShowQuestion(true);
    setThinkAgain(false); // Reset "Think Again" if already shown
  };

  const handleYesClick = () => {
    setLoveMessage(true); // Show "I Love You ❤️" message
    setThinkAgain(false); // Ensure "Think Again" doesn't show
  };

  const handleMaybeClick = () => {
    setThinkAgain(true); // Show "Think Again" message
    setTimeout(() => {
      setThinkAgain(false); // Hide "Think Again" after 10 seconds
    }, 10000); // Adjusted to 10 seconds
  };

  return (
    <div className="container">
      {/* Background Music */}
      <audio id="background-music" autoPlay>
        <source src="/sound/Download.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="message">
        {!loveMessage ? (
          !showQuestion ? (
            <>
              <h1>Will you be my Valentine? 💌</h1>
              <button className="reveal-btn" onClick={handleReveal}>
                Click Me
              </button>
            </>
          ) : (
            <div className="question">
              <h2>🌹 Will you go out with me this Valentine's Day? 🌹</h2>
              <button className="answer-btn" onClick={handleYesClick}>
                Yes 💖
              </button>
              <button className="answer-btn" onClick={handleMaybeClick}>
                Maybe 😘
              </button>
              {thinkAgain && (
                <p className="think-again">🤔 Think again... I know you want to say yes! 💞</p>
              )}
            </div>
          )
        ) : (
          <div className="love-message">
            <h1>I Love You ❤️</h1>
            <p>
              Thank you for saying yes! You’ve made this Valentine's Day the
              best ever! 💘
            </p>
          </div>
        )}
      </div>

      <div className="hearts">
        <div className="heart heart1"></div>
        <div className="heart heart2"></div>
        <div className="heart heart3"></div>
        <div className="heart heart4"></div>
      </div>
    </div>
  );
};

export default Home;

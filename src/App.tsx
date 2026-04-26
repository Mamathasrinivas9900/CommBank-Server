import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./App.css";
import { updateGoal } from "./lib/api";

function App() {
  const [name, setName] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [goals, setGoals] = useState<any[]>([]);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // ADD GOAL
  const addGoal = () => {
    if (!name) return;

    const newGoal = {
      id: Date.now().toString(),
      name,
      icon,
    };

    setGoals([...goals, newGoal]);
    setName("");
    setIcon("");
    setShowPicker(false);
  };

  // FIXED EMOJI HANDLER ⭐
  const pickEmojiOnClick = (emojiData: any) => {
    setIcon(emojiData.emoji);
    setShowPicker(false);
  };

  // UPDATE ICON USING PUT ⭐
  const updateGoalIcon = async (id: string, newIcon: string) => {
    await updateGoal(id, { icon: newIcon });

    const updatedGoals = goals.map((g) =>
      g.id === id ? { ...g, icon: newIcon } : g
    );

    setGoals(updatedGoals);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Goal Manager</h2>

      <input
        placeholder="Enter goal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <button onClick={() => setShowPicker(!showPicker)}>
        Pick Emoji
      </button>

      {showPicker && (
        <EmojiPicker onEmojiClick={pickEmojiOnClick} />
      )}

      <p>Selected Icon: {icon}</p>

      <button onClick={addGoal}>Add Goal</button>

      <hr />

      <div>
        {goals.map((g) => (
          <div key={g.id} style={{ marginBottom: "10px" }}>
            <span
              style={{ fontSize: "20px", cursor: "pointer" }}
              onClick={() => {
                const newIcon = prompt("Enter new emoji:");
                if (newIcon) updateGoalIcon(g.id, newIcon);
              }}
            >
              {g.icon}
            </span>
            <span> {g.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;